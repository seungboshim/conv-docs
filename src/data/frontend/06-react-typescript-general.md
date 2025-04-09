# React 및 TypeScript 일반 규칙

## 코드 품질 원칙
- 명확하고 가독성 높은 React와 TypeScript 코드 작성
- 최신 버전의 React, TypeScript, 및 핵심 라이브러리 활용
- 정확하고 사실적인 코드 설계로 버그 최소화
- 요청된 기능을 완전하게 구현 (필요한 모든 코드 작성)

## React 컴포넌트 설계
- 컴포넌트를 작고 재사용 가능한 단위로 분리
- 단일 책임 원칙(SRP) 준수
- 상태 관리는 필요한 가장 낮은 레벨에서 수행

```tsx
// 좋은 컴포넌트 예시
const UserProfile = ({ user }) => {
  return (
    <div className="profile">
      <Avatar user={user} />
      <UserInfo user={user} />
      <UserActions userId={user.id} />
    </div>
  );
};
```

## 함수형 컴포넌트 및 훅 사용
- 클래스 컴포넌트보다 함수형 컴포넌트 선호
- 상태 로직 재사용을 위한 커스텀 훅 작성
- 훅 규칙 준수 (최상위에서만 호출, React 함수 내에서만 호출)

```tsx
// 커스텀 훅 예시
function useUserData(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 사용자 데이터 로딩 로직
  }, [userId]);

  return { user, loading, error };
}
```

## 타입 안전성
- Props와 상태에 명시적 타입 지정
- 타입 추론 활용하되, 필요시 명시적 타입 제공
- any 타입 사용 지양, 명확한 타입 정의

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  variant = 'primary'
}) => {
  // 구현
};
```

## 폼 및 사용자 입력 처리
- 제어 컴포넌트 방식 선호
- 폼 유효성 검사를 위한 라이브러리 활용 (react-hook-form 등)
- 사용자 친화적인 에러 메시지 제공

## 성능 최적화
- 불필요한 리렌더링 방지 (React.memo, useMemo, useCallback)
- 지연 로딩 및 코드 분할 적용
- 효율적인 데이터 구조 및 알고리즘 사용

## 접근성 (A11y)
- 시맨틱 HTML 요소 사용
- aria 속성 적절히 활용
- 키보드 네비게이션 지원
- 색상 대비 고려

## 관련 규칙
React 및 TypeScript 개발 시 다음 규칙들을 함께 참조하세요:

- **디렉토리 구조**: 디렉토리 구조 규칙 - 컴포넌트 및 파일 구조
- **성능 최적화**: 성능 최적화 규칙 - React 성능 향상 기법
- **TypeScript 활용**: TypeScript 활용 규칙 - TypeScript 타입 시스템 활용
- **코딩 스타일**: 코딩 컨벤션 규칙 - 일관된 코딩 패턴
- **네이밍 패턴**: 네이밍 컨벤션 규칙 - 컴포넌트 및 함수 네이밍 