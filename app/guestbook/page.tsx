import { getGuestbookMessages, addGuestbookMessage } from "@/actions/notion";
import GuestbookClient from "./GuestbookClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "방명록",
  description: "이우빈 & 김지민의 결혼을 축하하는 마음을 방명록에 남겨주세요. 소중한 축하 메시지와 응원의 말씀을 기다립니다.",
  openGraph: {
    title: "방명록 | 이우빈 & 김지민 결혼식",
    description: "결혼을 축하하는 마음을 방명록에 남겨주세요.",
    images: ["/images/hero/hero_01.jpg"],
  },
};

export default async function GuestbookPage() {
  // 서버에서 방명록 메시지들을 가져오기
  const messages = await getGuestbookMessages();

  return <GuestbookClient messages={messages} addMessageAction={addGuestbookMessage} />;
}
