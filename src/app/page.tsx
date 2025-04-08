import Link from 'next/link';
import { MainLayout } from './components/layout/MainLayout';
import { Button } from './components/common/Button';
import { getAllRules } from '@/lib/markdown-utils';

export default async function Home() {
  const rules = await getAllRules();
  
  return (
    <MainLayout rules={rules}>
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-dark mb-6">코딩 규칙 문서</h1>
        
        <p className="text-lg text-gray-light mb-8">
          이 사이트는 프로젝트의 코딩 규칙을 문서화하여 제공합니다. 
          코드 일관성 유지와 협업 향상을 목표로 다양한 코딩 규칙과 모범 사례를 제공합니다.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-dark mt-12 mb-4">주요 규칙 목록</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {rules.map((rule) => (
            <div 
              key={rule.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors"
            >
              <h3 className="text-xl font-bold text-gray-dark mb-2">{rule.title}</h3>
              <p className="text-gray-light mb-4">{rule.description}</p>
              <Link href={`/rules/${rule.id}`}>
                <Button variant="primary">자세히 보기</Button>
              </Link>
            </div>
          ))}
        </div>
        
        <h2 className="text-2xl font-bold text-gray-dark mt-12 mb-4">규칙 사용 방법</h2>
        
        <div className="prose prose-gray max-w-none">
          <p>
            좌측 사이드바 메뉴에서 원하는 규칙을 선택하여 자세한 내용을 확인할 수 있습니다.
            각 규칙은 관련된 다른 규칙을 참조하고 있어, 전체적인 코딩 스타일을 이해하는 데 도움이 됩니다.
          </p>
          
          <p className="mt-4">
            이 문서는 프로젝트의 코딩 표준을 정의하고, 일관된 코드 작성을 돕기 위한 가이드라인으로 활용할 수 있습니다.
            모든 팀원은 이 규칙을 참고하여 일관된 코드 품질을 유지하는 것이 좋습니다.
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
