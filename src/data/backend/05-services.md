# 서비스 레이어 표준

1. **인터페이스/구현:** 인터페이스와 `@Service` 어노테이션이 있는 구현체로 서비스를 정의해야 합니다.

2. **의존성 주입:** 반드시 생성자 주입을 사용해야 합니다. 필드 주입은 피하세요.

3. **반환 타입:** 특히 컨트롤러에서 호출하는 공개 서비스 메서드에서는 DTO를 반환하는 것이 좋습니다.

4. **존재 확인:** 필수 조회에 `repository.findById(id).orElseThrow(() -> new ResourceNotFoundException(...))`를 사용하세요.

5. **트랜잭션:** 원자성을 보장하기 위해 여러 데이터베이스 쓰기를 수행하는 메서드에 `@Transactional`를 사용하세요.

## 예시 코드

```java
// 인터페이스
public interface UserService {
    UserDto getUserById(Long id);
    List<UserSummaryDto> getAllUsers();
    UserDto createUser(CreateUserRequest request);
    UserDto updateUser(Long id, UpdateUserRequest request);
    void deleteUser(Long id);
}

// 구현체
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    // 생성자 주입
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        return mapToDto(user);
    }

    @Override
    public List<UserSummaryDto> getAllUsers() {
        return userRepository.findAllUserSummaries();
    }

    @Override
    @Transactional
    public UserDto createUser(CreateUserRequest request) {
        // 요청 유효성 검사
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already in use: " + request.getEmail());
        }

        // 엔티티 생성 및 저장
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        // ... 다른 필드 설정

        User savedUser = userRepository.save(user);
        return mapToDto(savedUser);
    }

    // ... 다른 메서드 구현

    private UserDto mapToDto(User user) {
        return new UserDto(
            user.getId(),
            user.getUsername(),
            user.getEmail()
            // ... 다른 필드
        );
    }
}
```
