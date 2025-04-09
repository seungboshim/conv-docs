# 네이밍 컨벤션 규칙

## 디렉토리 네이밍
- 디렉토리: 소문자, 도메인명 (예: `study`, `workbook`, `post`)
- 도메인별 디렉토리는 단수형으로 작성 (예: `post`가 `posts`보다 선호됨)

> **참고**: 디렉토리 구조에 대한 전체적인 내용은 디렉토리 구조 규칙을 참조하세요.

## 파일 네이밍 규칙
- 컴포넌트: PascalCase (예: `PostCard.tsx`, `Button.tsx`)
- 훅: camelCase, use 접두사 (예: `usePostForm.ts`, `useAuth.ts`)
- 서비스: camelCase (예: `post.ts`, `auth.ts`)
- 타입 파일: .types 접미사 (예: `post.types.ts`)
- 스토어: Store 접미사 (예: `postStore.ts`, `authStore.ts`)
- 유틸리티: camelCase, 기능 설명 (예: `formatDate.ts`, `validation.ts`)

### API 및 도메인 관련 파일
- 도메인 파일: 소문자 (예: `workbook.ts`, `study.ts`)
- 타입 정의 파일: `{도메인명}.types.ts` (예: `workbook.types.ts`)
- 응답/요청 타입 파일: `response.ts`, `request.ts`
- 인덱스 파일: `index.ts` (각 도메인 디렉토리에 위치, export 전용)

## 함수 및 변수 네이밍

### 함수 네이밍
- API 함수: 동사 + 명사 (예: `getWorkbook`, `updateProfile`, `deletePost`)
- 이벤트 핸들러: `handle` + `target` + `event` (예: `handleClickLoginButton`)
- 커스텀 훅: `use` + 동사 + 명사 (예: `useGetWorkbook`, `useUpdateProfile`)
- 계산 함수: 동사 + 목적 (예: `calculateTotal`, `formatDate`)
- 검증 함수: `is` + 상태 (예: `isValid`, `isEmpty`) 또는 `validate` + 대상 (예: `validateEmail`)

### 변수 네이밍
- 일반 변수: camelCase (예: `userName`, `postCount`)
- 불리언 변수: `is`, `has`, `should` 접두사 (예: `isLoading`, `hasError`, `shouldRefresh`)
- 상수: UPPER_SNAKE_CASE (예: `MAX_RETRY_COUNT`, `API_BASE_URL`)
- 열거형: PascalCase, 항목은 PascalCase (예: `enum UserRole { Admin, User }`)

### 타입 네이밍
- 타입/인터페이스: PascalCase + 용도 (예: `User`, `WorkbookResponse`, `MemberData`)
- Props 타입: 컴포넌트명 + `Props` (예: `ButtonProps`, `PostCardProps`)
- 훅 Props 타입: `Use` + 동사 + 명사 + `Props` (예: `UseGetWorkbookProps`)
- 제네릭 타입: 대문자 한 글자 또는 설명적인 PascalCase (예: `T`, `K`, `TData`, `TResponse`)

## 네이밍 일반 원칙
- 의미있고 자기 설명적인 이름 사용
- 약어 사용 최소화 (널리 알려진 약어 제외, 예: HTTP, URL)
- 불필요한 접두사/접미사 제거
- 일관된 용어 사용 (동일한 개념에 다른 용어 사용 금지)

## 관련 규칙
네이밍 컨벤션 적용 시 다음 규칙들을 함께 참조하세요:

- **디렉토리 구조**: 디렉토리 구조 규칙 - 파일 구조 및 배치
- **API 구현**: API 페칭 아키텍처 규칙 - API 함수 네이밍
- **코딩 스타일**: 코딩 컨벤션 규칙 - 전반적인 코딩 스타일 