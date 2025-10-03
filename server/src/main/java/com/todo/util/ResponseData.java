package com.todo.util;

public record ResponseData(int status,Object data) {


    public ResponseData(Integer statusCode) {
        this(statusCode, defaultMessage(statusCode));
    }

    private static String defaultMessage(Integer code) {
        return switch (code) {
            case 200 -> "Success";
            case 201 -> "Created";
            case 204 -> "No Content";
            case 400 -> "Bad Request";
            case 404 -> "Data Not Found";
            case 500 -> "Internal Server Error";
            case 401 -> "Authentication Error";
            default -> "Unknown Status";
        };
    }
}
