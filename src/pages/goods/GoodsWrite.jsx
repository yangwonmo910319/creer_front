
import { storage } from "../../api/FireBase";
import { useEffect, useState } from "react";
import { GoodsInfoEdit } from "../../components/goods/GoodsInfoEdit"
import { GoodsOptionEdit } from "../../components/goods/GoodsOptionEdit"
import { GoodsAxiosApi } from "../../api/goods/GoodsAxiosApi";
import styled from "styled-components";
import { PictureAxiosApi } from "../../api/goods/PictureAxiosApi";
import { QuillText } from "../../components/goods/QuillText";
import { OptionWriteBox } from "../../components/goods/OptionWriteBox";
import { OptionAxiosApi } from "../../api/goods/OptionAxiosApi";


const GoodsWriteCss = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  margin-top: 100px;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto;
    grid-template-areas:
      "option"
      "info";
  }
`;
const GoodsInfoCss = styled.div`
    width: 65%;
    height: auto;

    @media (max-width: 768px) {
        width: 500px;
        margin: 0 auto;
        grid-area: info; 
    }
   
`;

const ImgCategory = styled.div`
  width: 95%;
  height: auto;
  display: flex;
   flex-direction: column;
  .ImgCategory1{
    width: 100%;  
 
    height: 470px;
  }
  .ImgCategory2{
    width: 100%;
    height: 120px;

    display: flex;
  flex-direction: row;
  justify-content: center;

    img{
      margin: 5px;
      border: 1px solid black;
      width: 120px;
    height: 120px;
    padding: 10px;
    }
  }
`
const ImgBox = styled.div`
    width: 100%;
    height: auto;
    display: flex;
   justify-content: center;
   border: ${(props) => (props.url === null || props.url.length === 0 ? '3px solid red' : '3px solid  #03bf81')};
   .mainImg{ 
        width: 450px;   
        height: auto;
        display: flex;
        justify-content: center;
        img{
          border: 1px solid rgba(171, 171, 171, 0.5);
        width: 400px;
        height: 400px;
    }
    }
    .subImg{
        width: 100px;
        height: auto;
        img{
        width: 80px;
        height: 80px;
    }
    }
`;
const InfoBox = styled.div`     
       width: 80%;
    height: auto;
border: ${(props) => (props.goodsDesc === null || props.goodsDesc.length == 0 ? '3px solid red' : '3px solid  #03bf81')};
    margin: 20px auto;    
    input{
     width: 90%;  
    }
`;
const InfoCategory = styled.div`
 margin: 0 auto;
width: 80%;
height: 30px;
margin-top: 50px;
 display: flex;
 justify-content: space-around;
 border:  1px solid rgba(0, 0, 0, 0.192);
 border-left: none;
 border-right: none;
 font-family:Arial;
ul{  
  display: flex;
    li{  
     width: 150px;
     margin: 0 10%;
     height: 30px;
     display: flex;
     justify-content: center; 
     align-items: center;  
    }
}
`;
const InfoDesc = styled.textarea`
width: 99%; 
border: none;
border-radius: 4px;
font-size: 16px;
height: 600px;
`;

const NewImgBox = styled.div`
width: 100%;
height: auto;
text-align: center;
margin-top: 50px;
img{
  border: 1px solid black;
  padding: 10px;
  width: 150px;
  height: 150px;
}

`;
const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const UploadInput = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  display: inline-block;
  padding: 8px 12px;
  color: white;
  background-color: #adaaff;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
  
  &:hover {
    background-color: #00648b;
  }
`;

const GoodsOptionCss = styled.div`
    width: 35%;
    height: auto;
    @media (max-width: 768px) {
      width: 500px;
      margin: 0 auto;
        grid-area: option; 
    }
`;


const Seller = styled.div`
position: relative;
width: 100%;
height: 150px;
    display: flex;
border-bottom: 1px solid rgba(136, 136, 136, 0.673);
    /* justify-content: center; */
   align-items: center;
margin-top: 20px;
 
  
`;

const Seller1 = styled.div`

   width: 100%;
   height: 100%;
    display: flex;
    /* justify-content: center; */
   align-items: center;
   img{
    width: 100px;
   height: 100px;
   }
 
`;

const Seller2 = styled.div`

  width:100%;
    display: flex;
    position: relative; 
    flex-direction: column;
    /* justify-content: center; */
   align-items: center;
   padding: 10px;

`;
const Optionimage = styled.div`  
   img{
    border-radius: 50px;
    border: 1px solid #a5a5a5;
    width: 100px;
   height: 100px;
   margin-bottom: 40px;
   }
`;
const OptionNick = styled.div`
  position: absolute;
    padding: 10px;
  left: 0;
  top: -25px;
`;
const OptionCategory = styled.input`

width: 100%;
height: 20px;
border: ${(props) => (props.goodsCategory === null || props.goodsCategory.length === 0 ? '3px solid red' : '3px solid   #03bf81')};
`;

