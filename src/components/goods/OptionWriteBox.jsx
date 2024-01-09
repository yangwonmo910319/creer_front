import { useState } from "react";
import { AnotherButton } from "../../css/common/AnotherButton";
import { OptionWriteBoxCss, Text, Count, Title } from "../../css/components/goods/OptionWriteBox";

export const OptionWriteBox = ({ setContent2 }) => {
  const [arrayCount, setArrayCount] = useState();
  const [arrays, setArrays] = useState([]);
  const [values, setValues] = useState([]);

  const content = [];
  const handleArrayCountChange = (count) => {
    setArrayCount(count);
    const newArrays = Array.from({ length: count }, () => "");
    setArrays(newArrays);
    const newValues = Array.from({ length: count }, () => []);
    setValues(newValues);
  };

  const handleArrayNameChange = (index, newName) => {
    setArrays((prevArrays) => {
      const newArrays = [...prevArrays];
      newArrays[index] = newName;
      return newArrays;
    });
    submit();
  };

  const handleAddValue = (arrayIndex) => {
    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[arrayIndex].push("");
      return newValues;
    });
    submit();
  };

  const handleValueChange = (arrayIndex, valueIndex, newValue) => {
    setValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[arrayIndex][valueIndex] = newValue;
      return newValues;
    });
    submit();
  };
  const submit = () => {
    for (let i = 0; i < arrays.length; i++) {
      for (let j = 0; j < values[i].length; j++) {
        const newDTOItem = {
          goodsOptionNum: arrays[i],
          goodsOptionContent: values[i][j],
        };
        content.push(newDTOItem);
      }
    }
    console.log(content);
    setContent2(content);
  };

  return (
    <OptionWriteBoxCss>
      <Count>
        옵션 수:
        <br />
        <input
          value={arrayCount}
          onChange={(e) => handleArrayCountChange(e.target.value)}
        />
        <div>{/* <button onClick={submit}>옵션 완료</button> */}</div>
      </Count>
      <br />
      <Title>
        {arrays.map((array, arrayIndex) => (
          <div key={arrayIndex} className="optionTitle">
            <div className="optionTitle1">
              제목  (사이즈,색)

              <AnotherButton width={"120px"} value={'상세 옵션'} onClick={() => handleAddValue(arrayIndex)}></AnotherButton>

            </div>

            <input className="numInput"
              value={array}
              onChange={(e) =>
                handleArrayNameChange(arrayIndex, e.target.value)

              }
            />
            <Text>
              {values[arrayIndex].map((value, valueIndex) => (
                <>
                  <input
                    className="valueInput"
                    key={valueIndex}
                    value={value}
                    placeholder="상세 옵션"
                    onChange={(e) =>
                      handleValueChange(arrayIndex, valueIndex, e.target.value)
                    }
                  />
                </>
              ))}
            </Text>
          </div>
        ))}
      </Title>
    </OptionWriteBoxCss>
  );
};
