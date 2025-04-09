# 전역 예외 처리기 구조

`@RestControllerAdvice`를 사용하여 중앙 집중식 예외 처리기를 구현하세요.

## GlobalExceptionHandler 구현

```java
package com.example; // 패키지 조정

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
// 커스텀 예외 가져오기

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 오류 응답 생성 도우미 메서드
    private ResponseEntity<ApiResponse<?>> createErrorResponse(String message, HttpStatus status) {
        return ResponseEntity
                .status(status)
                .body(ApiResponse.error(message));
    }

    // 리소스를 찾을 수 없는 경우
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleResourceNotFoundException(
            ResourceNotFoundException ex, WebRequest request) {
        return createErrorResponse(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    // 유효성 검사 오류 (@Valid 실패)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<?>> handleValidationException(
            MethodArgumentNotValidException ex, WebRequest request) {
        // 첫 번째 오류 메시지만 추출하거나 모든 오류를 집계
        String errorMessage = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .findFirst()
                .orElse("Validation failed");

        return createErrorResponse(errorMessage, HttpStatus.BAD_REQUEST);
    }

    // 잘못된 인수
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponse<?>> handleIllegalArgumentException(
            IllegalArgumentException ex, WebRequest request) {
        return createErrorResponse(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    // 비즈니스 로직 예외 - 필요에 따라 커스텀 예외 추가

    // 잡히지 않은 모든 예외를 위한 대체 처리기
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> handleAllUncaughtException(
            Exception ex, WebRequest request) {
        // 로깅 추가
        log.error("Unhandled exception occurred", ex);

        return createErrorResponse(
                "An unexpected error occurred. Please try again later.",
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

## 구현 지침

1. **예외 계층 구조:** 비즈니스 도메인에 적합한 커스텀 예외 계층 구조를 만드세요.
2. **적절한 HTTP 상태 코드:** 각 예외 유형에 의미 있는 HTTP 상태 코드를 매핑하세요.
3. **로깅:** 서버 로그에서 디버깅 정보가 손실되지 않도록 예외를 기록하세요(특히 5xx 오류의 경우).
4. **사용자 친화적 메시지:** 기술적 세부 정보나 스택 트레이스 대신 사용자 친화적 메시지를 클라이언트에 반환하세요.
5. **일관성:** 모든 오류 응답에 대해 일관된 응답 형식을 사용하세요(`ApiResponse`).

## 구성

1. 이 클래스가 컴포넌트 스캔에 의해 감지되도록 정확한 패키지에 배치하세요.
2. 필요한 모든 커스텀 예외 클래스를 정의하세요(예: `ResourceNotFoundException`, `BusinessLogicException` 등).
3. 로깅 프레임워크(예: SLF4J with Logback)를 구성하여 모든 예외가 적절한 심각도 수준으로 기록되도록 하세요.
