package com.ldtech.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;

public class ResourceRetrivalException extends RuntimeException{

    public ResourceRetrivalException(String message, Throwable cause) {
        super(message, cause);
    }
}
