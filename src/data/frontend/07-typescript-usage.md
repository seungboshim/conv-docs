# TypeScript 활용 규칙

## 기본 원칙
- 모든 변수, 매개변수, 반환 값에 명시적 타입 지정
- 프로젝트의 `tsconfig.json`에 `strict: true` 적용
- `any` 타입 사용 지양 - 명확한 타입 또는 `unknown`으로 대체
- 불필요한 타입 단언(type assertion) 최소화

## 인터페이스와 타입 사용
- 객체 형태 정의에는 `interface` 우선 사용
- 유니온, 교차 타입 등 복잡한 타입에는 `type` 사용
- 확장 가능성이 있는 객체는 항상 `interface`로 정의

```typescript
// 좋은 예시
interface User {
  id: number;
  name: string;
  email: string;
}

// 확장 사용
interface AdminUser extends User {
  role: 'admin';
  permissions: string[];
}

// 유니온 타입에는 type 사용
type UserRole = 'admin' | 'user' | 'guest';
```

## 재사용 가능한 타입 정의
- 중복 타입 정의 방지를 위해 공통 타입은 별도 파일로 분리
- 유틸리티 타입 활용 (Partial, Pick, Omit, Record 등)
- 제네릭을 활용한 재사용 가능한 타입/함수 정의

```typescript
// API 응답 타입 예시
interface BaseResponse {
  code: string;
  message: string;
  timestamp: string;
}

interface GetUserResponse extends BaseResponse {
  data: User;
}

// 업데이트 요청 타입 (Partial 활용)
type UpdateUserRequest = Partial<Omit<User, 'id'>>;
```

## 타입 안전성 향상
- 정확한 타입 정의로 컴파일 시점 오류 검출
- 사용자 정의 타입 가드로 런타임 타입 안전성 확보
- `as const` 어서션으로 리터럴 타입 보존

```typescript
// 타입 가드 예시
function isUser(obj: unknown): obj is User {
  return obj !== null 
    && typeof obj === 'object'
    && 'id' in obj 
    && 'name' in obj;
}

// 상수 정의 시 as const 활용
export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

// 리터럴 타입으로 추론됨
type Status = typeof STATUS[keyof typeof STATUS];
```

## React 컴포넌트 타입 정의
- 모든 컴포넌트 props는 명시적 인터페이스로 정의
- 이벤트 핸들러는 정확한 이벤트 타입 사용
- children을 받는 컴포넌트는 ReactNode 타입 사용

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  ...props
}) => {
  // ...
};
```

## 관련 규칙
TypeScript 활용 시 다음 규칙들을 함께 참조하세요:

- **디렉토리 구조**: 디렉토리 구조 규칙 - 타입 파일 구조
- **API 구현**: API 페칭 아키텍처 규칙 - API 관련 타입 정의
- **네이밍 패턴**: 네이밍 컨벤션 규칙 - 타입 네이밍 규칙
- **코딩 스타일**: 코딩 컨벤션 규칙 - 일관된 타입 사용 