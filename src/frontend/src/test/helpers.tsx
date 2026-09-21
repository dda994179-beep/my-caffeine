import type { Booking, BookingInput, Result } from "@/backend";
import { LANG_STORAGE_KEY, type Lang } from "@/lib/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type RenderResult, render } from "@testing-library/react";
import type { ReactElement } from "react";
import { vi } from "vitest";

/**
 * The site defaults to Khmer. Tests that assert English copy must seed the
 * persisted language before mount, exactly as a returning visitor would.
 */
export function setStoredLang(lang: Lang): void {
  window.localStorage.setItem(LANG_STORAGE_KEY, lang);
}

/**
 * The subset of the generated `Backend` actor the site actually calls. Typing
 * the mock against the app's own exported types keeps a signature drift in the
 * generated bindings from silently passing.
 */
export interface MockBackend {
  submitBooking: (input: BookingInput) => Promise<Result>;
  getBooking: (ref: string) => Promise<Booking | null>;
}

export function createMockBackend(
  overrides: Partial<MockBackend> = {},
): MockBackend {
  return {
    submitBooking: vi.fn(
      async () => ({ __kind__: "ok", ok: "BK-000001" }) as Result,
    ),
    getBooking: vi.fn(async () => null),
    ...overrides,
  };
}

/**
 * Render a component inside the same providers `main.tsx` installs, minus the
 * Internet Identity provider: `useActor` is mocked at the module boundary, so
 * no identity or network is involved.
 */
export function renderWithProviders(ui: ReactElement): RenderResult {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}
