package com.aman.urlshortner.utils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

@Component
public class CookieUtil {

    public static final String REFRESH_COOKIE = "refreshToken";
    @Value("${cookie.secure}")
    private boolean secure;

    public void addRefreshCookie(
            HttpServletResponse response,
            String token,
            int maxAge
    ) {

//        Cookie cookie = new Cookie(REFRESH_COOKIE, token);
//
//        cookie.setHttpOnly(true);
//        cookie.setSecure(secure);
//        cookie.setPath("/");
//        cookie.setMaxAge(maxAge);
//
//        response.addCookie(cookie);

        ResponseCookie cookie = ResponseCookie.from(REFRESH_COOKIE, token)
                .httpOnly(true)
                .secure(secure)
                .sameSite("Lax")   // or "None" if frontend is on another origin
                .path("/")
                .maxAge(maxAge)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }

    public String getRefreshToken(HttpServletRequest request) {
        if (request.getCookies() == null)
            return null;
        for (Cookie cookie : request.getCookies()) {
            if (REFRESH_COOKIE.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }
        return null;
    }

    public void clearRefreshCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie(REFRESH_COOKIE, "");
        cookie.setHttpOnly(true);
        cookie.setSecure(secure);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

}
