# 애플리케이션 로직 설계 (마이크로서비스 컨텍스트)

## 기술 스택 (서비스별)

- **프레임워크:** Java Spring Boot 3+ with JDK 21
- **빌드 도구:** Gradle
- **의존성:** Spring Web, Spring Data JPA, Lombok, PostgreSQL 드라이버 (또는 관련 DB 드라이버)
- **프론트엔드 (소비 대상):** React + Vite (Node.js v22) - _CORS 영향을 고려하세요._
- **아키텍처:** 마이크로서비스 아키텍처 (MSA)

## 레이어 책임 및 데이터 흐름 (서비스 내)

1. **RestController:** HTTP 요청/응답 처리, Service 레이어 호출 조율. 해당 도메인의 API 게이트웨이 인터페이스 역할.
2. **ServiceImpl:** 비즈니스 로직 포함, Repository를 통한 데이터베이스 작업 조율. 마이크로서비스 도메인의 핵심 로직 표현.
3. **Repository:** **PostgreSQL** 데이터베이스 상호작용을 위해 JpaRepository를 확장하는 인터페이스.
4. **DTO:** Controller와 Service 간(그리고 잠재적으로 API를 통한 서비스 간) 데이터 전송. 명확한 API 계약 정의에 필수적.
5. **Entity:** JPA를 사용하여 PostgreSQL 테이블에 매핑. Service/Repository 레이어 내부에서 사용. API를 통해 직접 노출하면 안 됨.

## 상호작용 제약

- RestController는 Repository를 직접 주입(autowire)할 수 없음.
- ServiceImpl 클래스는 데이터베이스 접근을 위해 **반드시** Repository 메서드를 사용해야 하며, 절대적으로 필요한 경우가 아니면 직접 쿼리를 사용하지 않음.
- MSA에서 유지보수성과 독립적 배포 가능성을 위해 이러한 레이어 준수가 중요함.
