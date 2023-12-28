import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AnotherButton } from "../../css/common/AnotherButton";
import { useParams } from "react-router-dom";
import { CartAxiosApi } from "../../api/goods/CartAxiosApi";

const PaymentCss = styled.div`
width: 80%;
height: auto;
  margin  : 0 auto;
div{
  /* border: 1px solid black; */
  margin: 10px 0;
}
.content1{
  width: 100%;
  height: auto;
  border-bottom: 2px solid #7f7f7f;
  h2{  margin: 0;}
}
.content2{
  width: 100%;  
  height: auto;
  
  .content2-1{
    border-bottom: 2px solid #a9a9a9;
    width: 100%;
  height: auto;

  h3{  margin: 0;}
  }
  .content2-2{
    margin: 0 auto;
    width: 80%;
    height: 100px;
    ul{
      width: 100%;
      margin: 0;
      padding: 0;
      list-style: none;            
      li:first-child{
            border-top: 1px solid  #4d4949;}
            li:last-child{
            border-bottom: 1px solid   #4d4949;}         
   
      li{
         border-bottom: 1px solid  #a9a9a9;
         display: flex;
         flex-direction: row;
         height: auto;
     
        .title{
          border-right: 1px solid #a9a9a9;
          margin:0;
          width: 100px;
          height: 30px;
        background: #d7d7d7;
        font-size: .8em;
        display: flex;
        justify-content: right;
        padding-right: 10px;
        align-items: center;
        }
        .content{
          margin:0;
          margin-left: 10px;
          width: 100%;
          height: 30px;
         
          
        }
      }      
  }
}
}
.content3{
  margin: 0 auto;
  width: 80%;
  height: 120px;
  border: 2px solid red;
  display: flex;
  flex-direction: row;

  .content3-1{
    width: 150px;
  height: 120px;
  border: 1px solid blue;
  margin: 0;
  padding: 0;
  img{
    width: 120px;
    height: 120px;
  }
  }
  .content3-2 {
  width: 100%;
  margin: 0;
  padding: 0;
  height: 120px;
  border: 1px solid yellow;
  display: flex;
}

.content3-2 .title {
  flex: 1;
}

.content3-2 > div:not(.title) {
  width: 80px;
}


.content4{
  width: 500px;
  height: auto;
  margin: 0 auto;
  margin-top: 50px;
  padding-bottom: 20px;
  display: flex;
  button{
    margin: 0 auto;
  }
}

`;



