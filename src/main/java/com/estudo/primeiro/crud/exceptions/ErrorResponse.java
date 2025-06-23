package com.estudo.primeiro.crud.exceptions;

import java.time.Instant;
import java.util.List;

public record ErrorResponse(
        Instant timestamp,
        int status,
        String error,
        String path,
        List<FieldError> fieldErrors) {

    public record FieldError(String field, String message) {}
}