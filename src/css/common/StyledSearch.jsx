import styled from "styled-components";
import { StyledButton } from "./StyledButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 이미지
import { FaSearch, FaMicrophone } from "react-icons/fa";

// 검색바
const SearchBox = styled.div`
  width: 40%;
  height: auto;
  display: flex;
  align-items: center;
  height: 40px;
`;

const SearchMode = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 70%;
  
  height: 35px;
  margin: 20px;
  border: 1.5px solid #c9cacc;
  border-radius: 24px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  background: white; // 배경색을 흰색으로 설정

  @media (max-width: 600px) {
    height: 30px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 16px;

  padding: 0 10px; // 아이콘과 겹치지 않는 적절한 패딩을 설정
  background: white; // 배경색을 흰색으로 설정

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const SearchIcon = styled.div`
  margin-left: 3%;
  cursor: pointer;
  svg {
    color: #757575;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.2);
      color: var(--black);
    }
  }
`;

const MicIcon = styled.div`
  margin-right: 3%;
  cursor: pointer;
  svg {
    color: #757575;
    transition: all 0.3s ease-in-out;
    &:hover {
      transform: scale(1.2);
      color: var(--black);
    }
  }
`;

export const StyledSearch = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const searchTitle = async () => {
    navigate(`/` + search);
    setSearch('')
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchTitle();
    }
  };

  return (
    <>
      <SearchBox>
        {/* <SearchLogo src={logo} alt="logo" /> */}
        <SearchMode>
          <SearchIcon>
            <FaSearch size={15} />
          </SearchIcon>
          <Input
            type="text"
            placeholder="검색어를 입력해 주세요"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <MicIcon>
            <FaMicrophone size={15} />
          </MicIcon>
        </SearchMode>
        <StyledButton
          onClick={searchTitle}
          value="검색"
          width="80px"
          height="40px"
          smallWidth="60px"
          smallHeight="30px"
          breakpoint="600px"
        ></StyledButton>
      </SearchBox>
    </>
  );
};
