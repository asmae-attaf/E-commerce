package com.back.shopback.Exception;

public class ProduitNotFoundException extends RuntimeException{

    public ProduitNotFoundException(String message) {
        super(message);
    }

    public ProduitNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
