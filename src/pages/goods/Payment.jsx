import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  h1 {
    font-size: 30px;
    font-weight: bold;
    padding: 20px;
  }
  h3 {
    padding: 15px;
    font-size: 12px;
    font-weight: bold;
    color: gray;
  }
`;

const ItemBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 800px;
  height: 200px;
  border: 1px solid grey;
  border-radius: 10px;
  cursor: pointer;
  .itemInfo {
    width: 500px;
    height: 150px;
    margin-left: 20px;
  }
  h3 {
    font-size: 14px;
    padding-bottom: 5px;
  }
  h1 {
    font-size: 18px;
    font-weight: bold;
  }
  h2 {
    display: flex;
    flex-direction: column-reverse;
    height: 80px;
    font-size: 24px;
    font-weight: bold;
  }
`;

const ItemImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 10px 0 0 10px;
  object-fit: cover;
`;
const TitleBox2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 800px;
    height: 100px;
    margin-top: 50px;
    border-bottom: 2px solid grey;
    h1{
        font-size: 20px;
        font-weight: bold;
    }
    h2{
        display: flex;
        align-items: center;
        padding-top: 20px;
        font-size: 15px;
        font-weight: bold;
    }
    h3{
        font-size: 12px;
        font-weight: 500;
        padding-left:20px ;
    }
`;

const SurveBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 800px;
    height: 170px;
    padding: 20px 0;
    border-bottom: 1px solid grey;
    h1{

    }
    h2{
        display: flex;
        align-items: center;
        justify-content: start;
        margin: 5px;
    }
    h3{
        padding-left: 10px;
        font-size: 14px;
        
    }
`;

const CheckBox = styled.input`
    appearance: none;
    width: ${(props) => (!props.checked1 ? "1.5em" : "1.0em")};
    height: ${(props) => (!props.checked1 ? "1.5em" : "1.0em")};
    border: 1.5px solid gainsboro;
    border-radius: 0.35rem;
    &:checked {
        border-color: transparent;
        background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
        background-size: 100% 100%;
        background-position: 50%;
        background-repeat: no-repeat;
        background-color: ${(props) => (!props.checked1 ? "rgb(104, 208, 118)" : "rgb(253, 241, 147)")};
    }
`;

const TitleBox3 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    width: 80%;
    height: auto;
    margin-top: 50px;
    border-bottom: 2px solid #c1c1c1;
    h1{
        font-size: 20px;
        font-weight: bold;
        
    }
    h2{
        display: flex;
        align-items: center;
        padding-top: 20px;  
        font-size: 15px;
        font-weight: bold;
    }
    h3{
        font-size: 12px;
        font-weight: 500;
        padding-left:20px ;
    }
    .title1box1{
        width: 80%;
    height: auto;       
            font-size: 10px;
            align-items: center;
            font-weight: bold;
            padding: 2% 2%;
            li{
                padding: 5px 0;
                list-style:square;
            }
        }
`;

const SellTable=styled.table`
    width: 80%;
    margin: 0 auto;
    height: auto;
    border: 1px solid #c1c1c1;
   .a{
    height: 80px;
   }
   .b{
    height: 75%;
    height: 50%;
   }
    tr{
        display: flex;
    flex-direction: row;
    }

th{
    display: flex;
    justify-content: center;
    width: 20%;
    align-items: center;
    justify-content: start;

    height: 50px;
    border: 1px solid #c1c1c1;
    font-size: 14px;
    font-weight: bold;
}
  td {
    display: flex;
    width: 81%;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    padding:0;
    height: 50px;
    border: 1px solid #c1c1c1;
    font-size: 10px;
    font-weight: bold;
  }
  input{
    margin: 0 auto;
    width: 98%;
    height: 75%;
  }
`;

const SellButton = styled.button`
    margin: 20px;
    width: 150px;
    height: 40px;
    background-color: ${(props) => (!props.Buttonstlye ? "white" : "black")};
    color : ${(props) => (!props.Buttonstlye ? "black" : "white")};
    border: ${(props) => (!props.Buttonstlye ? "1px solid #c1c1c1;" : "0")};;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
`

const PaymentCss= styled.div`
width: 100%;
height: auto;
  margin  : 0 auto;
`;



