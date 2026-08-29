import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

type UserRole = "ADMIN" | "AGENT" | "EMPLOYEE";

interface UserExtended extends User {
    accessToken?: string;
    role?: UserRole;
    departmentId?: number | null
}

interface JWTExtended extends JWT {
    user?: UserExtended;
    accessToken?: string;
}

interface SessionExtended extends Session {
    accessToken? :string;
}


export type {UserExtended, JWTExtended, SessionExtended}