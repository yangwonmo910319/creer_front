import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { memberAxiosApi } from "../../api/member/memberAxiosApi";
import {
  Input,
  Button,
  Container,
  Items,
} from "../../css/member/LoginCss";
import { Modal } from "../../utils/member/MemberModal";


export const SignUp = () => {
  const navigate = useNavigate();
  // 키보드 입력
  const [inputPassWord, setInputPassWord] = useState("");
  const [inputConPassWord, setInputConPassWord] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputUserEmail, setInputUserEmail] = useState("");

  // 오류 메시지
  const [passWordMessage, setPassWordMessage] = useState("");
  const [conPassWordMessage, setConPassWordMessage] = useState("");
  const [mailMessage, setMailMessage] = useState("");
  const [addMessage, setAddMessage] = useState("");

  // 유효성 검사
  const [isUserMail, setIsUserMail] = useState(false);
  const [isPassWord, setIsPassWord] = useState(false);
  const [isConPassWord, setIsConPassWord] = useState(false);
  const [isName, setIsName] = useState(false);

  // 팝업
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModelText] = useState("중복된 아이디 입니다.");

  const closeModal = () => {
    setModalOpen(false);
  };

  const onChangeMail = (e) => {
    setInputUserEmail(e.target.value);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(e.target.value)) {
      setMailMessage("이메일 형식이 올바르지 않습니다.");
      setIsUserMail(false);
    } else {
      setMailMessage("올바른 형식 입니다.");
      setIsUserMail(true);
      memberRegCheck(e.target.value);
    }
  };

  const onChangePw = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setInputPassWord(passwordCurrent);
    if (!passwordRegex.test(passwordCurrent)) {
      setPassWordMessage("숫자+영문자 조합으로 8자리 이상 입력해주세요!");
      setIsPassWord(false);
    } else {
      setPassWordMessage("안전한 비밀번호에요 : )");
      setIsPassWord(true);
    }
  };
  const onChangeConPw = (e) => {
    const passwordCurrent = e.target.value;
    setInputConPassWord(passwordCurrent);
    if (passwordCurrent !== inputPassWord) {
      setConPassWordMessage("비밀 번호가 일치하지 않습니다.");
      setIsConPassWord(false);
    } else {
      setConPassWordMessage("비밀 번호가 일치 합니다. )");
      setIsConPassWord(true);
    }
  };
  const onChangeName = (e) => {
    setInputName(e.target.value);
    setIsName(true);
  };

  // 회원 가입 여부 확인
  const memberRegCheck = async (userEmail) => {
    try{
      const resp = await memberAxiosApi.memberRegCheck(userEmail);
      console.log("가입 가능 여부 확인 : ", resp.data);

      if(resp.data === true) {
        setMailMessage("사용 가능한 이메일 입니다.");
        setIsUserMail(true);
      } else {
        setMailMessage("중복된 이메일 입니다.");
        setIsUserMail(false);
      }
    } catch(error) {
      console.log(error);
    }
  };

  const onClickLogin = async () => {
    const memberReg = await memberAxiosApi.memberReg(inputUserEmail, inputPassWord, inputName);
    console.log(memberReg.data);
    if (memberReg.data.email === inputUserEmail) {
      navigate("/");
    } else {
      setModalOpen(true);
      setModelText("회원 가입에 실패 했습니다.");
    }
  };

  return (
    <Container>
      <Items className="sign">
        <span>Sign Up</span>
      </Items>

      <Items className="item2">
        <Input
          type="email"
          placeholder="이메일"
          value={inputUserEmail}
          onChange={onChangeMail}
        />
      </Items>
      <Items className="hint">
        {inputUserEmail.length > 0 && (
          <span className={`message ${isUserMail ? "success" : "error"}`}>
            {mailMessage}
          </span>
        )}
      </Items>
      <Items className="item2">
        <Input
          type="password"
          placeholder="패스워드"
          value={inputPassWord}
          onChange={onChangePw}
        />
      </Items>
      <Items className="hint">
        {inputPassWord.length > 0 && (
          <span className={`message ${isPassWord ? "success" : "error"}`}>
            {passWordMessage}
          </span>
        )}
      </Items>
      <Items className="item2">
        <Input
          type="password"
          placeholder="패스워드 확인"
          value={inputConPassWord}
          onChange={onChangeConPw}
        />
      </Items>
      <Items className="hint">
        {inputPassWord.length > 0 && (
          <span className={`message ${isConPassWord ? "success" : "error"}`}>
            {conPassWordMessage}
          </span>
        )}
      </Items>
      <Items className="item2">
        <Input
          type="text"
          placeholder="이름"
          value={inputName}
          onChange={onChangeName}
        />
      </Items>

      <Items className="item2">
        {isUserMail && isPassWord && isConPassWord && isName ? (
          <Button enabled onClick={onClickLogin}>
            NEXT
          </Button>
        ) : (
          <Button disabled>NEXT</Button>
        )}
        <Modal open={modalOpen} close={closeModal} header="오류">
          {modalText}
        </Modal>
      </Items>
    </Container>
  );
};

