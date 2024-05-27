package com.stockmaster.exception;

import lombok.Data;

@Data
public class RequestException extends RuntimeException{
    //private String code;
    //Para enviar un mensaje de error
    public RequestException(String message) {
        super(message);
        //this.code = code;
    }
    /*
    public RequestException(String code, String message) {
        super(message);
        //this.code = code;
    }*/
}
