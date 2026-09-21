module {
  /// A short, human-readable confirmation reference returned to the user
  /// after a booking request is stored (e.g. "BK-000123").
  public type BookingRef = Text;

  /// Wall-clock timestamp in nanoseconds since the epoch.
  public type Timestamp = Nat;
};
