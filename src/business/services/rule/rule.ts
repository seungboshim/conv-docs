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
    // 프론트엔드 규칙인지 백엔드 규칙인지 확인
    const isFrontendRule = [
      '01-directory-structure',
      '02-naming-convention',
      '03-coding-convention',
      '04-api-fetching-architecture',
      '05-performance-optimization',
      '06-react-typescript-general',
      '07-typescript-usage',
    ].includes(id);

    const isBackendRule = [
      '01-general-principles',
      '02-application-logic',
      '03-entities',
      '04-repositories',
      '05-services',
      '06-dtos',
      '07-rest-controllers',
      '08-api-response',
      '09-global-exception-handler',
      '10-java-spring-best-practices',
    ].includes(id);

    let filePath;

    if (isFrontendRule) {
      filePath = path.join(process.cwd(), 'src', 'data', 'frontend', `${id}.md`);
    } else if (isBackendRule) {
      filePath = path.join(process.cwd(), 'src', 'data', 'backend', `${id}.md`);
    } else {
      // 알 수 없는 규칙 유형
      return `# ${ruleMetadata[id].title}\n\n${ruleMetadata[id].description}\n\n(내용 준비 중...)`;
    }

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
