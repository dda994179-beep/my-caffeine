import App from "@/App";
import type { Result } from "@/backend";
import { LANG_STORAGE_KEY, SHOP, UI } from "@/lib/i18n";
import { DIRECTIONS_URL } from "@/lib/site-data";
import {
  createMockBackend,
  renderWithProviders,
  setStoredLang,
} from "@/test/helpers";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockBackend = createMockBackend();

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor: mockBackend, isFetching: false }),
}));

describe("DIT RACING landing page", () => {
  beforeEach(() => {
    mockBackend.submitBooking = vi.fn(
      async (): Promise<Result> => ({ __kind__: "ok", ok: "BK-000042" }),
    );
    mockBackend.getBooking = vi.fn(async () => null);
    // The site defaults to Khmer; these journeys assert the English copy.
    setStoredLang("en");
  });

  it("renders the full landing page without a blank screen", () => {
    renderWithProviders(<App />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "DIT RACING",
    );
    expect(
      screen.getByRole("heading", { name: UI.servicesTitle.en }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: UI.galleryTitle.en }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: UI.whyTitle.en }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: UI.testimonialsTitle.en }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: UI.bookingTitle.en }),
    ).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("shows both phone numbers as tap-to-call links in the hero", () => {
    renderWithProviders(<App />);

    const hero = screen.getByTestId("hero.section");
    for (const [index, phone] of SHOP.phones.entries()) {
      const link = within(hero).getByTestId(`hero.call_button.${index + 1}`);
      expect(link).toHaveTextContent(phone);
      expect(link).toHaveAttribute("href", `tel:${phone.replace(/\s/g, "")}`);
    }
  });

  it("repeats both phone numbers as tap-to-call links in the footer", () => {
    renderWithProviders(<App />);

    const footer = screen.getByRole("contentinfo");
    for (const [index, phone] of SHOP.phones.entries()) {
      const link = within(footer).getByTestId(`footer.call_link.${index + 1}`);
      expect(link).toHaveTextContent(phone);
      expect(link).toHaveAttribute("href", `tel:${phone.replace(/\s/g, "")}`);
    }
    expect(within(footer).getByText(SHOP.address.en)).toBeInTheDocument();
  });

  it("renders six bilingual service cards", () => {
    renderWithProviders(<App />);

    for (let index = 1; index <= 6; index += 1) {
      expect(screen.getByTestId(`services.card.${index}`)).toBeInTheDocument();
    }
  });

  it("renders a workshop image in the hero", () => {
    renderWithProviders(<App />);

    const images = screen.getAllByRole("img");
    expect(
      images.some((image) =>
        image.getAttribute("src")?.includes("hero-workshop"),
      ),
    ).toBe(true);
  });

  it("renders the animated background as a non-interactive layer", () => {
    const { container } = renderWithProviders(<App />);

    const background = container.querySelector(
      ".pointer-events-none.fixed.inset-0",
    );
    expect(background).not.toBeNull();
    expect(background).toHaveAttribute("aria-hidden", "true");
  });

  it("switches all visible copy between Khmer and English and persists the choice", async () => {
    const user = userEvent.setup();
    window.localStorage.removeItem(LANG_STORAGE_KEY);
    const { unmount } = renderWithProviders(<App />);

    // Default language is Khmer.
    expect(
      screen.getByRole("heading", { name: UI.servicesTitle.km }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "DIT RACING",
    );

    await user.click(screen.getByTestId("nav.lang.toggle"));

    expect(
      screen.getByRole("heading", { name: UI.servicesTitle.en }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: UI.servicesTitle.km }),
    ).not.toBeInTheDocument();
    expect(window.localStorage.getItem(LANG_STORAGE_KEY)).toBe("en");
    expect(document.documentElement.lang).toBe("en");

    // A fresh mount reads the stored choice back, i.e. it survives a refresh.
    unmount();
    renderWithProviders(<App />);
    expect(
      screen.getByRole("heading", { name: UI.servicesTitle.en }),
    ).toBeInTheDocument();
  });

  it("scrolls to the matching section when a desktop nav link is clicked", async () => {
    const user = userEvent.setup();
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    renderWithProviders(<App />);

    await user.click(screen.getByTestId("nav.gallery.link"));

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
    expect(document.getElementById("gallery")).not.toBeNull();
  });

  it("opens the mobile slide-in menu and navigates from it", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    expect(screen.queryByTestId("nav.menu.sheet")).not.toBeInTheDocument();

    await user.click(screen.getByTestId("nav.menu.toggle"));
    const sheet = screen.getByTestId("nav.menu.sheet");
    expect(sheet).toBeInTheDocument();
    expect(document.body.style.overflow).toBe("hidden");

    await user.click(within(sheet).getByTestId("nav.mobile.services.link"));
    expect(screen.queryByTestId("nav.menu.sheet")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");
  });

  it("preselects the booking form service when a service card is booked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    await user.click(screen.getByTestId("services.book_button.3"));

    await waitFor(() => {
      expect(screen.getByTestId("booking.service_select")).toHaveValue(
        "brakes",
      );
    });
  });

  it("opens the gallery lightbox on image click and closes it on Escape", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    expect(screen.queryByTestId("gallery.lightbox")).not.toBeInTheDocument();

    await user.click(screen.getByTestId("gallery.item.2"));
    expect(screen.getByTestId("gallery.lightbox")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByTestId("gallery.lightbox")).not.toBeInTheDocument();
    });
  });

  it("closes the gallery lightbox on backdrop click", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    await user.click(screen.getByTestId("gallery.item.1"));
    expect(screen.getByTestId("gallery.lightbox")).toBeInTheDocument();

    await user.click(screen.getByTestId("gallery.lightbox.backdrop"));
    await waitFor(() => {
      expect(screen.queryByTestId("gallery.lightbox")).not.toBeInTheDocument();
    });
  });

  it("advances the testimonials carousel with the manual controls", async () => {
    const user = userEvent.setup();
    renderWithProviders(<App />);

    const firstQuote = screen.getByTestId("testimonials.quote").textContent;
    await user.click(screen.getByTestId("testimonials.next_button"));
    expect(screen.getByTestId("testimonials.quote").textContent).not.toBe(
      firstQuote,
    );

    await user.click(screen.getByTestId("testimonials.prev_button"));
    expect(screen.getByTestId("testimonials.quote").textContent).toBe(
      firstQuote,
    );
  });

  it("shows the workshop hours, map image and a Get Directions link", () => {
    renderWithProviders(<App />);

    const whyUs = screen.getByTestId("why_us.section");
    expect(within(whyUs).getByText(SHOP.hours.en)).toBeInTheDocument();
    expect(within(whyUs).getByText(SHOP.hoursSunday.en)).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("img")
        .some((image) => image.getAttribute("src")?.includes("map-cambodia")),
    ).toBe(true);

    const directions = within(whyUs).getByTestId("why_us.directions_link");
    expect(directions).toHaveAttribute("href", DIRECTIONS_URL);
    expect(directions).toHaveAttribute("target", "_blank");
  });
});
