import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Common } from "../utils/Common";
import { MemberAxiosApi } from "../api/member/MemberAxiosApi";
import { StyledSearch } from "../css/common/StyledSearch";
import { Weather } from "./Weather";
import {
  StyledLogo,
  MidR,
  TopL,
  Top,
  TopR,
  BottomC,
  TopC,
} from "../css/NavBarStyle";

export const NavBar = () => {
  const navigate = useNavigate();
  const [member, setMember] = useState({});

  // 로그인 판별을 위한 상태
  const [login, setlogin] = useState(window.localStorage.getItem("isLogin"));

  useEffect(() => {
    if (login !== "true") {
      setlogin("false");
    }
  }, [login]);

  useEffect(() => {
    const getMember = async () => {
      // 로컬 스토리지에서 액세스 토큰 읽기
      const accessToken = Common.getAccessToken();

      try {
        // 로그인한 해당 회원의 상세 정보 조회
        const rsp = await MemberAxiosApi.memberGetOne();
        setMember(rsp.data);
        window.localStorage.setItem("NickName", rsp.data.nickName);
      } catch (e) {
        // 엑세스토큰이 만료되면,
        if (e.response.status === 401) {
          alert("액세스 토큰이 만료됐습니다!");
          // 리프레시 토큰을 통한 재발급
          await Common.handleUnauthorized();
          const newToken = Common.getAccessToken();
        }
      }
    };
    getMember();
  }, []);

  const logout = () => {
    // 로컬 스트리지 비우기
    localStorage.clear();
    navigate("/");
    window.location.reload();

    // 카카오 로그인 초기화를 위한 쿠키 제거
  };

  return (
    <>
      {/* 기본 */}
      <Top>
        <TopL>
          <Weather></Weather>
        </TopL>
        <TopC>
          <StyledLogo
            onClick={() => {
              navigate("/");
            }}
          ></StyledLogo>
        </TopC>
        {/* 로그인 여부 */}
        <TopR>
          <ul>
            {login === "false" ? ( // 로그인 X
              <>
                {/* 로그인 */}
                <br />
                <br />
                <br />
                <MidR>
                  <li
                    onClick={() => {
                      navigate("/Login");
                    }}
                  >
                    로그인
                  </li>
                  {/* 회원가입 */}
                  <li
                    onClick={() => {
                      navigate("/SignUp");
                    }}
                  >
                    회원가입
                  </li>
                </MidR>
              </>
            ) : (
              // 로그인 O
              <>
                <br />
                <TopR>
                  안녕하세요, <span>&nbsp;{member.nickName}</span>&nbsp;&nbsp;
                </TopR>
                <MidR>
                  {/* 마이 페이지 */}
                  <li
                    onClick={() => {
                      navigate("/MyPage");
                    }}
                  >
                    내 정보 수정
                  </li>
                  {/* 상품 등록 */}
                  <li
                    onClick={() => {
                      navigate("/GoodsWrite");
                    }}
                  >
                    상품 등록
                  </li>
                  {/* 장바구니 */}
                  <li
                    onClick={() => {
                      navigate("/Cart");
                    }}
                  >
                    장바구니
                  </li>
                  {/* 로그아웃 */}
                  <li
                    onClick={() => {
                      logout();
                    }}
                  >
                    로그아웃
                  </li>
                </MidR>
              </>
            )}
          </ul>
        </TopR>
        <BottomC>
          <StyledSearch />
        </BottomC>
      </Top>
    </>
  );
};
