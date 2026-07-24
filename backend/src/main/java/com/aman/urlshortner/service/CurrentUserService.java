package com.aman.urlshortner.service;

import com.aman.urlshortner.entity.UserDetailsPrincipal;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class CurrentUserService {
    public UserDetailsPrincipal getCurrentUser() {
        Authentication authentication = SecurityContextHolder
                .getContext()
                .getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) return null;
        if (authentication.getPrincipal() instanceof UserDetailsPrincipal user) return user;
        return null;
    }

    public Long getUserId() {
        UserDetailsPrincipal user = getCurrentUser();
        return user != null ? user.getUserId() : null;
    }

    public String getUserEmail() {
        UserDetailsPrincipal user = getCurrentUser();
        return user != null ? user.getUsername() : null;
    }
}
