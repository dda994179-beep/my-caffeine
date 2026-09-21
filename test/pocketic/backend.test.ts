import { PocketIc } from "@dfinity/pic";
import type { Actor, CanisterFixture } from "@dfinity/pic";
import { afterAll, beforeAll, expect, it } from "vitest";

import { idlFactory } from "../../src/frontend/src/declarations/backend.did.js";
import type { _SERVICE } from "../../src/frontend/src/declarations/backend.did";

const PIC_URL = process.env.POCKET_IC_URL ?? "";
const BACKEND_WASM = process.env.BACKEND_WASM ?? "";
// Set only on a converted project: the last pre-EM revision, whose schema this
// app's migration chain replays from. Installing the current wasm onto an empty
// canister there traps IC0503 before any test runs.
const BASELINE_WASM = process.env.BACKEND_WASM_BASELINE;

let pic: PocketIc | undefined;
let actor: Actor<_SERVICE>;
let canisterId: CanisterFixture<_SERVICE>["canisterId"];

beforeAll(async () => {
  pic = await PocketIc.create(PIC_URL);
  if (BASELINE_WASM === undefined) {
    ({ actor, canisterId } = await pic.setupCanister<_SERVICE>({ idlFactory, wasm: BACKEND_WASM }));
    return;
  }
  // `[baseline, current]`, the same install contract the hosted deploy uses for
  // a converted project. The upgrade replays the chain from the legacy schema.
  const installed = await pic.setupCanister<_SERVICE>({ idlFactory, wasm: BASELINE_WASM });
  await pic.upgradeCanister({ canisterId: installed.canisterId, wasm: BACKEND_WASM, arg: new Uint8Array() });
  ({ actor, canisterId } = installed);
});

afterAll(async () => {
  // `?.` because `beforeAll` may not have got that far. A failed
  // `PocketIc.create` otherwise stacks "Cannot read properties of undefined"
  // on top of the real error and buries the one line that explains the run.
  await pic?.tearDown();
});

it("answers an empty-state read instead of trapping", async () => {
  await expect(actor.getBooking("BK-999998")).resolves.toEqual([]);
});

it("submits a booking and returns a formatted reference", async () => {
  const result = await actor.submitBooking({
    name: "Sokha Chan",
    phone: "090 833 814",
    motorcycleModel: "Honda Dream 125",
    serviceType: "engine",
    preferredDate: "2026-10-01",
    notes: "Engine knocking at high RPM",
  });

  expect("ok" in result).toBe(true);
  if (!("ok" in result)) return;
  expect(result.ok).toMatch(/^BK-\d{6}$/);
});

it("round-trips a booking through the real canister", async () => {
  const submitted = await actor.submitBooking({
    name: "Dara Mao",
    phone: "090 804 863",
    motorcycleModel: "Yamaha Exciter 150",
    serviceType: "brakes",
    preferredDate: "2026-10-02",
    notes: "",
  });
  expect("ok" in submitted).toBe(true);
  if (!("ok" in submitted)) return;

  const stored = await actor.getBooking(submitted.ok);
  expect(stored).toHaveLength(1);
  expect(stored[0]).toMatchObject({
    ref: submitted.ok,
    name: "Dara Mao",
    phone: "090 804 863",
    motorcycleModel: "Yamaha Exciter 150",
    serviceType: "brakes",
    preferredDate: "2026-10-02",
    notes: "",
  });
});

it("rejects an empty name with a validation error instead of trapping", async () => {
  const result = await actor.submitBooking({
    name: "   ",
    phone: "090 833 814",
    motorcycleModel: "Honda Wave 110",
    serviceType: "engine",
    preferredDate: "",
    notes: "",
  });
  expect(result).toEqual({ err: { emptyName: null } });
});

it("rejects an empty phone with a validation error instead of trapping", async () => {
  const result = await actor.submitBooking({
    name: "Vibol Seng",
    phone: "",
    motorcycleModel: "Suzuki Raider R150",
    serviceType: "engine",
    preferredDate: "",
    notes: "",
  });
  expect(result).toEqual({ err: { emptyPhone: null } });
});

it("rejects an empty service type with a validation error instead of trapping", async () => {
  const result = await actor.submitBooking({
    name: "Chantha Ry",
    phone: "090 833 814",
    motorcycleModel: "Honda Dream 125",
    serviceType: "  ",
    preferredDate: "",
    notes: "",
  });
  expect(result).toEqual({ err: { emptyServiceType: null } });
});

it("returns no booking for an unknown reference", async () => {
  await expect(actor.getBooking("BK-999999")).resolves.toEqual([]);
});

it("exposes the public API documentation without trapping", async () => {
  await expect(actor.getApiDoc()).resolves.toEqual(expect.any(String));
});

it("reports the caller's role without trapping", async () => {
  await expect(actor.getCallerUserRole()).resolves.toBeDefined();
});

it("keeps the canister id stable for a second actor on the same canister", async () => {
  const second = pic!.createActor<_SERVICE>(idlFactory, canisterId);
  await expect(second.getBooking("BK-999997")).resolves.toEqual([]);
});
