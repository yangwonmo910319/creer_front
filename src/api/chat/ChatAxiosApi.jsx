import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const ChatAxiosApi = {
  // 메서드 내부에서는 const chatLIst = () =>{...} 와 같은 형태로 선언이 불가능

  // 채팅방 생성
  chatRoomCreate: async (accesstoken, goodsId) => {
    const chatContent = { token: accesstoken, goodsId };
    return await axios.post(KH_DOMAIN + "/chat/new", chatContent);
  },

  // 채팅방 목록 보기
  chatList: async () => {
    return await axios.get(KH_DOMAIN + `/chat/list`);
  },

  // 채팅방 정보 가져오기
  chatInfo: async (roomId) => {
    return await axios.get(KH_DOMAIN + `/chat/${roomId}}`);
  },

  // 채팅 기록 가져오기
  chatLoad: async (roomId) => {
    return await axios.get(KH_DOMAIN + `/chat/${roomId}/messages`);
  },
};
