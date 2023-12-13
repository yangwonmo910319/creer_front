import { useEffect, useState } from "react"
import {GoodsAxiosApi} from "../../api/goods/GoodsAxiosApi"
import styled from "styled-components";


const SelectImgCss = styled.div`
    width: 100%;
    height: 100%;
    background: red;
    display: flex;
    flex-direction: column;
    justify-content: center;
    img{
        width: 150px;
    height: 150px;
    }
`;




export const SelectImg = ({ num }) => {   

    const [urls, setUrls] = useState([]);
    useEffect(() => {
      const selectImg = async () => {         
        try {
          const response = await GoodsAxiosApi.selectGoodsImg(num);
          if (response.status === 200) {
            console.log(response.data);
            setUrls(response.data); // 이미지 URL 배열 설정
          } else {
            console.error("서버 응답 실패");
          }
        } catch (error) {
          console.error("submit review 데이터에러 :", error);
        }
      };
      selectImg();
    }, []);
  
    return (
      <SelectImgCss>
        {urls&&urls.map((urlObj, index) => (
          <div key={index}>
            <img src={urlObj.goodsPictures} alt={`Image ${index}`} />
          </div>
        ))}
      </SelectImgCss>
    );
  };