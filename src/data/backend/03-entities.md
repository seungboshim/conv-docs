# 엔티티 클래스 표준 (JPA with PostgreSQL)

1. **어노테이션:** 엔티티 클래스에 반드시 `@Entity` 어노테이션을 사용해야 합니다.

2. **Lombok:** 특별히 지정하지 않는 한 `@Data`(또는 `@Getter`, `@Setter`, `@ToString` 등의 세분화된 Lombok 어노테이션)를 사용해야 합니다.

3. **기본 키:** ID 필드에 반드시 `@Id` 어노테이션을 사용해야 합니다. **PostgreSQL** 시퀀스/아이덴티티 컬럼에 적합한 자동 증가 기본 키의 경우 `@GeneratedValue(strategy = GenerationType.IDENTITY)`를 사용하세요.

4. **관계:** 기본적으로 모든 `@*ToMany`와 `@*ToOne` 관계에 `FetchType.LAZY`를 사용해야 합니다. 명시적인 즉시 로딩(eager fetching)은 쿼리의 `@EntityGraph` 또는 `JOIN FETCH`를 통해 처리하세요.

5. **유효성 검사:** 속성에 Jakarta Bean Validation 어노테이션(`@Size`, `@NotEmpty`, `@Email` 등)을 사용하세요.

6. **데이터베이스 매핑:** 필요한 경우 PostgreSQL 데이터 유형 및 제약 조건에 매핑하기 위해 `@Column`과 같은 어노테이션을 적절히 사용하세요.

## 예시 코드

```java
@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false, length = 50, unique = true)
    @Size(min = 3, max = 50)
    @NotEmpty
    private String username;

    @Column(name = "email", nullable = false, unique = true)
    @Email
    @NotEmpty
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Order> orders;
}
```
