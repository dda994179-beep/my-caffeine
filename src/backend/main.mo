import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Expose "mo:caffeineai-oql/Expose";
import Entity "mo:caffeineai-oql/Entity";
import MapEntity "mo:caffeineai-oql/MapEntity";
import RecordValue "mo:caffeineai-oql/RecordValue";
import TextValue "mo:caffeineai-oql/TextValue";
import NatValue "mo:caffeineai-oql/NatValue";
import Common "types/common";
import Types "types/booking";
import BookingApi "mixins/booking-api";
import ApiDocMixin "mixins/api-doc";

actor {
  let accessControlState : AccessControl.AccessControlState;
  include MixinAuthorization(accessControlState, null);

  let bookings : Map.Map<Common.BookingRef, Types.Booking>;
  let state : { var nextBookingSeq : Nat };

  include BookingApi(bookings, state);
  include ApiDocMixin();

  include Expose({
    entities = [
      bookings.toEntity("booking", "Booking", "ref")
        .sample({
          ref = "BK-000000";
          name = "";
          phone = "";
          motorcycleModel = "";
          serviceType = "";
          preferredDate = "";
          notes = "";
          createdAt = 0;
        })
        .controllerOnly()
        .build(),
    ];
  });
};
