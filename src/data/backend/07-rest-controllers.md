# RestController 표준

1. **어노테이션:** 반드시 `@RestController`를 사용해야 합니다.

2. **라우팅:** 클래스 수준에서 `@RequestMapping("/api/v1/resource")`와 메서드 수준에서 HTTP 매핑 어노테이션(`@GetMapping`, `@PostMapping` 등)을 사용하세요.

3. **의존성 주입:** 서비스를 위해 반드시 생성자 주입을 사용해야 합니다.

4. **반환 타입:** 메서드는 반드시 `ResponseEntity<ApiResponse<T>>`를 반환해야 합니다.

5. **오류 처리:** 예외 처리를 중앙 집중식 `GlobalExceptionHandler`(`@RestControllerAdvice`)에 위임하세요. 표준 오류 흐름에 `try-catch` 블록을 사용하지 마세요. `@Valid`를 사용하여 입력 유효성 검사를 처리하세요.

## 예시 코드

```java
@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    // 생성자 주입
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserSummaryDto>>> getAllUsers() {
        List<UserSummaryDto> users = userService.getAllUsers();
        return ResponseEntity.ok(ApiResponse.success(users, "Users retrieved successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDto>> getUserById(@PathVariable Long id) {
        UserDto user = userService.getUserById(id);
        return ResponseEntity.ok(ApiResponse.success(user, "User retrieved successfully"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<UserDto>> createUser(
            @Valid @RequestBody CreateUserRequest request) {
        UserDto createdUser = userService.createUser(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(createdUser, "User created successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDto>> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UpdateUserRequest request) {
        UserDto updatedUser = userService.updateUser(id, request);
        return ResponseEntity.ok(ApiResponse.success(updatedUser, "User updated successfully"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(ApiResponse.success(null, "User deleted successfully"));
    }
}
```

**중요 사항:**

- 컨트롤러 메서드는 간결하게 유지하고 비즈니스 로직을 직접 포함하지 마세요. 대신 서비스 레이어로 위임하세요.
- HTTP 상태 코드를 적절하게 사용하세요 (200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found 등).
- `@Valid` 어노테이션으로 요청 DTO의 유효성을 검사하세요.
- API 계약을 나타내기 위해 표준화된 응답 구조(`ApiResponse<T>`)를 사용하세요.
