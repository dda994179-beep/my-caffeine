import Map "mo:core/Map";
import Result "mo:core/Result";
import Time "mo:core/Time";
import Common "../types/common";
import Types "../types/booking";
import BookingLib "../lib/booking";

mixin (
  bookings : Map.Map<Common.BookingRef, Types.Booking>,
  state : { var nextBookingSeq : Nat },
) {
  /// Submit a repair booking request. Open to anonymous callers.
  /// Returns a short confirmation reference, or a validation error.
  public shared func submitBooking(
    input : Types.BookingInput
  ) : async Result.Result<Common.BookingRef, Types.BookingError> {
    switch (BookingLib.validate(input)) {
      case (?err) { #err(err) };
      case null {
        let seq = state.nextBookingSeq;
        state.nextBookingSeq := seq + 1;
        let ref = BookingLib.formatRef(seq);
        let booking = BookingLib.newBooking(ref, input, Time.now().toNat());
        BookingLib.store(bookings, booking);
        #ok(ref);
      };
    };
  };

  /// Fetch a stored booking by its confirmation reference.
  public query func getBooking(ref : Common.BookingRef) : async ?Types.Booking {
    BookingLib.find(bookings, ref);
  };
};
