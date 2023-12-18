import { useEffect, useState } from "react";
import styled from "styled-components"
import { Buybox } from "./Buybox";




const OptionBoxCss = styled.div`
  width  :100% ;
  border:1px solid red;
  height: 500px;
  ul{
      width  :100% ;
  height: auto;
  li{
    width  :100% ;
  height:30px;
  border: 1px solid #7e7e7e;
  padding-left: 10px;
  display: flex;
  align-items: center;
  }
  }
`;

const Status = styled.div`
width: 100%;
height: 30px;
border: 1px solid blue;
margin-left:10px;
.btn1{ 
  width:30px;
height: 30px;
color: black;
margin: 0;
}
`
const OptionBoxCss1 = styled.div`
width: 100%;
height: auto;
border: 1px solid blue;
`;
const OptionBoxCss2 = styled.div`
width: 100%;
height: auto;
border: 1px solid yellow;
`;
const OptionNum = styled.div`
width: 100%;
height: 30px;
margin-top: 10px;
  border: 1px solid #7e7e7e;
  display: flex;
  align-items: center;
  padding-left: 10px;
`;
export const OptionBox = ({ list, list2 }) => {
  const [expandedOption, setExpandedOption] = useState(null);
  //수량
  const [quantity, setQuantity] = useState('1');
  //내가 선택한 옵션
  const [optionList, setOptionList] = useState([]);
  //list로 넘어온 옵션 리스트들을 종류별로 나눔
  const groupedOptions = {};
  console.log("list");
  console.log(list);

  list.forEach(option => {
    //옵션 goodsOptionNum(번호)에 해당하는 배열을 만듬
    if (!groupedOptions[option.goodsOptionNum]) {
      groupedOptions[option.goodsOptionNum] = [];
    }
    //옵션 goodsOptionNum(번호)에 맞게 넣음
    groupedOptions[option.goodsOptionNum].push(option);
  });


  //상위 목록만 누르면 key만 받고 하위 목록을 누르면 키와 key와selectedOption을 받음
  const OptionPick = (key, selectedOption) => {
    if (expandedOption === key) {
      //옵션 하위 목록 숨김
      setExpandedOption(null);
    } else {
      //옵션 (key)의 하위 목록 보여줌
      setExpandedOption(key);
    }
    //selectedOption을 받은 경우
    if (selectedOption) {

      setOptionList(prevState => {
        const updatedOptionList = prevState.filter(
          //동일한 값은 남고 다른 값은 지움        
          option => option.goodsOptionNum !== selectedOption.goodsOptionNum
        );
        //새로 선택한 옵션을 추가
        updatedOptionList.push(selectedOption);
        //setOptionList에 updatedOptionList를 넣음
        return updatedOptionList;
      });
    }

  };
  useEffect(() => {

  }, [])
  return (
    <OptionBoxCss>
      <Status>
        수 량:  {quantity}
        {quantity !== 0 &&
          <button className="btn1" onClick={() => { setQuantity(quantity - 1) }}>∨</button>
        }

        <button className="btn1" onClick={() => { setQuantity(quantity + 1) }}>∧</button>

      </Status>
      <OptionBoxCss1>
        {Object.keys(groupedOptions).map((key, index) => (

          <div key={index}>
            <h3 onClick={() => OptionPick(key)}>
              <OptionNum> {groupedOptions[key][0].goodsOptionNum} {optionList.find(option => option.goodsOptionNum === key)?.goodsOptionContent}
              </OptionNum>  </h3>
            {expandedOption === key && (
              <ul>
                {groupedOptions[key].map((option, i) => (
                  <li key={i} onClick={() => OptionPick(key, option)}>
                    {option.goodsOptionContent}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </OptionBoxCss1>
      <OptionBoxCss2>
        <Buybox list={list2} optionList={optionList} quantity1={quantity} />
      </OptionBoxCss2>
    </OptionBoxCss>
  );
};
