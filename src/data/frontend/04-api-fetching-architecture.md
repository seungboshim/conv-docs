# API 페칭 아키텍처 규칙

## 기본 구조
- `/src/services`: 도메인별 API 모듈
- `/src/hooks`: 데이터 페칭 커스텀 훅
- `/src/types`: 공통 타입 정의

> **참고**: 전체 디렉토리 구조는 디렉토리 구조 규칙을 참조하세요.

## 서버 응답 스키마
서버는 일반적인 axios 응답 스키마를 따릅니다:
```json
{
  "data": {},
  "status": 200,
  "statusText": 'OK',
  "headers": {},
  "config": {},
  "request": {}
}
```

## 타입 정의 방식

### 1. 기본 응답 타입 정의 (선택)
서버에서 response.data 내부에 BaseResponse 스키마를 지정한 경우, 다음과 같이 정의합니다.
이후 최종 스키마 타입 정의 시 BaseResponse를 Extends 하여 사용합니다.
```typescript
// /src/types/baseResponse.ts
export interface BaseResponse {
  // 서버에서 지정한 형식 (예시)
  timestamp: string;
  code: string;
  message: string;
}
```

### 2. 엔티티 타입 정의
서버에서 nested json을 제공한 경우, 엔티티 당 타입을 정의합니다.
최대한 모든 속성을 포함하는 인터페이스를 기본 엔티티로 정의하고, Partial/Pick/Omit으로 상황에 맞게 재정의하여 사용합니다.
```typescript
// /src/server/{domain}/types/{entity}.types.ts
export interface Member {
  memberId: number;
  university: string;
  nickName: string;
  attendance: string;
}
```

> **참고**: 타입스크립트 활용에 관한 자세한 내용은 TypeScript 활용 규칙을 참조하세요.

### 3. 도메인별 응답 타입 정의
```typescript
// /src/server/{domain}/types/{domain}.types.ts
export interface WorkbookResponse {
  nickName: string;
  week: number;
  workbookContents: string[];
  members: Member[];
  checklists: Checklist[];
}
```

### 4. API 응답 최종 타입 정의
```typescript
// /src/server/{domain}/response.ts
export interface GetWorkbookResponse extends BaseResponse {
  result: WorkbookResponse;
}
```

## API 통신 함수

```typescript
// /src/server/{domain}/{function}.ts
export const getWorkbook = async (
  studyId: number,
  memberId?: number,
  week?: number,
): Promise<GetWorkbookResponse> => {
  const response = await GetAxiosInstance<GetWorkbookResponse>(`/studies/${studyId}/workbooks`, {
    params: {
      memberId,
      week,
    },
  });

  return response.data;
};
```

> **참고**: API 함수 네이밍 방식은 네이밍 컨벤션 규칙을 참조하세요.

모든 API 함수는 index.ts에서 export하여 모듈 외부에서 쉽게 가져다 쓸 수 있게 합니다:

```typescript
// /src/server/{domain}/index.ts
export * from './study';
export * from './workbook';
export * from './checklist';
```

## useQuery 커스텀 훅

### 1. useQuery Props 타입 정의
useQuery의 모든 옵션을 View에서 자유롭게 가져다 쓰기 위해 Props 타입을 정의합니다.
```typescript
// /src/types/tanstack.ts
export interface UseQueryProps<TData, TError> {
  queryKey?: unknown[];
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>;
}
```

### 2. 도메인별 useQuery Props 타입 정의
UseQueryProps를 확장해 각 hook의 Props 타입을 정의합니다.
```typescript
// /src/hooks/{domain}/{domain}.types.ts
export type UseGetWorkbookProps = UseQueryProps<GetWorkbookResponse, Error> & {
  studyId: number;
  memberId?: number;
  week?: number;
};
```

### 3. useQuery 커스텀 훅 구현
커스텀 훅을 구현합니다.
```typescript
// /src/hooks/{domain}/{domain}.ts
export const useGetWorkbook = ({
  studyId,
  memberId,
  week,
  queryKey,
  options,
}: UseGetWorkbookProps) => {
  return useQuery<GetWorkbookResponse, Error>({
    queryKey: [`/studies/${studyId}/workbooks`, memberId, week, ...(queryKey || [])],
    queryFn: () => getWorkbook(studyId, memberId, week),
    ...options,
  });
};
```

> **참고**: 커스텀 훅의 코딩 스타일은 코딩 컨벤션 규칙을 참조하세요.

## 코드 분리 원칙
- 도메인별 디렉토리 분리
- 엔티티 타입은 별도 파일로 분리하여 재사용성 확보
- 모든 API 통신 함수와 관련 타입은 index.ts로 export
- UI 컴포넌트에서 직접 API 호출 금지, 반드시 커스텀 훅 사용
- 비즈니스 로직과 UI 로직 철저히 분리

## 사용 예시

```tsx
const { data, isPending, isSuccess, isError } = useGetWorkbook({
  studyId: studyId,
  week: week,
  memberId: memberId,
});

// isLoading, isPending, isError 등 React Query의 모든 기능 사용 가능
```

## 관련 규칙
API 페칭 구현 시 다음 규칙들을 함께 참조하세요:

- **디렉토리 구조**: 디렉토리 구조 규칙 - 전체 프로젝트 구조 및 레이어 아키텍처
- **네이밍 패턴**: 네이밍 컨벤션 규칙 - API 함수 및 타입 네이밍 규칙
- **코딩 스타일**: 코딩 컨벤션 규칙 - 일관된 API 구현 방식
- **성능 최적화**: 성능 최적화 규칙 - 데이터 페칭 성능 최적화 