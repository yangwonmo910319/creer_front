import { useEffect, useState } from "react";
import { Buybox } from "./Buybox";
import { AnotherButton } from "../../css/common/AnotherButton";
import { OptionBoxCss2, OptionBoxCss, OptionNum, Status, OptionBoxCss1, OptionContent, Check } from "../../css/components/goods/OptionBox";
export const OptionBox = ({ list, list2 }) => {
  const [expandedOption, setExpandedOption] = useState(null);
  //수량
  const [quantity, setQuantity] = useState(1);
  //내가 선택한 옵션
  const [optionList, setOptionList] = useState([]);
  const [check, setCheck] = useState('');
  //list로 넘어온 옵션 리스트들을 종류별로 나눔
  const groupedOptions = {};

  useEffect(() => {
    const combinedOptions = optionList.map((option) => option.goodsOptionContent + " , ").join(' ');
    setCheck(` ${combinedOptions}  ${quantity}개`);
  }, [quantity, optionList])

  if (list !== null && Array.isArray(list)) {
    list.forEach((option) => {
      if (!groupedOptions[option.goodsOptionNum]) {
        groupedOptions[option.goodsOptionNum] = [];
      }
      groupedOptions[option.goodsOptionNum].push(option);
    });
  } else {
    console.error("list is not a valid array");
  }
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
      setOptionList((prevState) => {
        const updatedOptionList = prevState.filter(
          //동일한 값은 남고 다른 값은 지움
          (option) => option.goodsOptionNum !== selectedOption.goodsOptionNum
        );
        //새로 선택한 옵션을 추가
        updatedOptionList.push(selectedOption);
        //setOptionList에 updatedOptionList를 넣음
        return updatedOptionList;
      });
    }
  };
  const up = () => {
    setQuantity(quantity + 1);
  }
  const down = () => {
    setQuantity(quantity - 1);
  }
  return (
    <OptionBoxCss>
      <Status>
        <div className="quantity">
          수 량: {quantity}
        </div>
        <div className="btn">
          <AnotherButton
            width={"40px"} height={"40px"} value={"∧"} onClick={up}
          ></AnotherButton>
          {quantity !== 0 && (
            <AnotherButton
              width={"40px"} height={"40px"} value={"∨"} onClick={down}
            ></AnotherButton>
          )}
        </div>
      </Status>
      <OptionBoxCss1>
        {Object.keys(groupedOptions).map((key, index) => (
          <div key={index}>
            <h3 onClick={() => OptionPick(key)}>
              <OptionNum>
                {groupedOptions[key][0].goodsOptionNum}{" "}
                {
                  optionList.find((option) => option.goodsOptionNum === key)
                    ?.goodsOptionContent
                }
              </OptionNum>
            </h3>
            <OptionContent>
              {expandedOption === key && (
                <ul>
                  {groupedOptions[key].map((option, i) => (
                    <li key={i} onClick={() => OptionPick(key, option)}>
                      {option.goodsOptionContent}
                    </li>
                  ))}
                </ul>
              )}       </OptionContent>

          </div>

        ))}
        <Check>{check &&
          <>
            <div className="check1">{optionList.length === 0 ? <>기본</> : <></>}{check}</div>
            <div className="check2">  {list2.goodsPrice}원</div>
            <div className="check3">  {list2.goodsPrice * quantity}원</div>
          </>
        }
        </Check>
      </OptionBoxCss1>

      <OptionBoxCss2>
        <Buybox list={list2} optionList={optionList} quantity1={quantity} />
      </OptionBoxCss2>
    </OptionBoxCss>
  );
};
