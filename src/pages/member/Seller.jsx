import styled from "styled-components"

import { useEffect, useState } from "react";


const SalseListCss = styled.div`
width: 100%;
height: auto;
display: flex;
flex-direction: column;
 .info{
    margin: 0 auto;
    width: 80%;
height: 300px;
    display: flex;
flex-direction: row;
    .infoImg{
        width: 30%;
height: 300px;

    }
    .infoText{
        width: 70%;
height: 300px;

}
 }
 .list{
    margin: 0 auto;
    width: 80%;
height: auto;
    display: flex;
flex-direction: column;
    .listTitle{
        width: 100%;
height: auto;
    ul{
        display: flex;
flex-direction: row;

  .li1{
    display: flex;
flex-direction: row;
    justify-content: center;
 align-items: center;
    width: 200px;
    height: auto;
  }
  .title{
    width: 100%;
    height: 100%;
    display: flex;
flex-direction: row;
    justify-content: center;
  }
    }
    }
    .listContent{
        width: 100%;
height: auto;
margin-top: 10px;
    ul{  margin-top: 10px;
        display: flex;
flex-direction: row; 
border-radius: 20px;
height: 30px;
  border: 3px solid blue;

  align-items: center;

  .li1{
    display: flex;
flex-direction: row;
    justify-content: center;
 align-items: center;
    width: 200px;
    height: 50px;
  
  }
  .title{
    width: 100%;
  
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
    }
    }
 }
`;






export const Seller=()=>{
    const [isOpen,setIsOpen] = useState(false);
    const [content,setContent] = useState('');
    const closeModal = () => {
        setIsOpen(false);
        setContent(''); // Clear the content when closing the modal
      };
 useEffect(()=>{




 },[])
    const temporaryArray = [
        {
          id: 1,
          img: "이미지 주소",
          title: "제목",
          count: 10,
          price: 1000,
        },
        {
          id: 2,
          img: "이미지 주소",
          title: "제목2",
          count: 20,
          price: 2000,
        }];
    return(
        <SalseListCss>
        <div className="info">
        <div className="infoImg">
            </div>
            <div className="infoText">
            </div>
        </div>
        <div className="list">
        <div className="listTitle">
            <ul>
                <li className="no li1">등록번호</li>
                <li className="img li1">이미지</li>
                <li className="title ">제목</li>
                <li className="count li1">판매수</li>
                <li className="price li1">가격</li>
            </ul>
            </div>
            <div className="listContent">
        {temporaryArray.map((item) => (
          <div key={item.id} onClick={() => { setIsOpen(true); setContent(item.id) }}>
            <ul>
            <li className="no li1">{item.id}</li>
            <li className="img li1">{item.img}</li>
            <li className="title">{item.title}</li>
            <li className="count li1">{item.count}</li>
            <li className="price li1">{item.price}</li>
         
            </ul> 
            {/* <SalseModal isOpen={isOpen} closeModal={closeModal} content={content} /> */}
            
          </div>
        ))}      
            </div>
        </div>
    
        </SalseListCss>
    )
}