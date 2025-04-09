// 프론트엔드 규칙 ID 목록
export const frontendRuleIds = [
  '01-directory-structure',
  '02-naming-convention',
  '03-coding-convention',
  '04-api-fetching-architecture',
  '05-performance-optimization',
  '06-react-typescript-general',
  '07-typescript-usage',
];

// 백엔드 규칙 ID 목록
export const backendRuleIds = [
  '02-application-logic',
  '03-entities',
  '04-repositories',
  '05-services',
  '06-dtos',
  '07-rest-controllers',
  '08-api-response',
  '09-global-exception-handler',
  '10-java-spring-best-practices',
];

// 규칙 ID 목록
export const ruleIds = [...frontendRuleIds, ...backendRuleIds];

// 규칙 제목 및 설명
export const ruleMetadata: Record<string, { title: string; description: string }> = {
  // 프론트엔드 규칙
  '01-directory-structure': {
    title: '디렉토리 구조',
    description: '프로젝트 디렉토리 구조에 관한 규칙',
  },
  '02-naming-convention': {
    title: '네이밍 컨벤션',
    description: '파일, 디렉토리, 함수, 변수 등의 네이밍 규칙',
  },
  '03-coding-convention': {
    title: '코딩 컨벤션',
    description: '코딩 컨벤션에 관한 규칙',
  },
  '04-api-fetching-architecture': {
    title: 'API 페칭 아키텍처',
    description: 'API 페칭 아키텍처에 관한 규칙',
  },
  '05-performance-optimization': {
    title: '성능 최적화',
    description: 'React와 TypeScript 애플리케이션의 성능 최적화를 위한 규칙',
  },
  '06-react-typescript-general': {
    title: 'React와 TypeScript 일반 규칙',
    description: 'React와 TypeScript 프로젝트의 일반적인 모범 사례 및 규칙',
  },
  '07-typescript-usage': {
    title: 'TypeScript 활용',
    description: 'TypeScript 타입 시스템의 효과적인 활용을 위한 규칙',
  },

  // 백엔드 규칙
  '02-application-logic': {
    title: '애플리케이션 로직 설계',
    description: '마이크로서비스 컨텍스트에서의 애플리케이션 레이어 책임과 데이터 흐름',
  },
  '03-entities': {
    title: '엔티티 클래스 표준',
    description: 'JPA 엔티티 설계 표준 (@Entity, @Data, ID 생성, 지연 로딩, 유효성 검사)',
  },
  '04-repositories': {
    title: '리포지토리 인터페이스 표준',
    description: 'Spring Data JPA 리포지토리 설계 표준 (JPQL, @EntityGraph, N+1 방지)',
  },
  '05-services': {
    title: '서비스 레이어 표준',
    description: '서비스 레이어 구조, 생성자 주입, DTO 사용, @Transactional 관리',
  },
  '06-dtos': {
    title: 'DTO 표준',
    description: '데이터 전송 객체 표준 (Java Records, 유효성 검사)',
  },
  '07-rest-controllers': {
    title: 'REST 컨트롤러 표준',
    description: 'RestController 클래스 표준 (@RequestMapping, HTTP 메서드, 중앙화된 오류 처리)',
  },
  '08-api-response': {
    title: 'API 응답 구조',
    description: '컨트롤러에서 반환되는 ResponseEntity에 사용되는 ApiResponse 래퍼 클래스',
  },
  '09-global-exception-handler': {
    title: '전역 예외 처리기',
    description: '중앙화된 오류 처리를 위한 @RestControllerAdvice 기반 예외 처리기',
  },
  '10-java-spring-best-practices': {
    title: 'Java 및 Spring Boot 모범 사례',
    description: 'Java (JDK 21+), Spring Boot 3+, Gradle 표준 및 모범 사례',
  },
};
