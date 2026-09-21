import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Booking {
    ref: BookingRef;
    serviceType: string;
    motorcycleModel: string;
    name: string;
    createdAt: Timestamp;
    preferredDate: string;
    notes: string;
    phone: string;
}
export interface BookingInput {
    serviceType: string;
    motorcycleModel: string;
    name: string;
    preferredDate: string;
    notes: string;
    phone: string;
}
export type BookingRef = string;
export interface Cell {
    value: Value;
    name: string;
}
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export type Result = {
    __kind__: "ok";
    ok: BookingRef;
} | {
    __kind__: "err";
    err: BookingError;
};
export type Result_1 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export interface Result__1 {
    hasMore: boolean;
    rows: Array<Array<Cell>>;
}
export type Timestamp = bigint;
export type Value = {
    __kind__: "int";
    int: bigint;
} | {
    __kind__: "nat";
    nat: bigint;
} | {
    __kind__: "float";
    float: number;
} | {
    __kind__: "bool";
    bool: boolean;
} | {
    __kind__: "null";
    null: null;
} | {
    __kind__: "text";
    text: string;
};
export enum BookingError {
    emptyName = "emptyName",
    emptyPhone = "emptyPhone",
    emptyServiceType = "emptyServiceType"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    execute(qJson: string): Promise<Result__1>;
    /**
     * / Static Markdown documentation of the backend's public API.
     */
    getApiDoc(): Promise<string>;
    /**
     * / Fetch a stored booking by its confirmation reference.
     */
    getBooking(ref: BookingRef): Promise<Booking | null>;
    getCallerUserRole(): Promise<UserRole>;
    isCallerAdmin(): Promise<boolean>;
    schema(): Promise<string>;
    /**
     * / Submit a repair booking request. Open to anonymous callers.
     * / Returns a short confirmation reference, or a validation error.
     */
    submitBooking(input: BookingInput): Promise<Result>;
}
