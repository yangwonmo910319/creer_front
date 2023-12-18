import { useEffect, useState } from "react";
import styled from "styled-components"
import { Buybox } from "./Buybox";




const OptionWriteBoxCss = styled.div`
  width  :100% ;
  height: 500px;
  border:1px solid pink;
  .valueInput{
   width:80%;
  }
 `;


const OptionBoxCss1 = styled.div`
width: 100%;
height: auto;
`;
const OptionBoxCss2 = styled.div`
width: 100%;
height: auto;
`;

export const OptionWriteBox = ({ setContent2 }) => {
  const [arrayCount, setArrayCount] = useState(0);
  const [arrays, setArrays] = useState([]);
  const [values, setValues] = useState([]);
  const content = [];
  const handleArrayCountChange = (count) => {
    setArrayCount(count);
    const newArrays = Array.from({ length: count }, () => '');
    setArrays(newArrays);
    const newValues = Array.from({ length: count }, () => []);
    setValues(newValues);
  };

  const handleArrayNameChange = (index, newName) => {
    setArrays(prevArrays => {
      const newArrays = [...prevArrays];
      newArrays[index] = newName;
      return newArrays;
    });
  };

  const handleAddValue = (arrayIndex) => {
    setValues(prevValues => {
      const newValues = [...prevValues];
      newValues[arrayIndex].push('');
      return newValues;
    });
  };

  const handleValueChange = (arrayIndex, valueIndex, newValue) => {
    setValues(prevValues => {
      const newValues = [...prevValues];
      newValues[arrayIndex][valueIndex] = newValue;
      return newValues;
    });
  };
  const submit = () => {

    for (let i = 0; i < arrays.length; i++) {
      for (let j = 0; j < values[i].length; j++) {
        const newDTOItem = { goodsOptionNum: arrays[i], goodsOptionContent: values[i][j] };
        content.push(newDTOItem);
      }
    }
    console.log(content);
    setContent2(content)
  };

  return (
    <OptionWriteBoxCss>
      <div>
        옵션 수: <input value={arrayCount} onChange={(e) => handleArrayCountChange(e.target.value)} />
      </div>
      <div>
        {arrays.map((array, arrayIndex) => (
          <div key={arrayIndex}>
            옵션 제목 <input
              value={array}
              onChange={(e) => handleArrayNameChange(arrayIndex, e.target.value)}
            />옵션 내용
            {values[arrayIndex].map((value, valueIndex) => (
              <input className="valueInput"
                key={valueIndex}
                value={value}
                onChange={(e) => handleValueChange(arrayIndex, valueIndex, e.target.value)}
              />
            ))}
            <button onClick={() => handleAddValue(arrayIndex)}>내용 추가</button>
          </div>
        ))}
      </div>
      <div>
        배열: {JSON.stringify(values)}
        배열: {JSON.stringify(arrays)}
        <button onClick={submit}>완료</button>
      </div>
    </OptionWriteBoxCss>
  );
};