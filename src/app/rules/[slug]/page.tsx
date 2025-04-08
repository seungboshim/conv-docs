import { MainLayout } from '@/app/components/layout/MainLayout';
import { MarkdownViewer } from '@/app/components/common/MarkdownViewer';
import { getAllRules, getRuleById } from '@/lib/markdown-utils';
import { notFound } from 'next/navigation';

interface RuleDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const rules = await getAllRules();
  
  return rules.map((rule) => ({
    slug: rule.id,
  }));
}

export default async function RuleDetailPage({ params }: RuleDetailPageProps) {
  const { slug } = params;
  const rules = await getAllRules();
  const rule = await getRuleById(slug);
  
  if (!rule) {
    notFound();
  }
  
  return (
    <MainLayout rules={rules} currentRuleId={slug}>
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-dark">{rule.title}</h1>
          <p className="text-lg text-gray-light mt-2">{rule.description}</p>
        </header>
        
        <MarkdownViewer content={rule.content} />
      </article>
    </MainLayout>
  );
}