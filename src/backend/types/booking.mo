import Common "../types/common";

module {
  /// A repair booking request submitted from the public booking form.
  public type Booking = {
    ref : Common.BookingRef;
    name : Text;
    phone : Text;
    motorcycleModel : Text;
    serviceType : Text;
    preferredDate : Text;
    notes : Text;
    createdAt : Common.Timestamp;
  };

  /// Caller-facing input for submitting a booking request.
  public type BookingInput = {
    name : Text;
    phone : Text;
    motorcycleModel : Text;
    serviceType : Text;
    preferredDate : Text;
    notes : Text;
  };

  /// Validation failure returned instead of trapping.
  public type BookingError = {
    #emptyName;
    #emptyPhone;
    #emptyServiceType;
  };
};
