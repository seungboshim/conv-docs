import Link from 'next/link';
import { Button } from '@/components/common';
import { MainLayout } from '@/components/layout';
import { getAllRules } from '@/business/services';

export default async function Home() {
  const rules = await getAllRules();

  return (
    <MainLayout rules={rules}>
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-dark mb-6">Conv.docs</h1>

        <p className="text-lg text-gray-light mb-8">
          다양한 코딩 컨벤션을 제공하는 문서입니다.
          <br /> 본 프로젝트 또한 해당 컨벤션을 준수하며 개발되었습니다.
        </p>

        <h2 className="text-2xl font-bold text-gray-dark mt-12 mb-4">주요 규칙 목록</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {rules.map(rule => (
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
      </section>
    </MainLayout>
  );
}