const OptionTitleEdit = styled.input`
font-size: 1.5em;
line-height: 1.2em;
padding-bottom: 20px;
 width:300px; 
border: ${(props) => (props.goodsTitle === null || props.goodsTitle.length === 0 ? '3px solid red' : '3px solid   #03bf81')};
`;
const Delivery = styled.div`
width: 100%;
height: auto;
position:relative;


`;
const OptionPrice = styled.input`
position: relative;
margin-top: 20px;
right:0;
font-size: 1.5em;
margin-right: 100px;
width: 100%;
height: 30px;
border: ${(props) => (props.goodsPrice === null || props.goodsPrice.length === 0 ? '3px solid red' : '3px solid   #03bf81')};
`;
const GoodsDeliveryFee = styled.input`
font-size: 1em;
margin-top: 15px;
width:100%;
height: 20px;
border: ${(props) => (props.goodsDeliveryFee === null || props.goodsDeliveryFee.length === 0 ? '3px solid red' : '3px solid  #03bf81')};

`;

const GoodsRefund = styled.input`
font-size: 1em;
margin-top: 15px;
width:100%;
height: 20px;
border: ${(props) => (props.goodsRefund === null || props.goodsRefund.length === 0 ? '3px solid red' : '3px solid  #03bf81')};

`;

