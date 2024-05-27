package com.stockmaster.controller;

import com.stockmaster.dto.ErrorDTO;
import com.stockmaster.exception.BusinessException;
import com.stockmaster.exception.RequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
//Aca se captura cualquier runtime exception y las customException
@RestControllerAdvice
public class ControllerAdvice {
    //Cuando se necesite un RunTimeException y se desee personalizar el mensaje
    //El RunTimeException es un error general
    @ExceptionHandler(value = RuntimeException.class)
    public ResponseEntity<ErrorDTO> runtimeExceptionHandler(RuntimeException ex){
        //Cada que salte este error se hara con un P-500 y el mensaje definido en el service usado para el end point.
        ErrorDTO error = ErrorDTO.builder().message(ex.getMessage()).build();
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);// Este tipo de excepcion dejarlo para este tipo de status http
    }
    //El RequestException se refiere a errores especificos
    @ExceptionHandler(value = RequestException.class)
    public ResponseEntity<ErrorDTO> requestExceptionHandler(RequestException ex){
        //Aca el error se saca de la misma excepcion.
        //ErrorDTO error = ErrorDTO.builder().code(ex.getCode()).message(ex.getMessage()).build();
        ErrorDTO error = ErrorDTO.builder().message(ex.getMessage()).build();
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    //Errores especificos con el http definido
    @ExceptionHandler(value = BusinessException.class)
    public ResponseEntity<ErrorDTO> businessExceptionHandler(BusinessException ex){
        //Aca el error se saca de la misma excepcion y el http status se define previamente.
        ErrorDTO error = ErrorDTO.builder().code(ex.getCode()).message(ex.getMessage()).build();
        return new ResponseEntity<>(error, ex.getStatus());
    }

}
