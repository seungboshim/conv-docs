# 디렉토리 구조 규칙

## 최상위 디렉토리 구조
- `/src`: 애플리케이션 소스 코드
- `/public`: 정적 애셋
- `/node_modules`: 외부 라이브러리 (git에서 제외됨)
- `/build` 또는 `/dist`: 빌드 결과물 (git에서 제외됨)

## 레이어 아키텍처 기반 디렉토리 구조

### 1. Page Layer
(Next.js의 경우 기본 app router 형식 사용)
- `/src/pages`: 페이지 컴포넌트 (라우팅에 사용)
  - `/src/pages/{DomainName}Page.tsx`: 도메인별 페이지 컴포넌트
  - `/src/pages/index.tsx`: 메인 페이지

### 2. Component Layer
- `/src/components`: 재사용 가능한 UI 컴포넌트
  - `/src/components/common`: 재사용 컴포넌트
    - `/src/components/common/{component}/styles.ts`: varient, styles 정의
    - `/src/components/common/{component}/types.ts`: Props type 정의, 최대한 HTMLAttributes 활용
  - `/src/components/layouts`: 레이아웃 관련 컴포넌트
  - `/src/components/{domain}`: 도메인별 컴포넌트

### 3. Business Layer
- `/src/business`: 비즈니스 로직 관련 코드
  - `/src/business/hooks`: 커스텀 훅
    - `/src/business/hooks/{domain}`: 도메인별 커스텀 훅
    - `/src/business/hooks/{domain}/{function}.ts`: 해당 도메인 훅 구현
    - `/src/business/hooks/{domain}/types`: 훅 Props 타입 정의
  - `/src/business/services`: API 서비스 모듈
    - `/src/business/services/{domain}`: 도메인별 API 서비스
    - `/src/business/services/{domain}/{function}.ts`: 세부 도메인별 API 함수
    - `/src/business/services/{domain}/types`: 도메인 타입 정의
  - `/src/business/viewmodels`: ViewModel 로직 (MVVM 패턴 적용 시)
    - `/src/business/viewmodels/{domain}`: 도메인별 ViewModel
    - `/src/business/viewmodels/{domain}/use{Entity}ViewModel.ts`: ViewModel 구현
    - `/src/business/viewmodels/{domain}/types`: ViewModel 타입 정의

### 4. Store Layer
- `/src/store`: 전역 상태 관리
  - `/src/store/queries`: Tanstack Query 쿼리키 저장
    - `/src/store/queries/{domain}Queries.ts`
  - `/src/store/stores`: 전역 상태 저장
    - `/src/store/stores/{domain}Store.ts`

### 5. Utility Layer
- `/src/utils`: 유틸리티 함수 및 공통 로직
  - `/src/utils/apis`: API 관련 유틸리티 (axios 인스턴스 등)
  - `/src/utils/helpers`: 헬퍼 함수
  - `/src/utils/constants`: 상수 정의, as const로 type assertion
- `/src/types`: 공통 타입 정의
  - `/src/types/baseResponse.ts`: 기본 API 응답 타입
  - `/src/types/tanstack.ts`: Tanstack Query 관련 타입

## 도메인별 파일 구성 예시
```
src/
├── pages/
│   ├── PostListPage.tsx
│   └── PostDetailPage.tsx
├── components/
│   ├── common/
│   │   └── Button/
│   │       ├── Button.styles.ts
│   │       ├── Button.types.ts
│   │       └── index.tsx
│   ├── post/
│   │   ├── PostCard.tsx
│   │   └── PostForm.tsx
├── business/
│   ├── hooks/
│   │   └── post/
│   │       ├── post.ts
│   │       ├── index.ts
│   │       └── types/
│   │           ├── post.types.ts
│   │           └── index.ts
│   ├── services/
│   │   └── post/
│   │       ├── post.ts
│   │       ├── index.ts
│   │       └── types/
│   │           ├── post.types.ts
│   │           └── index.ts
├── store/
│   ├── queries/
│   │   └── postQueries.ts
│   └── stores/
│       └── postStore.ts
└── utils/
    ├── apis/
    │   ├── axios.instance.ts
    │   └── axios.interceptor.ts
    └── helpers/
        └── formatDate.ts
```

## 레이어 간 의존성 규칙
- Page Layer → Component Layer → Business Layer → Store Layer
- 하위 레이어는 상위 레이어를 참조할 수 없음 (단방향 의존성)
- 모든 API, 공용 컴포넌트 관련 타입과 함수는 index.ts에서 export하여 가져다 쓰기 쉽게 함

## 관련 규칙
각 파일 및 기능 구현 시 다음 규칙들을 함께 참조하세요:

- **네이밍 패턴**: 네이밍 컨벤션 규칙 - 파일, 함수, 변수의 네이밍 규칙
- **API 구현**: API 페칭 아키텍처 규칙 - API 통신 및 데이터 페칭 아키텍처 규칙
- **코딩 스타일**: 코딩 컨벤션 규칙 - 일관된 코딩 스타일 및 패턴
- **TypeScript 활용**: TypeScript 활용 규칙 - TypeScript 타입 안전성 규칙
- **성능 최적화**: 성능 최적화 규칙 - 컴포넌트 성능 최적화 규칙