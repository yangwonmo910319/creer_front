import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { useNavigate, useParams } from "react-router-dom";
const ListItem = styled.li`
  width: 70px;
  height: 70px;
  background-color: ${props => props.selected ? ' #e84855' : '#fff9e6'};
  color: ${props => props.selected ? ' #ffffff' : '#000000'};
  border-radius: 30px;
  display: flex;  
  justify-content: center; 
  align-items: center; 
  &:hover {
    background-color: #ffeef0;
  }
`;

const CategoryCss = styled.div`
margin: 0 auto;
  width: 90%;
  height: auto;
  ul {
    display: flex;
    flex-direction: row; 
    justify-content: space-between; 
    align-items: center; 
    padding: 20px;
    height: 100%; 
  }
`;
export const Category = ({ setList }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { title } = useParams();
  const navigate = useNavigate();
  const [reset, setReset] = useState(false);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    categoryLIst((category));
  }
  const AllClick = (category) => {
    setSelectedCategory(category);
    setReset(!reset);
    navigate('/')
  }

  //모든 상품 리스트 출력
  useEffect(() => {

    if (title === undefined || title === null) {
      const InsertGoodsLIst = async () => {
        try {
          const rsp = await GoodsAxiosApi.getGoodsList();
          console.log(rsp.data);
          setList(rsp.data)
        } catch (error) {
          console.log(error);
        }
      };
      InsertGoodsLIst();
    } else {
      const titleLIst = async (title) => { // 여기서 파라미터를 title로 받음
        try {
          const rsp = await GoodsAxiosApi.titleList(title);
          console.log(rsp.data);
          setList(rsp.data);
        } catch (error) {
          console.log(error);
        }
      };
      titleLIst(title); // title 파라미터 전달
    }
  }, [reset, title])

  //카페고리 별 리스트 출력
  const categoryLIst = async (category) => {
    try {
      const rsp = await GoodsAxiosApi.categoryList(category);
      console.log(rsp.data);
      setList(rsp.data)
    } catch (error) {
      console.log(error);
    }
  };
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [totalPage, setTotalPage] = useState(0); // 총 페이지 수


  const onScroll = () => {

    setPosition(window.scrollY);
  }
  const [position, setPosition] = useState(0);
  const [list1, setList1] = useState([]);

  useEffect(() => {
    const onScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
        setCurrentPage(currentPage + 1);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, [currentPage]);
  // 총 페이지 수 계산

  useEffect(() => {

    const totalPage = async () => {
      try {
        const res = await GoodsAxiosApi.moviePage(0, 10);
        setTotalPage(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    totalPage();


  }, []);

  useEffect(() => {
    const goodsList = async () => {
      try {
        const res = await GoodsAxiosApi.moviePageList(currentPage, 10);
        const data = res.data;
        setList(prevList => [...prevList, ...data]); // 기존 리스트에 새 데이터를 추가합니다.
      } catch (error) {
        console.log(error);
      }
    };
    goodsList();
  }, [currentPage]);

  const handlePageChange = (number) => {
    console.log(number);
    setCurrentPage(number - 1);
  };

  return (
    <CategoryCss>
      <ul>
        <ListItem selected={selectedCategory === "all"} onClick={() => AllClick("all")}><p>전체</p></ListItem>
        <ListItem selected={selectedCategory === "fashion"} onClick={() => handleCategoryClick("fashion")}><p>패션</p></ListItem>
        <ListItem selected={selectedCategory === "jewelry"} onClick={() => handleCategoryClick("jewelry")}><p>쥬얼리</p></ListItem>
        <ListItem selected={selectedCategory === "furniture"} onClick={() => handleCategoryClick("furniture")}><p>가구</p></ListItem>
        <ListItem selected={selectedCategory === "stationery"} onClick={() => handleCategoryClick("stationery")}><p>문구</p></ListItem>
        <ListItem selected={selectedCategory === "pet"} onClick={() => handleCategoryClick("pet")}><p>반려</p></ListItem>
        <ListItem selected={selectedCategory === "kids"} onClick={() => handleCategoryClick("kids")}><p>아동</p></ListItem>
        <ListItem selected={selectedCategory === "craft"} onClick={() => handleCategoryClick("craft")}><p>공예</p></ListItem>
      </ul>

    </CategoryCss>
  )
}