const Option = styled.div`

width: 100%;
height: auto;
display: flex;
flex-direction: column;
align-items: center;
.option1 {
  width: 100%;
    height: auto;
    margin-top: 30px;
}
.sell{
    display: flex;
    justify-content: space-around;
    width: 60%;
    height   :80px ;
    margin: 0;
    .sell1-1 ,.sell1-2 {
        width: 110px;
        height:80px;
        margin: 10px;        
        border-radius: 10px;     
        background-color: #fbf3d8;
        display: flex;
        justify-content: center;
        align-items: center;

    }
}
.sell1-3{
        border-radius: 10px;
      width: 60%;
    height: 20px;
    background-color: #fbf3d8;
      display: flex;
      justify-content: center;
      align-items: center;      
      margin-top: 30px;
}
.sell1-4{
        border-radius: 10px;
      width: 60%;
    height: 50px;
    color: white;
    background-color: #03bf81;    
      display: flex;
      justify-content: center;
      align-items: center;
   margin-top: 10px;

}
.sell1-5{
  margin-top: 10px;

}
`;
export const GoodsWrite = () => {

  const [goodsCategory, setGoodsCategory] = useState(null);
  const [goodsDeliveryFee, setGoodsDeliveryFee] = useState("");
  const [goodsDesc, setGoodsDesc] = useState("");
  const [goodsPic, setGoodsPic] = useState("");
  const [goodsPrice, setGoodsPrice] = useState("");
  const [goodsRefund, setGoodsRefund] = useState("");
  const [goodsTitle, setGoodsTitle] = useState("");
  const [content2, setContent2] = useState([]);
  const nickName = localStorage.getItem("NickName");
  const UserImg = localStorage.getItem("UserImg");
  //상품 대표 이미지
  const [url, setUrl] = useState('');
  //상품 대표 이미지 변경시 사용
  const [mainUrl, setMainUrl] = useState("");
  //상품 대표 이미지 변경시 사용
  const [subUrl, setSubUrl] = useState([]);
  // 상품 정보를 가져옵니다.

  useEffect(() => {

  }, [subUrl]);
  const submit = async () => {
    const content = {
      goodsCategory,      // 카테고리
      goodsPic,        // 상품 사진    ,
      goodsDesc,        // 상품 설명
      goodsRefund,      // 상품 배송/환불/교환 안내
      goodsTitle,        // 상품 이름      
      goodsPrice,        // 상품 가격
      goodsDeliveryFee,  // 배달비
    }
    //대표 이미지 추가

    try {
      const response = await GoodsAxiosApi.insertGoods(content);
      //작성한 글의 PK를 가져옴
      const num = response.data;
      // 새로운 속성을 추가한 새로운 배열
      const updatedArray = content2.map(item => {
        return {
          ...item, // 기존의 객체 속성을 그대로 유지하면서
          goodsDetailId: num  // 새로운 속성을 추가합니다.
        };
      });

      if (response.status === 200) {
        const response3 = await OptionAxiosApi.insertOption(num, updatedArray);
        for (let i = 0; i < subUrl.length; i++) {
          //받은 PK에 사진을 저장
          const response2 = await PictureAxiosApi.insertGoodsImg(num, subUrl[i]);
        }


      }
    }
    catch (error) {
      // 네트워크 요청 중에 오류가 발생한 경우 에러 처리
      console.error("submit review 데이터에러 :", error);
      console.log(error)
    }
  }









  //파이어베이스 이미지 주소 받기
  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(selectedFile.name);
      await fileRef.put(selectedFile);
      console.log("File uploaded successfully!");
      const url = await fileRef.getDownloadURL();
      console.log("저장경로 확인 : " + url);
      setUrl(url);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };
  const MainImgChange = () => {
    setMainUrl(url)
    setGoodsPic(url)
    setUrl('')

  }
  const subImgAdd = () => {
    setSubUrl(prevState => [...prevState, url]);
    console.log(subUrl)
  }
  const deleteImg = (index) => {
    const updatedSubUrl = subUrl.filter((_, i) => i !== index);
    setSubUrl(updatedSubUrl);
  }
  return (
    <GoodsWriteCss>
      <GoodsInfoCss>
        <ImgCategory>
          <div className="ImgCategory1">
            <ImgBox url={mainUrl}>
              <div className="mainImg" >
                <img src={mainUrl} alt="대표 이미지" />
              </div>
            </ImgBox>
          </div>
          <div className="ImgCategory2">
            {subUrl && subUrl.map((url, index) => (
              <img key={index} src={url} alt={`Image ${index}`} onClick={() => { deleteImg(index) }} />
            ))}
          </div>
          <NewImgBox>
            <img src={url} alt="새 이미지" />
          </NewImgBox>
          <UploadContainer>
            <UploadLabel>
              파일 선택
              <UploadInput type="file" onChange={handleFileUpload} />
            </UploadLabel>
            <UploadLabel>
              대표 이미지로 저장
              <UploadInput type="button" onClick={MainImgChange} />
            </UploadLabel>
            <UploadLabel>
              상품 이미지로 저장
              <UploadInput type="button" onClick={subImgAdd} />
            </UploadLabel>
          </UploadContainer>


        </ImgCategory>
        <InfoCategory>
          <ul>
            <li>소개</li>
            <li>댓글</li>
            <li>판매자</li>
          </ul>
        </InfoCategory>
        <InfoBox goodsDesc={goodsDesc}>
          {/* 상품 정보 표시 */}
          <QuillText goodsDesc={goodsDesc} setGoodsDesc={setGoodsDesc}>

          </QuillText>


        </InfoBox>


      </GoodsInfoCss>

      <GoodsOptionCss>
        <OptionCategory goodsCategory={goodsCategory} type="text" value={goodsCategory} onChange={(e) => { setGoodsCategory(e.target.value) }} placeholder="카테고리 :">
        </OptionCategory>
        <Seller>
          <Seller1>
            <img src={UserImg}></img>
          </Seller1>
          <Seller2>
            <OptionNick>{nickName && nickName}</OptionNick>
            <OptionTitleEdit goodsTitle={goodsTitle} type="text" value={goodsTitle} onChange={(e) => { setGoodsTitle(e.target.value) }} placeholder="제목 :" />
          </Seller2>
        </Seller>
        <Delivery>
          <OptionPrice goodsPrice={goodsPrice} type="text" value={goodsPrice} onChange={(e) => { setGoodsPrice(e.target.value) }} placeholder=" 가격 :" />
          <GoodsDeliveryFee goodsDeliveryFee={goodsDeliveryFee} type="text" value={goodsDeliveryFee} onChange={(e) => { setGoodsDeliveryFee(e.target.value) }} placeholder=" 배송 :" />
          <GoodsRefund goodsRefund={goodsRefund} type="text" value={goodsRefund} onChange={(e) => { setGoodsRefund(e.target.value) }} placeholder=" 배송 시작 :" />

        </Delivery>

        <Option>
          <div className="option1">
            <OptionWriteBox setContent2={setContent2}></OptionWriteBox>
          </div>
          {
            (goodsCategory !== null &&
              goodsPic !== null &&
              goodsDesc !== null &&
              goodsRefund !== null &&
              goodsTitle !== null &&
              goodsPrice !== null &&
              goodsDeliveryFee !== null &&
              goodsCategory.length !== 0 &&
              goodsPic.length !== 0 &&
              goodsDesc.length !== 0 &&
              goodsRefund.length !== 0 &&
              goodsTitle.length !== 0 &&
              goodsPrice.length !== 0 &&
              goodsDeliveryFee.length !== 0) && (
              <div className="sell1-4" onClick={submit}>작성 완료</div>
            )
          }
        </Option>

      </GoodsOptionCss>
    </GoodsWriteCss>
  )
}



