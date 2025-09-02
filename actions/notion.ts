'use server';

import { revalidatePath } from 'next/cache';
import { notion, DATABASE_ID, parseNotionPage, type GuestbookMessage } from '@/lib/notion';

// 방명록 메시지를 Notion 데이터베이스에 추가
export async function addGuestbookMessage(formData: FormData) {
  const name = formData.get('name') as string;
  const message = formData.get('message') as string;

  if (!name || !message) {
    return { success: false, error: '성함과 메시지를 모두 입력해주세요.' };
  }

  if (name.trim().length === 0 || message.trim().length === 0) {
    return { success: false, error: '성함과 메시지를 모두 입력해주세요.' };
  }

  try {
    await notion.pages.create({
      parent: {
        database_id: DATABASE_ID,
      },
      properties: {
        성함: {
          title: [
            {
              text: {
                content: name.trim(),
              },
            },
          ],
        },
        메시지: {
          rich_text: [
            {
              text: {
                content: message.trim(),
              },
            },
          ],
        },
      },
    });

    // 방명록 페이지를 다시 검증하여 새 데이터를 반영
    revalidatePath('/guestbook');

    return { success: true };
  } catch (error) {
    console.error('Notion API 오류:', error);
    return { success: false, error: '메시지 저장 중 오류가 발생했습니다.' };
  }
}

// Notion 데이터베이스에서 방명록 메시지들을 가져오기
export async function getGuestbookMessages(): Promise<GuestbookMessage[]> {
  try {
    const response = await notion.databases.query({
      database_id: DATABASE_ID,
      sorts: [
        {
          timestamp: 'created_time',
          direction: 'descending',
        },
      ],
    });

    return response.results.map(parseNotionPage);
  } catch (error) {
    console.error('Notion API에서 데이터 가져오기 오류:', error);
    return [];
  }
}
