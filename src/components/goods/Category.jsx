import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import { useNavigate, useParams } from "react-router-dom";
import {  PublicButton} from "../../css/common/PublicButton"
const ListItem = styled.li`
  width: 60px;
  height: 60px;
  background-color: ${props => props.selected ? ' #fde1e1' : '#dcdcdc'};
  /* color: ${props => props.selected ? ' #ffffff' : '#000000'}; */
  color:white;
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
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const { title } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const CategoryClick = (e) => {
    setList([]);
    setCurrentPage(0);
    setSelectedCategory(e);
    navigate("/");
  };

  const titleList = async (title) => {
    try {
      const rsp = await GoodsAxiosApi.titleList(title);
      setList(rsp.data);
    } catch (error) {
      console.log(error);
    }
  };

  const categoryList = async (category) => {
    try {
      const rsp = await GoodsAxiosApi.categoryList(category);
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
      if (selectedCategory === "전체") {
        setList([]);
        setCurrentPage(0);  
      } else {
        categoryList(selectedCategory);
      }
    }
  }, [title, selectedCategory]);

  useEffect(() => {    
    if (selectedCategory === "전체") {
      goodsList();
    }
  }, [currentPage]);


  return (
    <>
      <CategoryCss>
        <ul>
         <PublicButton text={"전체"} pick={selectedCategory}  submit={CategoryClick}>  </PublicButton>
         <PublicButton text={"패션"} pick={selectedCategory} submit={CategoryClick}> </PublicButton>
         <PublicButton text={"쥬얼리"} pick={selectedCategory} submit={CategoryClick}> </PublicButton>
         <PublicButton text={"가구"} pick={selectedCategory} submit={CategoryClick}> </PublicButton>
         <PublicButton text={"문구"} pick={selectedCategory} submit={CategoryClick}> </PublicButton>
         <PublicButton text={"반려"} pick={selectedCategory} submit={CategoryClick}> </PublicButton>
         <PublicButton text={"아동"} pick={selectedCategory} submit={CategoryClick}> </PublicButton>
         <PublicButton text={"공예"} pick={selectedCategory} submit={CategoryClick}> </PublicButton>
     
        </ul>

      </CategoryCss>
    </>
  )
}
