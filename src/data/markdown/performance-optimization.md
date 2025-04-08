# 성능 최적화 규칙

## 컴포넌트 렌더링 최적화
- 불필요한 리렌더링 방지를 위해 `React.memo` 사용
  ```tsx
  const PostCard = React.memo(({ post }) => {
    return (
      <div className="card">
        <h3>{post.title}</h3>
        <p>{post.content}</p>
      </div>
    );
  });
  ```

- Props 비교 커스텀 함수 사용 (복잡한 객체 비교)
  ```tsx
  const areEqual = (prevProps, nextProps) => {
    return prevProps.post.id === nextProps.post.id;
  };
  
  const PostCard = React.memo(({ post }) => {
    // 컴포넌트 구현
  }, areEqual);
  ```

- 부모 컴포넌트의 불필요한 리렌더링에 영향받지 않도록 설계

## 메모이제이션 활용
- 복잡한 계산은 `useMemo` 사용
  ```tsx
  const filteredPosts = useMemo(() => {
    return posts.filter(post => post.category === selectedCategory);
  }, [posts, selectedCategory]);
  ```

- 이벤트 핸들러는 `useCallback` 사용
  ```tsx
  const handleSubmit = useCallback((data) => {
    submitForm(data);
  }, [submitForm]);
  ```

- 의존성 배열을 최소화하고 정확하게 지정

## 코드 분할 및 지연 로딩
- 대규모 컴포넌트/페이지는 `React.lazy`와 `Suspense` 사용
  ```tsx
  const DetailPage = React.lazy(() => import('./pages/DetailPage'));
  
  // 사용
  <Suspense fallback={<Spinner />}>
    <DetailPage />
  </Suspense>
  ```

- 경로 기반 코드 분할 적용 (라우팅 기반)
- 큰 라이브러리는 필요할 때만 동적 임포트


## API 및 데이터 패칭 최적화
- 캐싱 전략 구현 (React Query, SWR 등)
- 불필요한 API 호출 방지
- 데이터 페칭 시 로딩 상태 처리로 사용자 경험 향상

## 이미지 및 미디어 최적화
- 이미지는 적절한 크기와 포맷으로 제공
- 지연 로딩 적용
- WebP 등의 최신 이미지 포맷 활용

## CSS 성능 최적화
- CSS-in-JS 라이브러리 사용 시 정적 추출 고려
- 애니메이션은 `transform`, `opacity` 등 GPU 가속 속성 활용
- 미디어 쿼리를 활용한 반응형 리소스 로딩

## 번들 크기 최적화
- Tree-shaking 활용 가능한 방식으로 import
- 불필요한 의존성 제거

## 관련 규칙
성능 최적화 적용 시 다음 규칙들을 함께 참조하세요:

- **코딩 스타일**: 코딩 컨벤션 규칙 - 성능에 영향을 주는 코딩 패턴
- **타입스크립트 활용**: TypeScript 활용 규칙 - 타입 최적화
- **디렉토리 구조**: 디렉토리 구조 규칙 - 코드 구조화 및 분할 