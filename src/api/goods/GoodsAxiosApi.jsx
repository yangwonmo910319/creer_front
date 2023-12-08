import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const GoodsAxiosApi = {
  // 상품 전체 목록 가져오기
  getGoods: async () => {
    const response = await axios.get(KH_DOMAIN + "/Goods/admin");

    return response;
  },

  // ID를 기준으로 상품을 찾음
  findGoodsById: async (id) => {
    const response = await axios.get(KH_DOMAIN + `/Goods/${id}`);

    return response;
  },

  // 상품 추가
  addGoods: async (GoodsToSave) => {
    const response = await axios.post(KH_DOMAIN + "/Goods/admin", GoodsToSave);
    return response;
  },

  // 상품 삭제
  deleteGoods: async (id) => {
    const response = await axios.delete(KH_DOMAIN + `/Goods/admin/${id}`);
    return response;
  },

  // 상품 수정
  updateGoods: async (id, Goods) => {
    const response = await axios.put(KH_DOMAIN + `/Goods/admin/${id}`, Goods);
    return response;
  },

  // 상품 존재 여부 확인
  isGoodsexist: async (title, author) => {
    const response = await axios.get(
      KH_DOMAIN + `/Goods/isGoodsexist?title=${title}&author=${author}`
    );
    return response;
  },

  // 상품 구매 여부 확인
  isGoodsBought: async (memberId, GoodsId) => {
    const response = await axios.get(
      KH_DOMAIN + `/Goods/isGoodsbought?memberId=${memberId}&GoodsId=${GoodsId}`
    );
    return response;
  },
  // 회원이 구매한 상품 목록
  getBoughtGoods: async (userId) => {
    const response = await axios.get(
      `${KH_DOMAIN}/buy/boughtGoods?memberId=${userId}`
    );
    return response;
  },

  // 상품 삭제
  deleteBuyGoods: async (buyId) => {
    const response = await axios.delete(`${KH_DOMAIN}/buy/${buyId}`);
    return response.data;
  },
  // 상품 정보 가져오기
  getGoodsInfo: async (goodsId) => {
    return await axios.get(`${KH_DOMAIN}/goods/${goodsId}`);
  },
  // 상품 구매
  purchaseGoods: async (memberId, goodsId) => {
    return await axios.post(
      `${KH_DOMAIN}/goods/purchase/${memberId}/${goodsId}`
    );
  },
};
