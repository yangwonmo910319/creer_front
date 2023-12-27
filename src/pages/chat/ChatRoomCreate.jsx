import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChatAxiosApi } from "../../api/ChatAxiosApi";

// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Title = styled.h1`
  color: #333;
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px; // 버튼 사이의 간격
`;

const Button = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const ChatRoomCreate = () => {
  const [chatRoomTitle, setChatRoomTitle] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  // 새로운 채팅방을 생성 후, 채팅 페이지로 이동
  const handleCreateChatRoom = async () => {
    const response = await ChatAxiosApi.chatCreate(email, chatRoomTitle);
    navigate(`/chatting/${response.data}`);
    console.log("ChatRoomCreate response.data : " + response.data);
  };

  // 뒤로 가기
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Title>채팅방 생성</Title>
      <Input
        type="text"
        value={chatRoomTitle}
        onChange={(e) => setChatRoomTitle(e.target.value)}
      />
      <ButtonContainer>
        <Button onClick={handleCreateChatRoom}>확인</Button>
        <Button onClick={handleCancel}>취소</Button>
      </ButtonContainer>
    </Container>
  );
};
