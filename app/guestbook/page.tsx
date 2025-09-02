import { getGuestbookMessages, addGuestbookMessage } from "@/actions/notion";
import GuestbookClient from "./GuestbookClient";

export default async function GuestbookPage() {
  // 서버에서 방명록 메시지들을 가져오기
  const messages = await getGuestbookMessages();

  return <GuestbookClient messages={messages} addMessageAction={addGuestbookMessage} />;
}
