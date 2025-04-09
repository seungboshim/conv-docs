# 데이터 전송 객체(DTO) 표준

1. **타입:** 가능한 한 DTO에는 간결함과 불변성을 위해 Java `record`(JDK 16부터 사용 가능, JDK 21에서 표준)를 사용해야 합니다. 변경 가능성이 엄격하게 요구되는 경우에만 전통적인 클래스를 사용하세요.

```java
public record UserDto(Long id, String username, String email) {
    // 유효성 검사를 위한 컴팩트 생성자(JDK 16+)
    public UserDto {
        if (username == null || username.isBlank()) { // isBlank() 사용
            throw new IllegalArgumentException("Username cannot be blank");
        }
        // ... 다른 유효성 검사
    }
}
```

2. **유효성 검사:** DTO의 생성자(record의 경우 컴팩트 생성자) 내에서 유효성 검사를 구현하거나, 컨트롤러에서 `@Valid`를 통해 검증하는 클래스인 경우 Bean Validation 어노테이션을 사용하세요.

3. **목적:** 특정 API 작업에 맞게 DTO를 조정하세요(예: `UserCreationRequest`, `OrderSummaryDto`). DTO는 서비스 API의 계약을 정의합니다.

## 예시 코드

### Record 형식의 DTO (권장)

```java
// 응답 DTO
public record UserDto(
    Long id,
    String username,
    String email,
    LocalDateTime createdAt
) {
    // 유효성 검사가 필요한 경우 컴팩트 생성자 사용
    public UserDto {
        if (username == null || username.isBlank()) {
            throw new IllegalArgumentException("Username cannot be blank");
        }
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Invalid email format");
        }
    }
}

// 요청 DTO
public record CreateUserRequest(
    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    String username,

    @NotBlank(message = "Email is required")
    @Email(message = "Valid email is required")
    String email,

    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters")
    String password
) {}
```

### 클래스 형식의 DTO (필요한 경우에만)

```java
// 변경 가능성이 필요한 경우
@Data
public class UpdateUserRequest {
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String username;

    @Email(message = "Valid email is required")
    private String email;

    // ... 다른 필드
}
```
