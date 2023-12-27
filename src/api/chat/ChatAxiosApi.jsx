import axios from "axios";
import { SERVER_DOMAIN } from "../utils/Common";

export const ChatAxiosApi = {
  // 메서드 내부에서는 const chatLIst = () =>{...} 와 같은 형태로 선언이 불가능

  // 채팅방 생성
  chatCreate: async (email, name) => {
    const emailAndChatName = { email, name };
    return await axios.post(SERVER_DOMAIN + "/chat/new", emailAndChatName);
  },

  // 채팅방 목록 보기
  chatList: async () => {
    return await axios.get(SERVER_DOMAIN + `/chat/list`);
  },

  // 채팅방 정보 가져오기
  chatInfo: async (roomId) => {
    return await axios.get(SERVER_DOMAIN + `/chat/${roomId}}`);
  },

  // 채팅 기록 가쟈오기
  chatLoad: async (roomId) => {
    return await axios.get(SERVER_DOMAIN + `/chat/${roomId}/messages`);
  },
};
