# 코딩 컨벤션 규칙

## 일반 원칙
- 코드 일관성과 가독성 유지
- 도메인 중심 설계 (Domain-Driven Design)
- 비즈니스 로직과 UI 로직의 분리
- 타입 정의와 인터페이스 분리

## API 함수 규칙
```typescript
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

> **참고**: API 페칭 아키텍처에 대한 자세한 정보는 API 페칭 아키텍처 규칙을 참조하세요.

## useQuery 훅 규칙
```typescript
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

## Export 규칙
모든 도메인 디렉토리는 index.ts를 통해 외부에 노출할 함수와 타입을 export 합니다.

```typescript
// server/study/index.ts 예시
export * from './study';
export * from './workbook';
export * from './checklist';
```

```typescript
// server/study/types/index.ts 예시
export * from './member.types';
export * from './roadmap.types';
export * from './study.types';
export * from './checklist.types';
export * from './workbook.types';
```

## 임포트 순서 규칙
1. 외부 라이브러리 임포트
2. 절대 경로 임포트 (예: `/src/...`)
3. 상대 경로 임포트 (예: `../`, `./`)

```typescript
// 좋은 예시
import { useQuery } from '@tanstack/react-query';
import { BaseResponse } from 'src/types/baseResponse';
import { getWorkbook } from '../server/study';
import { UseGetWorkbookProps } from './study.types';
```

## 코드 포맷팅
- 들여쓰기: 2 스페이스
- 한 줄 최대 길이: 100자
- 세미콜론 사용
- 작은 따옴표 사용
- API 통신 함수는 항상 비동기(async/await) 방식 사용

## 도메인 분리 원칙
- 도메인별 폴더 구조 유지
- 엔티티 타입 정의는 재사용성을 고려해 별도 파일로 분리
- 도메인 간 의존성 최소화
- 관련 기능은 동일 도메인에 위치

## 컴포넌트 최적화 규칙
- 불필요한 리렌더링 방지를 위해 React.memo 사용
- 의존성 배열을 가진 훅(useEffect, useMemo, useCallback)의 적절한 활용
- 큰 컴포넌트는 작은 단위로 분리

> **참고**: 성능 최적화에 대한 자세한 내용은 성능 최적화 규칙을 참조하세요.

## 네이밍 규칙
- 모든 변수, 함수, 클래스, 타입 등은 명확하고 일관된 네이밍 사용
- 약어 사용 최소화, 누구나 이해할 수 있는 네이밍 사용

> **참고**: 상세 네이밍 규칙은 네이밍 컨벤션 규칙을 참조하세요.

## 관련 규칙
코딩 스타일 적용 시 다음 규칙들을 함께 참조하세요:

- **디렉토리 구조**: 디렉토리 구조 규칙 - 프로젝트 구조 및 파일 배치
- **API 구현**: API 페칭 아키텍처 규칙 - API 통신 및 데이터 페칭 패턴
- **TypeScript 활용**: TypeScript 활용 규칙 - 타입 안전성 및 인터페이스 활용
- **네이밍 패턴**: 네이밍 컨벤션 규칙 - 일관된 네이밍 컨벤션 