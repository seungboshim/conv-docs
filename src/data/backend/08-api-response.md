# ApiResponse 클래스 구조

서비스 전반에 걸쳐 표준화된 API 응답을 위해 `ApiResponse` 클래스가 다음 구조를 따르도록 하세요.

## ApiResponse 구현

```java
package com.example; // 필요에 따라 패키지 조정

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {

    private String result;    // "SUCCESS" 또는 "ERROR"
    private String message;   // 사용자 친화적 메시지
    private T data;           // 페이로드(DTO) 또는 null

    // 정적 헬퍼 메서드
    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>("SUCCESS", message, data);
    }

    public static <T> ApiResponse<T> success(T data) {
        return success(data, "Operation successful");
    }

    public static ApiResponse<?> error(String message) {
        return new ApiResponse<>("ERROR", message, null);
    }
}
```

## 사용 예시

`ApiResponse`는 `@RestController` 메서드에서 반환되는 `ResponseEntity` 내에서 사용됩니다:

```java
@GetMapping("/{id}")
public ResponseEntity<ApiResponse<UserDto>> getUserById(@PathVariable Long id) {
    UserDto user = userService.getUserById(id);
    return ResponseEntity.ok(ApiResponse.success(user, "User retrieved successfully"));
}

@PostMapping
public ResponseEntity<ApiResponse<UserDto>> createUser(@Valid @RequestBody CreateUserRequest request) {
    UserDto createdUser = userService.createUser(request);
    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(ApiResponse.success(createdUser, "User created successfully"));
}
```

## 오류 예시

`GlobalExceptionHandler`에서도 사용됩니다:

```java
@ExceptionHandler(ResourceNotFoundException.class)
public ResponseEntity<ApiResponse<?>> handleResourceNotFoundException(
        ResourceNotFoundException ex, WebRequest request) {
    return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(ApiResponse.error(ex.getMessage()));
}
```

## 이점

- 일관된 응답 형식
- 프론트엔드 코드에서 쉽게 파싱
- 상태(성공/오류) 및 메시지 정보 제공
- 제네릭을 통한 유연한 페이로드 타입
