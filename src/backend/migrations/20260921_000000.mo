import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";

module {
  type Booking = {
    ref : Text;
    name : Text;
    phone : Text;
    motorcycleModel : Text;
    serviceType : Text;
    preferredDate : Text;
    notes : Text;
    createdAt : Nat;
  };

  type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    bookings : Map.Map<Text, Booking>;
    state : { var nextBookingSeq : Nat };
  };

  public func migration(_old : {}) : NewActor {
    {
      accessControlState = AccessControl.initState();
      bookings = Map.empty();
      state = { var nextBookingSeq = 0 };
    };
  };
};
