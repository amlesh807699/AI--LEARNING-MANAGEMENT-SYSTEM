import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export function middleware(req) {
  const token = req.cookies.get("token")?.value
  const url = req.nextUrl.clone()

  
  if (!token) {
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }

  try {
    
    const decoded = jwt.decode(token)
    const role = decoded?.role

  
    if (url.pathname.startsWith("/admin") && role !== "ADMIN") {
      url.pathname = "/unauthorized"
      return NextResponse.redirect(url)
    }

  
    if (url.pathname.startsWith("/teacher") && role !== "TEACHER") {
      url.pathname = "/unauthorized"
      return NextResponse.redirect(url)
    }

    
    if (url.pathname.startsWith("/student") && role !== "STUDENT") {
      url.pathname = "/unauthorized"
      return NextResponse.redirect(url)
    }


    return NextResponse.next()
  } catch (err) {
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: [
    "/teacher/:path*",
    "/student/:path*"
  ],
}
