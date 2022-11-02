package com.ssafy.memberservice.global.security.auth;

import com.ssafy.memberservice.domain.member.domain.Member;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.*;

@Getter
@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails, OAuth2User {
    private final UUID id;
    private final String email;
    private final Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    public static CustomUserDetails create(Member member) {
        List<GrantedAuthority> authorities = Collections.
                singletonList(new SimpleGrantedAuthority(member.getRole().name()));

        return new CustomUserDetails(
                member.getId(),
                member.getEmail(),
                authorities
        );
    }

    public static CustomUserDetails create(Member member, Map<String, Object> attributes) {
        CustomUserDetails userDetails = CustomUserDetails.create(member);
        userDetails.setAttributes(attributes);
        return userDetails;
    }

    // UserDetail Override
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

//    @Override
//    public String getUsername() {
//        return username;
//    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // OAuth2User Override
    @Override
    public String getName() {
        return String.valueOf(id);
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public void setAttributes(Map<String, Object> attributes) {
        this.attributes = attributes;
    }
}