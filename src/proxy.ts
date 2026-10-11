
import { NextResponse } from "next/server";
import { auth } from "./auth";
import { CustomSession } from "./libs/axios";
import { IUser } from "./types/user";



export const proxy = auth((req) => {
    const session : CustomSession | null = req.auth;

    const accessToken = session?.accessToken;
    const role = (session?.user as IUser)?.role;
    
    const pathName = req.nextUrl.pathname;


    if(pathName.startsWith("/admin") || pathName.startsWith("/agent") || pathName.startsWith("/employee")) {
        if(!accessToken) {
            const url = new URL("/auth/login", req.url);
            return NextResponse.redirect(url);
        }
    }

    if(pathName.startsWith("/admin")) {
        if(accessToken) {
            if(role === "AGENT") {
                const url = new URL("/agent/dashboard", req.url);
                return NextResponse.redirect(url);
            }

            if(role === "EMPLOYEE") {
                const url = new URL("/employee/dashboard", req.url);
                return NextResponse.redirect(url);
            }
        }
    }

    if(pathName.startsWith("/agent")) {
        if(accessToken) {
            if(role === "ADMIN") {
                const url = new URL("/admin/dashboard", req.url);
                return NextResponse.redirect(url);
            }

            if(role === "EMPLOYEE") {
                const url = new URL("/employee/dashboard", req.url);
                return NextResponse.redirect(url);
            }
        }
    }

    if(pathName.startsWith("/employee")) {
        if(accessToken) {
            if(role === "ADMIN") {
                const url = new URL("/admin/dashboard", req.url);
                return NextResponse.redirect(url);
            }

            if(role === "AGENT") {
                const url = new URL("/agent/dashboard", req.url);
                return NextResponse.redirect(url);
            }
        }
    }

    if(pathName === "/auth/login" || 
        pathName === "/auth/register" || 
        pathName === "/login" || 
        pathName === "/register"
    ) {
        if(accessToken) {
            if(role && role === "ADMIN") {
                const url = new URL("/admin/dashboard", req.url);
                return NextResponse.redirect(url);
            } else if(role && role === "AGENT") {
                const url = new URL("/agent/dashboard", req.url);
                return NextResponse.redirect(url);
            } else if(role && role === "EMPLOYEE") {
                const url = new URL("/employee/dashboard", req.url);
                return NextResponse.redirect(url);
            }
        }
    }

    if(pathName === "/admin") {
        if(accessToken) {
            if(role && role === "ADMIN") {
                const url = new URL("/admin/dashboard", req.url);
                return NextResponse.redirect(url);
            }
        }
    }

    if(pathName === "/agent") {
        if(accessToken) {
            if(role && role === "AGENT") {
                const url = new URL("/agent/dashboard", req.url);
                return NextResponse.redirect(url);
            }
        }
    }

    if(pathName === "/employee") {
        if(accessToken) {
            if(role && role === "EMPLOYEE") {
                const url = new URL("/employee/dashboard", req.url);
                return NextResponse.redirect(url);
            }
        }
    }

    if(pathName === "/dashboard") {
        if(accessToken) {
            if(role && role === "ADMIN") {
                const url = new URL("/admin/dashboard", req.url);
                return NextResponse.redirect(url);
            }
            if(role && role === "AGENT") {
                const url = new URL("/agent/dashboard", req.url);
                return NextResponse.redirect(url);
            }
            if(role && role === "EMPLOYEE") {
                const url = new URL("/employee/dashboard", req.url);
                return NextResponse.redirect(url);
            }
        }
    }


    return NextResponse.next();
})



export const config = {
  matcher: [
    "/admin/:path*",
    "/agent/:path*",
    "/employee/:path*",
    "/auth/login",
    "/auth/register",
    "/login",
    "/register",
  ],
};