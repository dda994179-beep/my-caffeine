mixin () {
  /// Static Markdown documentation of the backend's public API.
  public query func getApiDoc() : async Text {
    "# Booking Backend API\n\n" #
    "This canister stores repair booking requests submitted from the public " #
    "booking form of the motorcycle repair shop site. It exposes two public " #
    "endpoints plus the platform authorization and data-intelligence surfaces.\n\n" #
    "## Public methods\n\n" #
    "### `submitBooking(input : BookingInput) : async Result<BookingRef, BookingError>`\n\n" #
    "Update call. Accepts a repair booking request and, when valid, stores it and " #
    "returns a short human-readable confirmation reference.\n\n" #
    "`BookingInput` fields (all `Text`):\n\n" #
    "- `name` - customer name (required)\n" #
    "- `phone` - contact phone number (required)\n" #
    "- `motorcycleModel` - motorcycle model (optional)\n" #
    "- `serviceType` - requested service (required)\n" #
    "- `preferredDate` - preferred date as free text (optional)\n" #
    "- `notes` - additional notes (optional)\n\n" #
    "Returns `#ok(ref)` where `ref` is a confirmation reference such as " #
    "`\"BK-000000\"`, or `#err(error)` with one of:\n\n" #
    "- `#emptyName` - `name` is empty or whitespace only\n" #
    "- `#emptyPhone` - `phone` is empty or whitespace only\n" #
    "- `#emptyServiceType` - `serviceType` is empty or whitespace only\n\n" #
    "Validation failures are returned as an error variant, never as a trap.\n\n" #
    "### `getBooking(ref : BookingRef) : async ?Booking`\n\n" #
    "Query call. Returns the stored booking for the given confirmation reference, " #
    "or `null` when no booking exists under that reference.\n\n" #
    "`Booking` fields: `ref`, `name`, `phone`, `motorcycleModel`, `serviceType`, " #
    "`preferredDate`, `notes` (all `Text`) and `createdAt` (`Nat`, nanoseconds " #
    "since the epoch).\n\n" #
    "### `getApiDoc() : async Text`\n\n" #
    "Query call. Returns this document.\n\n" #
    "## Authentication and authorization\n\n" #
    "`submitBooking` and `getBooking` require no authentication and are open to " #
    "anonymous callers. The app's frontend pins an Internet Identity derivation " #
    "origin, published at `/.well-known/ii-derivation-origin` when available; an " #
    "agent already holding the user's Internet Identity authorization derives the " #
    "correct per-app principal against that origin (for example " #
    "`icp identity link web <name> --app <host>`). Such a delegation acts with the " #
    "user's full authority in this app until it expires.\n\n" #
    "The canister also includes the platform authorization mixin. Its guarded " #
    "endpoints require a registered, signed-in caller. Registration happens only " #
    "when a caller signs in through the app's own frontend, so a principal that " #
    "never did so is unregistered even when it belongs to the app's owner, and a " #
    "signed-in caller derived against a different origin is a different principal " #
    "than the one the frontend registered. A direct API caller must call " #
    "`_initialize_access_control` once as a signed-in caller before any " #
    "role-guarded call, including guarded queries; the first initializer receives " #
    "the owner role and subsequent callers receive the user role. An unregistered " #
    "or anonymous caller on a guarded endpoint is rejected by the authorization " #
    "layer.\n\n" #
    "## Units and encodings\n\n" #
    "- `BookingRef` is `Text`, formatted `BK-` followed by a zero-padded " #
    "six-digit sequence number.\n" #
    "- `createdAt` is `Nat`, wall-clock nanoseconds since the epoch.\n" #
    "- Optional values are Candid `opt`; absent bookings are returned as `null`.\n\n" #
    "## Lifecycle and polling\n\n" #
    "`submitBooking` completes in a single update call and returns the " #
    "confirmation reference directly; there is no asynchronous job to poll. The " #
    "reference is stable and can be used with `getBooking` at any later time. " #
    "Bookings persist in canister state across upgrades.\n\n" #
    "## Retry safety\n\n" #
    "`submitBooking` is not idempotent: each successful call allocates a new " #
    "sequence number and stores a new booking, so retrying a call that already " #
    "succeeded creates a duplicate booking with a different reference. Retry only " #
    "after a confirmed failure. `getBooking` and `getApiDoc` are read-only and " #
    "safe to retry freely.\n\n" #
    "## Errors and limits\n\n" #
    "- Validation errors are returned as `#err(BookingError)` variants, not traps.\n" #
    "- `getBooking` returns `null` for an unknown reference rather than trapping.\n" #
    "- There is no delete or update endpoint; stored bookings are immutable.\n";
  };
};
