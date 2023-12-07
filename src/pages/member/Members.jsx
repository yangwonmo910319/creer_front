import { useState, useEffect } from "react";
import Common from "../../utils/Common";
import memberAxiosApi from "../../api/memberAxios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  direction: column;
  flex-wrap: wrap;
  margin: 20px auto;
`;

const MemberInfoWrapper = styled.div`
  display: flex;
  margin: 10px;
  width: 100%;
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  background-color: antiquewhite;
`;

const UserInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  margin-right: 10px;
`;

const MemberName = styled.span`
  font-style: italic;
  font-size: 1.2rem;
  color: #333;
  margin: 10px;
`;

const MemberEmail = styled.span`
  color: #555;
  margin-right: px;
  margin-bottom: 10px;
`;

const MemberJoinDate = styled.span`
  font-size: 0.8rem;
  color: #777;
  margin-right: 10px;
`;

const Members = () => {
  const navigate = useNavigate();
  const [memberInfo, setMemberInfo] = useState("");
  const isLogin = window.localStorage.getItem("isLogin");

  console.log(isLogin);
  if (isLogin !== "TRUE") navigate("/");

  useEffect(() => {
    const memberInfo = async () => {
      const rsp = await memberAxiosApi.memberGet(); // 전체 조회
      if (rsp.status === 200) setMemberInfo(rsp.data);
      console.log(rsp.data);
    };
    memberInfo();
  }, []);
 
  const onClickMember = (userEmail) => {
    console.log("onCLick member : " + userEmail);
    navigate(`/memberInfo/${userEmail}`);
  };

  return (
    <Container>
      {memberInfo &&
        memberInfo.map((member) => (
          <MemberInfoWrapper
            key={member.userEmail}
            onClick={() => onClickMember(member.userEmail)}
          >
            <UserImage src={member.image} />
            <UserInfo>
              <MemberName>이름: {member.name}</MemberName>
              <MemberEmail>이메일: {member.userEmail}</MemberEmail>
              <MemberJoinDate>
                가입일: {Common.formatDate(member.regDate)}
              </MemberJoinDate>
            </UserInfo>
          </MemberInfoWrapper>
        ))}
    </Container>
  );
};

export default Members;
