import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { useNavigate, useParams } from "react-router-dom";
const ListItem = styled.li`
  width: 70px;
  height: 70px;
  background-color: ${props => props.selected ? ' #e84855' : '#fff9e6'};
  color: ${props => props.selected ? ' #ffffff' : '#000000'};
  border-radius: 50px;
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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { title } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0)

  //카테고리 클릭시
  const CategoryClick = (e) => {
    setList([])
    setCurrentPage(0)
    setSelectedCategory(e)
    navigate("/");
  }


  const titleList = async (title) => {
    try {
      const rsp = await GoodsAxiosApi.titleList(title);
      console.log(rsp.data);
      setList(rsp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const categoryList = async (category) => {
    try {
      const rsp = await GoodsAxiosApi.categoryList(category);
      console.log(rsp.data);
      setList(rsp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const goodsList = async () => {
    try {
      const res = await GoodsAxiosApi.GoodsPageList(currentPage, 5);
      const data = res.data;
      setList(prevList => [...prevList, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    if (title) {
      setSelectedCategory("검색");
      titleList(title);
    } else {
      if (selectedCategory !== "all") {
        categoryList(selectedCategory);
      } else {
        goodsList();
      }
    }
  }, [title, selectedCategory]);

  useEffect(() => {
    if (selectedCategory === "all") {
      setList([])
      setCurrentPage(0)
      goodsList();
    }
  }, [currentPage]);

  return (
    <>
      <CategoryCss>
        <ul>
          <ListItem selected={selectedCategory === "all"} onClick={() => CategoryClick("all")}><p>전체</p></ListItem>
          <ListItem selected={selectedCategory === "패션"} onClick={() => CategoryClick("패션")}><p>패션</p></ListItem>
          <ListItem selected={selectedCategory === "쥬얼리"} onClick={() => CategoryClick("쥬얼리")}><p>쥬얼리</p></ListItem>
          <ListItem selected={selectedCategory === "가구"} onClick={() => CategoryClick("가구")}><p>가구</p></ListItem>
          <ListItem selected={selectedCategory === "문구"} onClick={() => CategoryClick("문구")}><p>문구</p></ListItem>
          <ListItem selected={selectedCategory === "반려"} onClick={() => CategoryClick("반려")}><p>반려</p></ListItem>
          <ListItem selected={selectedCategory === "아동"} onClick={() => CategoryClick("아동")}><p>아동</p></ListItem>
          <ListItem selected={selectedCategory === "공예"} onClick={() => CategoryClick("공예")}><p>공예</p></ListItem>
        </ul>

      </CategoryCss>
    </>
  )
}