export const Payment = () =>{
    const navigate = useNavigate();
    const [allCheck, setAllCheck] = useState(false);
    const [Check1, setCheck1] = useState(false);
    const [Check2, setCheck2] = useState(false);
    const [Check3, setCheck3] = useState(false);
    const [Check4, setCheck4] = useState(false);
    const [Check5, setCheck5] = useState(false);
  
    const allBtnEvent =()=>{
      if(allCheck === false) {
        setAllCheck(true);
        setCheck1(true);
        setCheck2(true);
        setCheck3(true);
        setCheck4(true);
        setCheck5(true);
      }else {
        setAllCheck(false);
        setCheck1(false);
        setCheck2(false);
        setCheck3(false);
        setCheck4(false);
        setCheck5(false);
      } 
    };
    
    const BtnEvent1 =()=>{
      if(Check1 === false) {
        setCheck1(true)
      }else {
        setCheck1(false)
      }
    };
    
    const BtnEvent2 =()=>{
      if(Check2 === false) {
          setCheck2(true)
      }else {
          setCheck2(false)
      }
    };
    
    const BtnEvent3 =()=>{
      if(Check3 === false) {
          setCheck3(true)
      }else {
          setCheck3(false)
      }
    };
    const BtnEvent4 =()=>{
      if(Check4 === false) {
          setCheck4(true)
      }else {
          setCheck4(false)
      }
    };
    const BtnEvent5 =()=>{
      if(Check5 === false) {
          setCheck5(true)
      }else {
          setCheck5(false)
      }
    };
  
    useEffect(()=>{
      if(Check1===true && Check2===true && Check3===true && Check4===true && Check5===true){
        setAllCheck(true)
        window.localStorage.setItem("allCheck",true)
      } else {
        setAllCheck(false)
        window.localStorage.setItem("allCheck",false)
      }
    }, [Check1,Check2, Check3,Check4,Check5])
  
return(
    <PaymentCss>
     
      <ItemBox onClick={() => navigate("/Goods/info")}> 
      </ItemBox>
      <TitleBox3>
        <h1>약관동의</h1>
        <h2><CheckBox type="checkbox" checked1={false} id="all-check" checked={allCheck} onChange={allBtnEvent} />약관 전체 동의 <h3>약관 전문을 모두 확인 하셔야 예약이 완료됩니다.</h3></h2>
        </TitleBox3>
        <SurveBox>
        <h2><CheckBox type="checkbox" checked1={true}  id="check1" checked={Check1} onChange={BtnEvent1} /><h3>특별약관 설명 및 확인 <span style={{color:"red"}}>(필수)</span></h3></h2>
        <h2><CheckBox type="checkbox" checked1={true}  id="check2" checked={Check2}  onChange={BtnEvent2} /><h3>약관동의 <span style={{color:"red"}}>(필수)</span></h3></h2>
        <h2><CheckBox type="checkbox" checked1={true}  id="check3" checked={Check3}  onChange={BtnEvent3} /><h3>개인정보 <span style={{color:"red"}}>(필수)</span></h3></h2>
        <h2><CheckBox type="checkbox" checked1={true}  id="check4" checked={Check4}  onChange={BtnEvent4} /><h3>개인정보 3자제공 <span style={{color:"red"}}>(필수)</span></h3></h2>
        <h2><CheckBox type="checkbox" checked1={true}  id="check5" checked={Check5}  onChange={BtnEvent5} /><h3>고유식별정보 수집안내 <span style={{color:"red"}}>(필수)</span></h3></h2>
        </SurveBox>
        <>
        <TitleBox>
        <h1>예약 정보</h1>
        </TitleBox>
        <SellTable>
            <tr>
                <th>주문자 명</th>
                <td><input type="text" /></td>
            </tr>
            <tr>
                <th>휴대폰 번호</th>
                <td><input type="text" /></td>
            </tr>
            <tr>
                <th>이메일</th>
                <td><input type="text" /></td>
            </tr>    
        </SellTable>
        <TitleBox>
        <h1>배송지 입력</h1>
        </TitleBox>
        <SellTable>
        <tr >
                <th  className="a">배송지 선택</th>
                <td style={{ flexDirection: 'column' }}>
                    <div  className="b" >주소 선택
                    <input  className="b"  type="text" />
                    </div></td>
            </tr>
            <tr>
                <th>수령인</th>
                <td><input type="text" /></td>
            
            </tr>
            <tr>
                <th>휴대폰</th>
                <td><input type="text" /></td>
            </tr>    
            <tr>
                <th>요청사항</th>
                <td><input type="text" /></td>
            </tr>    
        </SellTable>

        <TitleBox style={{height:"200px", marginTop:"0"}}>
            <h2 >취소위약금 및 동의사항</h2>
            <ul className="title1box1">
                <li>결제완료 후 예약확정 시 취소 시점에 따라 위약금이 발생할 수 있습니다.</li>
                <li>취소료 규정은 각 상품 상세 페이지에서 확인 가능합니다.</li>
                <li>예약이 완료되면 담당자가 전화로 추가 안내 및 확인 절차를 거칩니다.</li>
                <li>여행상품의 특성 상 경우에 따라 예약이 완료된 후에도 처리가 불가능할 수 있습니다.</li>
                <li>본 여행상품의 세부 약관 규정은 재경부 고시 소비자 피해보상 규정을 바탕으로 합니다.</li>
            </ul>
        </TitleBox>
            <span>
            <SellButton Buttonstlye={1} onClick={()=>navigate(-1)}>취소하기</SellButton>
            <SellButton Buttonstlye={1} onClick={1}>예약하기</SellButton>
            </span>
        </>
    </PaymentCss>
)
}