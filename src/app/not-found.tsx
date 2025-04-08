import Link from 'next/link';
import { Button } from '@/components/common';
import { MainLayout } from '@/components/layout';
import { getAllRules } from '@/business/services';

export default async function NotFound() {
  const rules = await getAllRules();

  return (
    <MainLayout rules={rules}>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-4xl font-bold text-gray-dark mb-4">페이지를 찾을 수 없습니다</h2>
        <p className="text-lg text-gray-light mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Link href="/">
          <Button variant="primary" size="lg">
            홈으로 돌아가기
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
}
