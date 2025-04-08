import fs from 'fs';
import path from 'path';

export interface Rule {
  id: string;
  title: string;
  description: string;
  content: string;
}

// 규칙 ID 목록
export const ruleIds = [
  'api-fetching-architecture',
  'coding-convention',
  'directory-structure',
  'naming-convention',
  'performance-optimization',
  'react-typescript-general',
  'typescript-usage',
];

// 규칙 제목 및 설명
export const ruleMetadata: Record<string, { title: string; description: string }> = {
  'api-fetching-architecture': {
    title: 'API 페칭 아키텍처',
    description: 'API 페칭 아키텍처에 관한 규칙',
  },
  'coding-convention': {
    title: '코딩 컨벤션',
    description: '코딩 컨벤션에 관한 규칙',
  },
  'directory-structure': {
    title: '디렉토리 구조',
    description: '프로젝트 디렉토리 구조에 관한 규칙',
  },
  'naming-convention': {
    title: '네이밍 컨벤션',
    description: '파일, 디렉토리, 함수, 변수 등의 네이밍 규칙',
  },
  'performance-optimization': {
    title: '성능 최적화',
    description: 'React와 TypeScript 애플리케이션의 성능 최적화를 위한 규칙',
  },
  'react-typescript-general': {
    title: 'React와 TypeScript 일반 규칙',
    description: 'React와 TypeScript 프로젝트의 일반적인 모범 사례 및 규칙',
  },
  'typescript-usage': {
    title: 'TypeScript 활용',
    description: 'TypeScript 타입 시스템의 효과적인 활용을 위한 규칙',
  },
};

// 모든 규칙 가져오기
export async function getAllRules(): Promise<Rule[]> {
  return ruleIds.map((id) => {
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