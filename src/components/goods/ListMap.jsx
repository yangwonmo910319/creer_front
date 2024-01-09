import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { storage } from "../../api/FireBase";
import { Link } from "react-router-dom";
import { ListMapCss, List, Class1, Class1img, ClassNick, ClassCategory, ClassTitle, Class1Memberimg, ClassPeice } from '../../css/components/goods/ListMap';

export const ListMap = ({ list, status }) => {
  // 현재 시간을 가져옵니다.
  const currentDate = new Date();

  return (
    <ListMapCss>
      <List>
        <ul>
          {list &&
            list.map((item, index) => {
              if (status === 'sale') {
                return (
                  <li key={index}>
                    <Link className="" to={`/Goods/${item.goodsDetailId}`}>
                      <Class1>
                        <ClassCategory>{item.goodsCategory}</ClassCategory>
                        <Class1img>
                          <img src={item.goodsPic} alt={item.goodsPic} />
                        </Class1img>
                        <ClassTitle>{item.goodsTitle}</ClassTitle>
                        <ClassPeice>{item.goodsPrice}원</ClassPeice>
                        <div className="member">
                          <Class1Memberimg>
                            <img src={item.memberDto.image} alt={""} />
                          </Class1Memberimg>
                          <ClassNick>{item.memberDto && item.memberDto.nickName}</ClassNick>
                        </div>
                      </Class1>
                    </Link>
                  </li>
                );
              }

              if (currentDate < new Date(item.auctionDate)) {
                return (
                  <li key={index}>
                    <Link className="" to={`/Auction/${item.goodsDetailId}`}>
                      <Class1>
                        <ClassCategory>{item.goodsCategory}</ClassCategory>
                        <Class1img>
                          <img src={item.goodsPic} alt={item.goodsPic} />
                        </Class1img>
                        <ClassTitle>{item.goodsTitle}</ClassTitle>
                        <ClassPeice style={{ fontSize: "18px" }}>
                          {new Date(item.auctionDate).toLocaleString('ko-KR', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </ClassPeice>
                        <div className="member">
                          <Class1Memberimg>
                            <img src={item.memberDto.image} alt={""} />
                          </Class1Memberimg>
                          <ClassNick>{item.memberDto && item.memberDto.nickName}</ClassNick>
                        </div>
                      </Class1>
                    </Link>
                  </li>
                );
              }

              return null;
            })
          }
        </ul>
      </List>
    </ListMapCss>
  );
};