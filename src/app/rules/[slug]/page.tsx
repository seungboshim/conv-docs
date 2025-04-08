import { notFound } from 'next/navigation';
import { MainLayout } from '@/components/layout';
import { MarkdownViewer } from '@/components/common';
import { getAllRules, getRuleById } from '@/business/services';

interface RuleDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const rules = await getAllRules();

  return rules.map(rule => ({
    slug: rule.id,
  }));
}

export default async function RuleDetailPage({ params }: RuleDetailPageProps) {
  const { slug } = await params;
  const rules = await getAllRules();
  const rule = await getRuleById(slug);

  if (!rule) {
    notFound();
  }

  return (
    <MainLayout rules={rules} currentRuleId={slug}>
      <article className="max-w-4xl mx-auto">
        <MarkdownViewer content={rule.content} />
      </article>
    </MainLayout>
  );
}
