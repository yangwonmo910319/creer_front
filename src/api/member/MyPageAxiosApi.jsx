import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const MyPageAxiosApi = {
  // 정보 수정을 위해서 입력 받은 정보들이 존재하는지 확인
  memberCheck: async (email, name, password, phoneNum) => {
    console.log("체크를 위한 정보", email, name, password, phoneNum);
    return await axios.post(KH_DOMAIN + "/MyPage/checkInfo", {
      email,
      name,
      password,
      phoneNum,
    });
  },

  // 회원 탈퇴
  memberDel: async (email) => {
    console.log("회원 탈퇴할 회원의 이메일 : " + email);
    return await axios.delete(KH_DOMAIN + "/MyPage/delete", {
      headers: {
        "X-Email": email,
      },
    });
  },

  // 정보 변경 전 정보 중복 체크
  checkedId: async (NewId) => {
    try {
      const checkId = {
        id: NewId,
      };
      console.log("중복성 체크 아이디:" + NewId);
      return await axios.post(KH_DOMAIN + "/MyPage/checkId", checkId);
    } catch (error) {
      throw error;
    }
  },

  // 아이디 비밀번호 변경
  modifyID: async (currentId, newId) => {
    try {
      const updateId = {
        currentId: currentId,
        newId: newId,
      };
      console.log("현제 아이디" + currentId);
      console.log("새로운 아이디" + newId);
      // POST 요청을 보냅니다.
      return await axios.post(KH_DOMAIN + "/MyPage/updateId", updateId);
    } catch (error) {
      console.error("ID 변경 중 오류 발생:", error);
      throw error;
    }
  },

  modifyPW: async (currentPw, newPw) => {
    try {
      const updatePw = {
        // 백엔드의 @RequestBody의 맵 객체의 키값과 동일할 것
        currentPw: currentPw,
        newPw: newPw,
      };
      console.log("현제 아이디" + currentPw);
      console.log("새로운 아이디" + newPw);
      // POST 요청을 보냅니다.
      return await axios.post(KH_DOMAIN + "/MyPage/updatePw", updatePw);
    } catch (error) {
      console.error("ID 변경 중 오류 발생:", error);
      throw error;
    }
  },
  modifyName: async (currentName, newName) => {
    try {
      const updateName = {
        // 백엔드의 @RequestBody의 맵 객체의 키값과 동일할 것
        currentName: currentName,
        newName: newName,
      };
      console.log("현제 이름" + currentName);
      console.log("새로운 이름" + newName);
      // POST 요청을 보냅니다.
      return await axios.post(KH_DOMAIN + "/MyPage/updateName", updateName);
    } catch (error) {
      console.error("ID 변경 중 오류 발생:", error);
      throw error;
    }
  },

  // 이미지 등록
  setImageUrl: async (id, image) => {
    const setImageUrl = {
      id,
      image,
    };
    console.log("axios url : " + image);
    return await axios.post(KH_DOMAIN + "/MyPage/setImage", setImageUrl);
  },
};
