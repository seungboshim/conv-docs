# 리포지토리 인터페이스 표준 (Spring Data JPA)

1. **어노테이션:** 리포지토리 인터페이스에 반드시 `@Repository` 어노테이션을 사용해야 합니다.

2. **타입:** 반드시 인터페이스여야 합니다.

3. **상속:** 반드시 `JpaRepository<EntityName, EntityIdType>`(또는 유사한 Spring Data 인터페이스)를 확장해야 합니다.

4. **쿼리 언어:** 네이티브 SQL이 필요하지 않는 한 `@Query` 어노테이션에 JPQL을 사용해야 합니다.

5. **N+1 문제:** 지연 로딩 관계를 로드할 때 N+1 이슈를 방지하기 위해 `@EntityGraph(attributePaths = {...})` 또는 JPQL의 `JOIN FETCH`를 사용해야 합니다.

6. **복잡한 프로젝션:** 특히 조인에서 특정 데이터를 선택할 때 `@Query`에서 DTO 프로젝션(인터페이스 또는 클래스 기반)을 사용하세요.

## 예시 코드

```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // 기본 메서드는 JpaRepository에서 자동으로 제공됨

    // 사용자 지정 쿼리 - JPQL 사용
    @Query("SELECT u FROM User u WHERE u.email = :email")
    Optional<User> findByEmail(@Param("email") String email);

    // N+1 문제 방지를 위한 EntityGraph 사용
    @EntityGraph(attributePaths = {"orders"})
    @Query("SELECT u FROM User u WHERE u.id = :id")
    Optional<User> findByIdWithOrders(@Param("id") Long id);

    // DTO 프로젝션 사용 (인터페이스 기반)
    @Query("SELECT u.id as id, u.username as username, u.email as email FROM User u")
    List<UserSummaryDto> findAllUserSummaries();

    // 네이티브 쿼리 - 필요한 경우에만 사용
    @Query(value = "SELECT * FROM users WHERE created_at > :date", nativeQuery = true)
    List<User> findRecentUsers(@Param("date") Date date);
}
```

**인터페이스 기반 DTO 프로젝션 예시:**

```java
public interface UserSummaryDto {
    Long getId();
    String getUsername();
    String getEmail();
}
```
