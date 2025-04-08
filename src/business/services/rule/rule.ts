import fs from 'fs';
import path from 'path';
import { ruleIds, ruleMetadata } from '@/utils/constants';
import { Rule } from '@/types/rule';

// 모든 규칙 가져오기
export async function getAllRules(): Promise<Rule[]> {
  return ruleIds.map(id => {
    const { title, description } = ruleMetadata[id];
    const content = getRuleContentById(id);
    return { id, title, description, content };
  });
}

// ID로 특정 규칙 가져오기
export async function getRuleById(id: string): Promise<Rule | null> {
  if (!ruleIds.includes(id)) {
    return null;
  }

  const { title, description } = ruleMetadata[id];
  const content = getRuleContentById(id);

  return { id, title, description, content };
}

// 마크다운 파일 내용 가져오기
function getRuleContentById(id: string): string {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'markdown', `${id}.md`);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    }

    // 파일이 없으면 기본 내용 반환
    return `# ${ruleMetadata[id].title}\n\n${ruleMetadata[id].description}\n\n(내용 준비 중...)`;
  } catch (error) {
    console.error(`Error reading markdown file for ${id}:`, error);
    return `# ${ruleMetadata[id].title}\n\n오류가 발생했습니다.`;
  }
}
