# Java (JDK 21+) & Spring Boot 3+ 모범 사례 (Gradle 프로젝트)

## 코드 스타일 및 구조

- 깔끔하고 효율적이며 문서화된 Java 코드. Spring Boot 규칙 준수.
- RESTful API 설계. 설명적인 이름(`camelCase`, `PascalCase`).
- 논리적 구조(컨트롤러, 서비스, 리포지토리, DTO 등). 높은 응집도, 낮은 결합도. 유지보수 가능한 마이크로서비스를 위해 중요함.

## Spring Boot 및 Java

- Gradle을 통해 Spring Boot 스타터 사용(`build.gradle` 또는 `build.gradle.kts`).
- Spring Boot 자동 구성 활용. 적절한 예외 처리(`@ControllerAdvice`).
- 적용 가능한 JDK 21 기능 활용(Records, 패턴 매칭, 가상 스레드(I/O 바운드 작업 고려), Sealed 클래스 등). Spring Boot 3.x 기능 사용.

## 명명 규칙

- 클래스/인터페이스/열거형/레코드: `PascalCase`.
- 메서드/변수: `camelCase`.
- 상수: `ALL_CAPS_SNAKE_CASE`.

## 구성

- `application.properties` 또는 `application.yml` 사용. 환경에 따른 Spring 프로필(`application-dev.yml` 등). `@ConfigurationProperties`.

## 의존성 주입

- 반드시 생성자 주입 사용.

## 테스팅

- 단위 테스트: JUnit 5, Mockito, Spring Boot Test(`@SpringBootTest`, `@WebMvcTest`, `@DataJpaTest`). Gradle을 통해 실행(`./gradlew test`).
- 웹 레이어 테스트를 위한 MockMvc. 리포지토리 레이어를 위한 `@DataJpaTest`(PostgreSQL 통합을 위해 Testcontainers 고려).
- 통합 테스트: `@SpringBootTest`.

## 성능

- 캐싱(`@EnableCaching`, `@Cacheable`).
- 비동기 처리(`@Async`, JDK 21+에서 프로젝트 Loom / 가상 스레드 고려).
- 데이터베이스 인덱싱(PostgreSQL) 및 쿼리 최적화(`@EntityGraph`, `JOIN FETCH`).

## 보안

- 인증/인가를 위한 Spring Security. BCryptPasswordEncoder.
- 특히 다른 출처의 React/Vite 프론트엔드를 고려하여 CORS(`@CrossOrigin` 또는 글로벌 구성) 올바르게 구성.
- 입력 소독/유효성 검사. OWASP 준수.

## 로깅

- Logback과 함께 SLF4J. 적절한 수준(ERROR, WARN, INFO, DEBUG)에서 의미 있는 로그.

## API 문서화

- 컨트롤러에서 자동으로 Swagger 문서를 생성하기 위해 반드시 Springdoc OpenAPI(`springdoc-openapi-starter-webmvc-ui` Gradle 의존성)를 사용하세요. API를 명확하게 어노테이션 처리하세요(`@Operation`, `@Parameter` 등).

## 데이터 액세스 (JPA with PostgreSQL)

- Spring Data JPA. 올바른 엔티티 관계 및 캐스케이딩.
- 데이터베이스 마이그레이션(Gradle 플러그인을 통해 관리되는 Flyway 또는 Liquibase).

## 빌드

- 의존성 관리, 빌드 작업(`./gradlew build`) 및 MSA를 단일 저장소 내에서 구조화하는 경우 잠재적으로 다중 모듈 프로젝트 관리를 위해 Gradle 사용.

## 마이크로서비스 (MSA) 컨텍스트

- 이러한 관행은 다양한 마이크로서비스 간의 일관성과 유지보수성을 촉진합니다.
- API 계약(DTO), 독립적 배포 가능성 및 잠재적 서비스 간 통신 패턴(예: REST 클라이언트, 메시지 큐 - 구체적인 규칙은 포함되지 않음)에 주의를 기울이세요.
