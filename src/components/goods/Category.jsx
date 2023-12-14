import { useState } from "react";
import styled, { css } from "styled-components";

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

export const Category = ({ setCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCategory(category);
  }

  return (
    <CategoryCss>
      <ul>
        <ListItem selected={selectedCategory === "all"} onClick={() => handleCategoryClick("all")}><p>전체</p></ListItem>
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
