package site.carborn.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MultipartException;
import org.springframework.web.servlet.NoHandlerFoundException;
import site.carborn.util.network.ErrorResponse;

@Slf4j
@RestControllerAdvice
public class GlobalControllerExceptionHandler {
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ErrorResponse> noHandlerFoundException(NoHandlerFoundException e) {
        log.error(e.getMessage());
        return ErrorResponse.toResponseEntity(HttpStatus.NOT_FOUND, e);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> methodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {
        log.error(e.getMessage());
        return ErrorResponse.toResponseEntity(HttpStatus.BAD_REQUEST, e);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> methodArgumentNotValidation(MethodArgumentNotValidException e) {
        log.error(e.getMessage());
        return ErrorResponse.toResponseEntity(HttpStatus.BAD_REQUEST, e);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(MissingPathVariableException.class)
    public ResponseEntity<ErrorResponse> missingPathVariableException(MissingPathVariableException e) {
        log.error(e.getMessage());
        return ErrorResponse.toResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, e);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<ErrorResponse> nullPointerException(NullPointerException e) {
        log.error(e.getMessage());
        return ErrorResponse.toResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, e);
    }

    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity<ErrorResponse> httpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        log.error(e.getMessage());
        return ErrorResponse.toResponseEntity(HttpStatus.METHOD_NOT_ALLOWED, e);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> illegalArgumentException(IllegalArgumentException e) {
        log.error(e.getMessage());
        return ErrorResponse.toResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, e);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(MultipartException.class)
    public ResponseEntity<ErrorResponse> multipartException(MultipartException e) {
        log.error(e.getMessage());
        return ErrorResponse.toResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, e);
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> runtimeException(RuntimeException e) {
        log.error(e.getMessage());
        return ErrorResponse.toResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR, e);
    }
}
