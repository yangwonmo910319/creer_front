import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const AuthAxiosApi = {
  checkLogin: async (token) => {
    const response = await axios.get(KH_DOMAIN + "/users/check-login", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
  // 카카오 로그인 상태 확인
  checkKakaoLogin: async (token) => {
    const response = await axios.get(KH_DOMAIN + "/users/check-kakao-login", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },

  // 카카오 로그인 사용자의 정보 가져오기
  getKakaoUserInfo: async (token) => {
    const response = await axios.get(KH_DOMAIN + "/users/check-kakao-login", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  },
};
