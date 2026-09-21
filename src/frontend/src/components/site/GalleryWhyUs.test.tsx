import { Gallery } from "@/components/site/Gallery";
import { WhyUs } from "@/components/site/WhyUs";
import { SHOP, UI } from "@/lib/i18n";
import { DIRECTIONS_URL, GALLERY, WHY_US } from "@/lib/site-data";
import { renderWithProviders } from "@/test/helpers";
import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

/**
 * Characterization baseline for the gallery lightbox and the Why Choose Us
 * section. These assert the behavior that must survive the upcoming change:
 * opening on click, next/previous navigation, closing via button, backdrop and
 * Escape, and the hours/location/map/directions content.
 */
describe("Gallery lightbox", () => {
  it("renders one clickable item per gallery image", () => {
    renderWithProviders(<Gallery lang="en" />);

    for (let index = 1; index <= GALLERY.length; index += 1) {
      expect(screen.getByTestId(`gallery.item.${index}`)).toBeInTheDocument();
    }
    expect(screen.queryByTestId("gallery.lightbox")).not.toBeInTheDocument();
  });

  it("opens the lightbox showing the clicked image", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Gallery lang="en" />);

    await user.click(screen.getByTestId("gallery.item.2"));

    const lightbox = screen.getByTestId("gallery.lightbox");
    expect(lightbox).toBeInTheDocument();
    expect(within(lightbox).getByRole("img")).toHaveAttribute(
      "src",
      GALLERY[1].src,
    );
    expect(within(lightbox).getByText(GALLERY[1].alt.en)).toBeInTheDocument();
  });

  it("advances and rewinds the displayed image with next/previous", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Gallery lang="en" />);

    await user.click(screen.getByTestId("gallery.item.1"));
    const lightbox = screen.getByTestId("gallery.lightbox");
    expect(within(lightbox).getByRole("img")).toHaveAttribute(
      "src",
      GALLERY[0].src,
    );

    await user.click(screen.getByTestId("gallery.lightbox.next_button"));
    expect(
      within(screen.getByTestId("gallery.lightbox")).getByRole("img"),
    ).toHaveAttribute("src", GALLERY[1].src);

    await user.click(screen.getByTestId("gallery.lightbox.prev_button"));
    expect(
      within(screen.getByTestId("gallery.lightbox")).getByRole("img"),
    ).toHaveAttribute("src", GALLERY[0].src);
  });

  it("wraps from the last image forward to the first", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Gallery lang="en" />);

    await user.click(screen.getByTestId(`gallery.item.${GALLERY.length}`));
    await user.click(screen.getByTestId("gallery.lightbox.next_button"));

    expect(
      within(screen.getByTestId("gallery.lightbox")).getByRole("img"),
    ).toHaveAttribute("src", GALLERY[0].src);
  });

  it("closes the lightbox with the close button", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Gallery lang="en" />);

    await user.click(screen.getByTestId("gallery.item.1"));
    expect(screen.getByTestId("gallery.lightbox")).toBeInTheDocument();

    await user.click(screen.getByTestId("gallery.lightbox.close_button"));
    await waitFor(() => {
      expect(screen.queryByTestId("gallery.lightbox")).not.toBeInTheDocument();
    });
  });

  it("closes the lightbox on Escape and restores page scrolling", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Gallery lang="en" />);

    await user.click(screen.getByTestId("gallery.item.1"));
    expect(document.body.style.overflow).toBe("hidden");

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByTestId("gallery.lightbox")).not.toBeInTheDocument();
    });
    expect(document.body.style.overflow).toBe("");
  });

  it("closes the lightbox on backdrop click", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Gallery lang="en" />);

    await user.click(screen.getByTestId("gallery.item.3"));
    await user.click(screen.getByTestId("gallery.lightbox.backdrop"));

    await waitFor(() => {
      expect(screen.queryByTestId("gallery.lightbox")).not.toBeInTheDocument();
    });
  });

  it("renders Khmer lightbox labels when the language is Khmer", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Gallery lang="km" />);

    await user.click(screen.getByTestId("gallery.item.1"));

    expect(
      screen.getByTestId("gallery.lightbox.close_button"),
    ).toHaveAccessibleName(UI.closeLightbox.km);
    expect(
      screen.getByRole("button", { name: UI.next.km }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: UI.prev.km }),
    ).toBeInTheDocument();
  });
});

describe("Why Choose Us", () => {
  it("renders one card per reason", () => {
    renderWithProviders(<WhyUs lang="en" />);

    const section = screen.getByTestId("why_us.section");
    for (let index = 1; index <= WHY_US.length; index += 1) {
      expect(
        within(section).getByTestId(`why_us.card.${index}`),
      ).toBeInTheDocument();
    }
    expect(WHY_US).toHaveLength(4);
  });

  it("shows opening hours, location, map image and a Google Maps directions link", () => {
    renderWithProviders(<WhyUs lang="en" />);

    const section = screen.getByTestId("why_us.section");
    expect(within(section).getByText(SHOP.hours.en)).toBeInTheDocument();
    expect(within(section).getByText(SHOP.hoursSunday.en)).toBeInTheDocument();
    // The address appears both on the map badge and in the location block.
    expect(within(section).getAllByText(SHOP.address.en)).toHaveLength(2);

    const map = within(section)
      .getAllByRole("img")
      .find((image) => image.getAttribute("src")?.includes("map-cambodia"));
    expect(map).toBeDefined();

    const directions = within(section).getByTestId("why_us.directions_link");
    // The accepted requirement pins the link to the shop's exact Google Maps
    // location, so assert the full URL rather than a loose host substring.
    expect(directions).toHaveAttribute("href", DIRECTIONS_URL);
    expect(directions).toHaveAttribute("target", "_blank");
  });

  it("pins the directions link to the shop's exact Google Maps location", () => {
    // Regression guard for the accepted requirement: the link must point at the
    // shop's exact short URL, not a generic maps host.
    expect(DIRECTIONS_URL).toBe(
      "https://maps.app.goo.gl/QPW3TTStmrmGfYJR9?g_st=ac",
    );

    renderWithProviders(<WhyUs lang="en" />);

    const directions = screen.getByTestId("why_us.directions_link");
    expect(directions).toHaveAttribute("href", DIRECTIONS_URL);
    expect(directions).toHaveAttribute("target", "_blank");
    expect(directions).toHaveAttribute("rel", "noreferrer");
  });

  it("renders Khmer hours and location copy when the language is Khmer", () => {
    renderWithProviders(<WhyUs lang="km" />);

    const section = screen.getByTestId("why_us.section");
    expect(within(section).getByText(SHOP.hours.km)).toBeInTheDocument();
    expect(within(section).getAllByText(SHOP.address.km)).toHaveLength(2);
    expect(
      within(section).getByRole("link", { name: UI.getDirections.km }),
    ).toBeInTheDocument();
  });
});
