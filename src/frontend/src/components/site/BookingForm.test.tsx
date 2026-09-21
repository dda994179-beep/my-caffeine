import type { Result } from "@/backend";
import { BookingError } from "@/backend";
import { BookingForm } from "@/components/site/BookingForm";
import { UI } from "@/lib/i18n";
import { createMockBackend, renderWithProviders } from "@/test/helpers";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockBackend = createMockBackend();

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: mockBackend, isFetching: false }),
}));

function renderForm(lang: "km" | "en" = "en") {
  const onServiceChange = vi.fn();
  const view = renderWithProviders(
    <BookingForm
      lang={lang}
      selectedService=""
      onServiceChange={onServiceChange}
    />,
  );
  return { ...view, onServiceChange };
}

describe("BookingForm", () => {
  beforeEach(() => {
    mockBackend.submitBooking = vi.fn(
      async (): Promise<Result> => ({ __kind__: "ok", ok: "BK-000042" }),
    );
    mockBackend.getBooking = vi.fn(async () => null);
  });

  it("submits a valid booking and shows the backend-issued reference", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByTestId("booking.name_input"), "Sokha Chan");
    await user.type(screen.getByTestId("booking.phone_input"), "090833814");
    await user.selectOptions(
      screen.getByTestId("booking.service_select"),
      "engine",
    );
    await user.click(screen.getByTestId("booking.submit_button"));

    await waitFor(() => {
      expect(screen.getByTestId("booking.success_state")).toBeInTheDocument();
    });
    expect(screen.getByTestId("booking.reference")).toHaveTextContent(
      "BK-000042",
    );
    expect(mockBackend.submitBooking).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Sokha Chan",
        phone: "090833814",
        serviceType: "engine",
      }),
    );
  });

  it("shows an inline error and does not submit when required fields are empty", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByTestId("booking.submit_button"));

    expect(screen.getByTestId("booking.name_error")).toHaveTextContent(
      UI.errorName.en,
    );
    expect(screen.getByTestId("booking.phone_error")).toHaveTextContent(
      UI.errorPhone.en,
    );
    expect(screen.getByTestId("booking.service_error")).toHaveTextContent(
      UI.errorService.en,
    );
    expect(mockBackend.submitBooking).not.toHaveBeenCalled();
    expect(
      screen.queryByTestId("booking.success_state"),
    ).not.toBeInTheDocument();
  });

  it("rejects a too-short phone number with the format error", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByTestId("booking.name_input"), "Dara Mao");
    await user.type(screen.getByTestId("booking.phone_input"), "123");
    await user.selectOptions(
      screen.getByTestId("booking.service_select"),
      "brakes",
    );
    await user.click(screen.getByTestId("booking.submit_button"));

    expect(screen.getByTestId("booking.phone_error")).toHaveTextContent(
      UI.errorPhoneFormat.en,
    );
    expect(mockBackend.submitBooking).not.toHaveBeenCalled();
  });

  it("shows the generic error when the backend rejects the submission", async () => {
    const user = userEvent.setup();
    mockBackend.submitBooking = vi.fn(async () => {
      throw new Error("network down");
    });
    renderForm();

    await user.type(screen.getByTestId("booking.name_input"), "Vibol Seng");
    await user.type(screen.getByTestId("booking.phone_input"), "090833814");
    await user.selectOptions(
      screen.getByTestId("booking.service_select"),
      "engine",
    );
    await user.click(screen.getByTestId("booking.submit_button"));

    await waitFor(() => {
      expect(screen.getByTestId("booking.error_state")).toHaveTextContent(
        UI.errorGeneric.en,
      );
    });
    expect(
      screen.queryByTestId("booking.success_state"),
    ).not.toBeInTheDocument();
  });

  it("shows the backend validation error when the canister returns err", async () => {
    const user = userEvent.setup();
    mockBackend.submitBooking = vi.fn(
      async (): Promise<Result> => ({
        __kind__: "err",
        err: BookingError.emptyName,
      }),
    );
    renderForm();

    await user.type(screen.getByTestId("booking.name_input"), "Chantha Ry");
    await user.type(screen.getByTestId("booking.phone_input"), "090833814");
    await user.selectOptions(
      screen.getByTestId("booking.service_select"),
      "engine",
    );
    await user.click(screen.getByTestId("booking.submit_button"));

    await waitFor(() => {
      expect(screen.getByTestId("booking.error_state")).toHaveTextContent(
        UI.errorGeneric.en,
      );
    });
  });

  it("uses the service preselected from a service card", async () => {
    const user = userEvent.setup();
    const onServiceChange = vi.fn();
    renderWithProviders(
      <BookingForm
        lang="en"
        selectedService="tires"
        onServiceChange={onServiceChange}
      />,
    );

    expect(screen.getByTestId("booking.service_select")).toHaveValue("tires");

    await user.type(screen.getByTestId("booking.name_input"), "Sokha Chan");
    await user.type(screen.getByTestId("booking.phone_input"), "090833814");
    await user.click(screen.getByTestId("booking.submit_button"));

    await waitFor(() => {
      expect(mockBackend.submitBooking).toHaveBeenCalledWith(
        expect.objectContaining({ serviceType: "tires" }),
      );
    });
  });

  it("renders Khmer validation copy when the language is Khmer", async () => {
    const user = userEvent.setup();
    renderForm("km");

    await user.click(screen.getByTestId("booking.submit_button"));

    expect(screen.getByTestId("booking.name_error")).toHaveTextContent(
      UI.errorName.km,
    );
    expect(screen.getByTestId("booking.phone_error")).toHaveTextContent(
      UI.errorPhone.km,
    );
  });
});
