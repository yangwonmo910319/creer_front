import axios from "axios";
import { KH_DOMAIN } from "../../utils/Common";

export const GoodsAxiosApi = {
  // 상품 목록 전부 가져오기
  selectGoodsList: async () => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + "/goods/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 내 상품 조회
  selectMyGoods: async () => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/goods/Mylist`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 경매 목록 조회
  selectAuctionList: async () => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/goods/auction`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 경매 금액 변경(금액 입력시)
  updateGoodsPrice: async (id, newPrice) => {
    console.log(id);
    console.log(id);
    console.log(id);
    console.log(id);
    console.log(newPrice);
    console.log(newPrice);
    console.log(newPrice);
    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(KH_DOMAIN + `/goods/auctionPrice?id=${id}&price=${newPrice}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      });
  },

  // 경매 금액 변경(버튼 클릭시 입력시)
  updateGoodsPrice2: async (id, newPrice) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(KH_DOMAIN + `/goods/auctionPrice2?id=${id}&price=${newPrice}`,
      {},
      {
        headers: {
          "Content-Type": "applicatio n/json",
          Authorization: "Bearer " + accessToken,
        },
      });
  },
  // 상품 삭제
  deleteGoods: async (id) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.get(KH_DOMAIN + `/goods/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
  // 상품 추가
  insertGoods: async (content) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(KH_DOMAIN + `/goods/new/`, content, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },
  // 경매 추가
  insertAuction: async (content, auctionTime) => {
    const accessToken = localStorage.getItem("accessToken");
    return await axios.post(
      KH_DOMAIN + `/goods/new/${auctionTime}`,
      content,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  },
  // 상품 수정
  updateGoods: async (
    goodsCategory,
    goodsDeliveryFee,
    goodsDesc,
    goodsDetailId,
    goodsPic,
    goodsPrice,
    goodsStock,
    goodsTitle
  ) => {
    const accessToken = localStorage.getItem("accessToken");
    const goodsData = {
      goodsCategory,
      goodsDeliveryFee,
      goodsDesc,
      goodsDetailId,
      goodsPic,
      goodsPrice,
      goodsStock,
      goodsTitle,
    };

    return await axios.post(
      KH_DOMAIN + `/goods/update/${goodsDetailId}`,
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
    const accessToken = localStorage.getItem("accessToken");
    const goodsData = {
      goodsDetailId: num,
      goodsPic: newUrl,
    };
    return await axios.post(KH_DOMAIN + `/goods/new/picture/`, goodsData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    });
  },

  // 상품 목록 한개 가져오기
  selectGoods: async (id) => {
    return await axios.get(KH_DOMAIN + `/goods/list/${id}`);
  },

  // 카테고리 상품 검색
  selectCategoryList: async (keyword) => {
    return await axios.get(
      KH_DOMAIN + `/goods/list/tag/?keyword=${keyword}`
    );
  },

  // 제목 상품 검색
  selectTitleList: async (keyword) => {
    return await axios.get(
      KH_DOMAIN + `/goods/list/title/?keyword=${keyword}`
    );
  },

  // 상품 페이지 수 조회
  GoodsPage: async (page, size) => {
    return await axios.get(
      KH_DOMAIN + `/goods/list/count?page=${page}&size=${size}`
    );
  },

  // 상품 페이지네이션 조회
  selectGoodsPageList: async (page, size) => {
    return await axios.get(
      KH_DOMAIN + `/goods/list/page?page=${page}&size=${size}`
    );
  },
};