export const Payment = () => {
  const navigate = useNavigate();
  const { goodsId } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const [list, setList] = useState();
  // const [allCheck, setAllCheck] = useState(false);
  // const [Check1, setCheck1] = useState(false);
  // const [Check2, setCheck2] = useState(false);
  // const [Check3, setCheck3] = useState(false);
  // const [Check4, setCheck4] = useState(false);
  // const [Check5, setCheck5] = useState(false);

  // const allBtnEvent =()=>{
  //   if(allCheck === false) {
  //     setAllCheck(true);
  //     setCheck1(true);
  //     setCheck2(true);
  //     setCheck3(true);
  //     setCheck4(true);
  //     setCheck5(true);
  //   }else {
  //     setAllCheck(false);
  //     setCheck1(false);
  //     setCheck2(false);
  //     setCheck3(false);
  //     setCheck4(false);
  //     setCheck5(false);
  //   } 
  // };

  // const BtnEvent1 =()=>{
  //   if(Check1 === false) {
  //     setCheck1(true)
  //   }else {
  //     setCheck1(false)
  //   }
  // };

  // const BtnEvent2 =()=>{
  //   if(Check2 === false) {
  //       setCheck2(true)
  //   }else {
  //       setCheck2(false)
  //   }
  // };

  // const BtnEvent3 =()=>{
  //   if(Check3 === false) {
  //       setCheck3(true)
  //   }else {
  //       setCheck3(false)
  //   }
  // };
  // const BtnEvent4 =()=>{
  //   if(Check4 === false) {
  //       setCheck4(true)
  //   }else {
  //       setCheck4(false)
  //   }
  // };
  // const BtnEvent5 =()=>{
  //   if(Check5 === false) {
  //       setCheck5(true)
  //   }else {
  //       setCheck5(false)
  //   }
  // };

  // useEffect(()=>{
  //   if(Check1===true && Check2===true && Check3===true && Check4===true && Check5===true){
  //     setAllCheck(true)
  //     window.localStorage.setItem("allCheck",true)
  //   } else {
  //     setAllCheck(false)
  //     window.localStorage.setItem("allCheck",false)
  //   }
  // }, [Check1,Check2, Check3,Check4,Check5])
  useEffect(() => {
    const select = async () => {
      try {
        const res = await CartAxiosApi.selectCart(accessToken, goodsId);
        if (res && res.status === 200) {
          console.log(res.data);
          console.log(res.data);
          console.log(res.data);
          setList(res.data);
        } else {

        }
      } catch (error) {
        // 오류가 발생한 경우
        console.error(".", error);
      };
    }
    select()
  }, [])

  const cancel = () => {
    navigate(-1)
  }
  return (
    <PaymentCss>
      <div className="content1"><h2>주문 결제</h2> </div>
      <div className="content3">
        <div className="content3-1">
          {list && <img src={list.goodsImg}></img>
          }
        </div>
        <div className="content3-2">
          <div className="title">{list && list.title}</div>
          <div>{list && list.price}원</div>
          <div>{list && list.quantity}개</div>
          <div>{list && list.quantity * list.price}원</div>
        </div>
      </div>
      <div className="content2">
        <div className="content2-1"><h3>구매자 정보</h3></div>
        <div className="content2-2">
          <ul>
            <li><div className="title">이름</div><div className="content"><input type="text"></input></div></li>
            <li><div className="title">이메일</div><div className="content"><input type="text"></input></div></li>
            <li><div className="title">전화 번호</div><div className="content"><input type="text"></input></div></li>
          </ul>
        </div>
        <div className="content2-1"><h3>판매자 정보</h3></div>
        <div className="content2-2">
          <ul>
            <li><div className="title">이름</div><div className="content"><input type="text"></input></div></li>
            <li><div className="title">배송주소 </div><div className="content"><input type="text"></input></div></li>
            <li><div className="title">연락처</div><div className="content"><input type="text"></input></div></li>
            <li><div className="title">배송 요청사항</div><div className="content"><input type="text"></input></div></li>
          </ul>
        </div>
      </div>

      <div className="content4">
        <AnotherButton value={"확인"}></AnotherButton>
        <AnotherButton value={"취소"} onClick={cancel}></AnotherButton>
      </div>


      {/* <ItemBox onClick={() => navigate("/Goods/info")}> 
      </ItemBox> */}
      {/* <TitleBox3>
        <h1>약관동의</h1>
        <h2><CheckBox type="checkbox" checked1={false} id="all-check" checked={allCheck} onChange={allBtnEvent} />약관 전체 동의 <h3>약관 전문을 모두 확인 하셔야 예약이 완료됩니다.</h3></h2>
        </TitleBox3>
        <SurveBox>
        <h2><CheckBox type="checkbox" checked1={true}  id="check1" checked={Check1} onChange={BtnEvent1} /><h3>특별약관 설명 및 확인 <span style={{color:"red"}}>(필수)</span></h3></h2>
        <h2><CheckBox type="checkbox" checked1={true}  id="check2" checked={Check2}  onChange={BtnEvent2} /><h3>약관동의 <span style={{color:"red"}}>(필수)</span></h3></h2>
        <h2><CheckBox type="checkbox" checked1={true}  id="check3" checked={Check3}  onChange={BtnEvent3} /><h3>개인정보 <span style={{color:"red"}}>(필수)</span></h3></h2>
        <h2><CheckBox type="checkbox" checked1={true}  id="check4" checked={Check4}  onChange={BtnEvent4} /><h3>개인정보 3자제공 <span style={{color:"red"}}>(필수)</span></h3></h2>
        <h2><CheckBox type="checkbox" checked1={true}  id="check5" checked={Check5}  onChange={BtnEvent5} /><h3>고유식별정보 수집안내 <span style={{color:"red"}}>(필수)</span></h3></h2>
        </SurveBox> */}
      <>
        {/* <TitleBox style={{height:"200px", marginTop:"0"}}>
            <h2 >취소위약금 및 동의사항</h2>
            <ul className="title1box1">
                <li>결제완료 후 예약확정 시 취소 시점에 따라 위약금이 발생할 수 있습니다.</li>
                <li>취소료 규정은 각 상품 상세 페이지에서 확인 가능합니다.</li>
                <li>예약이 완료되면 담당자가 전화로 추가 안내 및 확인 절차를 거칩니다.</li>
                <li>여행상품의 특성 상 경우에 따라 예약이 완료된 후에도 처리가 불가능할 수 있습니다.</li>
                <li>본 여행상품의 세부 약관 규정은 재경부 고시 소비자 피해보상 규정을 바탕으로 합니다.</li>
            </ul>
        </TitleBox> */}

      </>
    </PaymentCss>
  )
}