import { Client } from '@notionhq/client';

// Notion 클라이언트 초기화
export const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

// 방명록 메시지 타입 정의
export interface GuestbookMessage {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

// Notion 페이지를 GuestbookMessage 타입으로 변환
export function parseNotionPage(page: Record<string, unknown>): GuestbookMessage {
  const properties = page.properties as Record<string, unknown>;
  const nameProperty = properties['성함'] as { title?: Array<{ plain_text?: string }> };
  const messageProperty = properties['메시지'] as { rich_text?: Array<{ plain_text?: string }> };
  
  return {
    id: page.id as string,
    name: nameProperty?.title?.[0]?.plain_text || '',
    message: messageProperty?.rich_text?.[0]?.plain_text || '',
    createdAt: page.created_time as string,
  };
}
