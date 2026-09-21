import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Common "../types/common";
import Types "../types/booking";

module {
  /// Validate a booking input, returning the first failure found.
  public func validate(input : Types.BookingInput) : ?Types.BookingError {
    if (input.name.trim(#predicate(func c = c == ' ')).size() == 0) {
      return ?#emptyName;
    };
    if (input.phone.trim(#predicate(func c = c == ' ')).size() == 0) {
      return ?#emptyPhone;
    };
    if (input.serviceType.trim(#predicate(func c = c == ' ')).size() == 0) {
      return ?#emptyServiceType;
    };
    null;
  };

  /// Build a stored booking record from validated input.
  public func newBooking(
    ref : Common.BookingRef,
    input : Types.BookingInput,
    createdAt : Common.Timestamp,
  ) : Types.Booking {
    {
      ref;
      name = input.name;
      phone = input.phone;
      motorcycleModel = input.motorcycleModel;
      serviceType = input.serviceType;
      preferredDate = input.preferredDate;
      notes = input.notes;
      createdAt;
    };
  };

  /// Format a sequential number into a short human-readable reference.
  public func formatRef(seq : Nat) : Common.BookingRef {
    let digits = seq.toText();
    let width = 6;
    let padding = if (digits.size() >= width) { "" } else {
      var zeros = "";
      var i = digits.size();
      while (i < width) {
        zeros := zeros # "0";
        i += 1;
      };
      zeros;
    };
    "BK-" # padding # digits;
  };

  /// Store a booking under its reference.
  public func store(
    bookings : Map.Map<Common.BookingRef, Types.Booking>,
    booking : Types.Booking,
  ) : () {
    bookings.add(booking.ref, booking);
  };

  /// Look up a stored booking by its confirmation reference.
  public func find(
    bookings : Map.Map<Common.BookingRef, Types.Booking>,
    ref : Common.BookingRef,
  ) : ?Types.Booking {
    bookings.get(ref);
  };
};
