import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const GoodsAxiosApi = {
  // 상품 목록 전부 가져오기
  getGoodsList: async () => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + "/api/goods/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 상품 목록 한개 가져오기
  getGoods: async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/api/goods/list/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 상품 삭제
  deleteGoods: async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/api/goods/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
   // 상품 추가
  insertGoods: async (content ) => {    
      const accessToken = localStorage.getItem("accessToken");
      return await axios.post(
        KH_DOMAIN + `/api/goods/new/`, content, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
        }
      );
    },
  // 상품 수정
  updateGoods: async (goodsCategory, goodsDeliveryFee, goodsDesc, goodsDetailId, goodsPic, goodsPrice, goodsRefund, goodsTitle
  ) => {
    const goodsData = {
      goodsCategory,
      goodsDeliveryFee,
      goodsDesc,
      goodsDetailId,
      goodsPic,
      goodsPrice,
      goodsRefund,
      goodsTitle,
    };
    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(
      KH_DOMAIN + `/api/goods/update/${goodsDetailId}`,
      goodsData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },

  // 상품 대표 이미지 넣기
  insertGoodsImg: async (num, newUrl) => {
    const goodsData = {
      goodsDetailId: num,
      goodsPic: newUrl,
    };
    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(
      KH_DOMAIN + `/api/goods/new/picture/`, goodsData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },

  // 카테고리 상품 검색
  categoryList: async (keyword) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/api/goods/list/tag/?keyword=${keyword}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 제목 상품 검색  
  titleList: async (keyword) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/api/goods/list/title/?keyword=${keyword}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },



};
