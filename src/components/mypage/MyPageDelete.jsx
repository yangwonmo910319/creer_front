import { useState, useReducer } from "react";
import { reducer } from "../../pages/member/MyPage";
import { InputBox, InputTag, InpuTitle, MyPageButton } from "./MyPageComp";
import { Modal } from "../../utils/member/MyPageModal";
import { MyPageAxiosApi } from "../../api/member/MyPageAxiosApi";
import { useNavigate } from "react-router-dom";

export const MyPageDELETE = ({ id }) => {
  const navigate = useNavigate();

  const [data, dispatch] = useReducer(reducer, {
    email: "",
    name: "",
    password: "",
    phoneNum: "",
  });

  // 기본 이름 아이디 등 입력하고 난후 입력 조건이 적절하면 등장하는 정보 수정 입력창
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkName, setCheckName] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  const [checkPhoneNum, setCheckPhoneNum] = useState(false);

  //모달창 제어
  const [rst, setRst] = useState(false);
  const closeModal = () => {
    setRst(false);
    navigate("/");
    window.location.reload();
  };

  const [emailMsg, setEmailMsg] = useState("이메일 형식에 맞추어 입력하세요.");
  const [nameMsg, setNameMsg] = useState("이름 형식에 맞추어 입력하세요.");
  const [passwordMsg, setPasswordMsg] = useState(
    "비밀번호 형식에 맞추어 입력하세요."
  );
  const [phoneNumMsg, setPhoneNumMsg] = useState(
    "전화번호 형식에 맞추어 입력하세요."
  );
  const allChecksTrue = () => {
    return checkEmail && checkName && checkPassword && checkPhoneNum;
  };

  // 이메일 제약 조건
  const onChangeEmail = (e) => {
    const inputEmail = e.target.value;
    if (/^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+$/.test(inputEmail)) {
      // useReducer
      dispatch({ type: "Email", value: inputEmail }); // data.email의 값을 inputEmail로 업데이트
      setEmailMsg("유효합니다.");
      setCheckEmail(true);
    } else {
      dispatch({ type: "Email", value: false });
      setEmailMsg("유효하지 않습니다.");
      setCheckEmail(false);
    }
    console.log(checkEmail);
  };

  // 이름 제약 조건
  const onChangeName = (e) => {
    const inputName = e.target.value;
    if (inputName.length >= 2 && !/[0-9!@#$%^&*(),.?":{}|<>]/.test(inputName)) {
      dispatch({ type: "Name", value: inputName });
      setNameMsg("유효합니다.");
      setCheckName(true);
    } else {
      dispatch({ type: "Name", value: false });
      setNameMsg("유효하지 않습니다.");
      setCheckName(false);
    }
    console.log(checkName);
  };

  // 비밀번호 제약 조건
  const onChangePassword = (e) => {
    const inputPassword = e.target.value;
    if (/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/.test(inputPassword)) {
      dispatch({ type: "Password", value: inputPassword });
      setPasswordMsg("유효합니다.");
      setCheckPassword(true);
    } else {
      dispatch({ type: "Password", value: false });
      setPasswordMsg("유효하지 않습니다.");
      setCheckPassword(false);
    }
  };

  const onChangePhoneNum = (e) => {
    const inputPhoneNum = e.target.value;
    if (/^\d{2,3}-\d{3,4}-\d{3,4}$/.test(inputPhoneNum)) {
      dispatch({ type: "PhoneNum", value: inputPhoneNum });
      setPhoneNumMsg("유효합니다.");
      setCheckPhoneNum(true);
    } else {
      dispatch({ type: "Pw", value: false });
      setPhoneNumMsg("유효하지 않습니다.");
      setCheckPhoneNum(false);
    }
  };

  // 백엔드 이후 체크된 정보를 토대로 true or false
  const [checkedInfo, setCheckedInfo] = useState(false);
  const onClickCheck = async () => {
    await MyPageAxiosApi.memberCheck(
      data.email,
      data.name,
      data.password,
      data.phoneNum
    );
    console.log(
      "data.email : " +
        data.email +
        " data.name : " +
        data.name +
        " data.password : " +
        data.password +
        " data.phoneNum : " +
        data.phoneNum
    );

    setCheckedInfo(true); // 해당 정보로 회원 정보가 존재할때만 다음으로 넘어가게 설정,
    setOldIsVisible(false); // 이전 컴포넌트는 안보이게,
    setNewIsVisible(true); // 새로운 컴포넌트가 보이게 설정
  };

  // 이메일로 삭제할 회원 정보 재확인
  const [delEmail, setDelEmail] = useState("");
  const [msg, setMsg] = useState("");
  const onDeleteId = (e) => {
    setMsg("");
    if (/^[A-Za-z0-9]+@[A-Za-z]+\.[A-Za-z]+$/.test(e.target.value)) {
      setMsg("유효합니다.");
      setDelEmail(e.target.value);
      setCheckTrue(true);
    } else {
      setMsg("유효하지 않습니다.");
      setCheckTrue(false);
    }
    console.log("회원 탈퇴할 회원의 이메일 : " + delEmail);
  };
  const [checkTrue, setCheckTrue] = useState(false);
  const onClickDeleteId = async () => {
    try {
      const response = await MyPageAxiosApi.memberDel(delEmail);
      if (response.data === true) {
        setCheckTrue(true);
        setRst(true); // Modal
      } else {
        setCheckTrue(false);
        alert("회원 탈퇴에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원 탈퇴 도중에 오류가 발생했습니다 : ", error);
    }
  };

  // 정보 제출 이후에 조건이 달성되면 해당 페이지 사라지고 다음 페이지 등장
  const [isOldVisible, setOldIsVisible] = useState(true);
  const [isNewVisible, setNewIsVisible] = useState(false);

  return (
    <>
      {isOldVisible && (
        <>
          <InputTag>
            <h1
              style={{
                border: "bold",
                fontSize: "1.5rem",
                borderBottom: "3px solid black",
              }}
            >
              회원 탈퇴
            </h1>
            <p>
              회원을 탈퇴합니다. 회원 정보 확인을 위해 이름, 아이디, 비밀번호,
              이메일을 입력하세요.
            </p>

            <InpuTitle>
              <InputBox
                height="100%"
                width="70%"
                placeholder="이메일"
                type="text"
                onChange={onChangeEmail}
              />
            </InpuTitle>
            <p>{emailMsg}</p>

            <InpuTitle>
              <InputBox
                height="100%"
                width="70%"
                placeholder="이름"
                type="text"
                onChange={onChangeName}
              />
            </InpuTitle>
            <p>{nameMsg}</p>

            <InpuTitle>
              <InputBox
                height="100%"
                width="70%"
                placeholder="비밀번호"
                type="password"
                onChange={onChangePassword}
              />
            </InpuTitle>
            <p>{passwordMsg}</p>

            <InpuTitle>
              <InputBox
                height="100%"
                width="70%"
                placeholder="전화번호"
                type="text"
                onChange={onChangePhoneNum}
              />
            </InpuTitle>
            <p>{phoneNumMsg}</p>

            <MyPageButton onClick={onClickCheck} disabled={!allChecksTrue()}>
              정보 확인
            </MyPageButton>
          </InputTag>
        </>
      )}

      {isNewVisible && (
        <InputTag height="30%">
          {checkedInfo && (
            <>
              <p>회원 탈퇴할 이메일을 입력하세요.</p>
              <InputBox
                width="60%"
                height="10%"
                placeholder="ID"
                type="text"
                onChange={onDeleteId}
              />
              <p>{msg}</p>
              {checkTrue && (
                <MyPageButton onClick={onClickDeleteId}>회원 탈퇴</MyPageButton>
              )}
              <Modal open={rst} close={closeModal}>
                회원을 탈퇴하셨습니다..
              </Modal>
            </>
          )}
        </InputTag>
      )}
    </>
  );
};
