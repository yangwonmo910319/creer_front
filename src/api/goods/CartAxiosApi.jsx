import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const CartAxiosApi = {
  // 장바구니에 추가
  // Post 메서드의 첫번째 매개변수 : URL, 두번째 : 요청 본문, 세번째 : 설정 객체
  addToCart: async (accessToken, content) => {
    return await axios.post(
      `${KH_DOMAIN}/Cart/add`, // URL
      content, // 요청 본문
      {
        headers: {
          // 설정 객체
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },

  // 장바구니 전체 조회
  getCartItems: async (accessToken) => {
    return await axios.get(`${KH_DOMAIN}/Cart/list`, {
      headers: {
        // 설정 객체
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 장바구니 제거
  removeFromCart: async (accessToken, num) => {
    return await axios.delete(`${KH_DOMAIN}/Cart/delete/${num}`, {
      headers: {
        // 설정 객체
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
  
  // 결제페이지 상품 하나 찾기
  selectCart: async (accessToken, num) => {
    return await axios.get(`${KH_DOMAIN}/Cart/select/${num}`, {
      headers: {
        // 설정 객체
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },



};
