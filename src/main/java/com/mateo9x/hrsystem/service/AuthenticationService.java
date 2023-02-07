package com.mateo9x.hrsystem.service;

import com.mateo9x.hrsystem.authentication.AuthenticationRequest;
import jakarta.servlet.http.Cookie;
import org.javatuples.Pair;

public interface AuthenticationService {

    Pair<String, Cookie> authenticateUser(AuthenticationRequest request);

    Cookie logoutUser();
}
