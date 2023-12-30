import React, { useState, useEffect } from "react";
import styled from "styled-components";


const TimeCss=styled.div`
  font-size: 1.2em;
  input{
    margin: 5px;
  }
`

export const TimeModal = ({modaOpen,setAuctionTime}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [remainingTime, setRemainingTime] = useState(0);
  const [modalOpen,setModalOpen] = useState(true);
  useEffect(()=>{

    setModalOpen(modaOpen)
  },[modaOpen])

  const handleDateChange = (event) => {
    setDate(event.target.value);
    console.log(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
    console.log(event.target.value);
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const setAlarm = () => {
    const currentTime = new Date();
    const selectedDateTime = new Date(date + 'T' + time);
    const isoDateTimeString = selectedDateTime.toISOString();

    setAuctionTime(isoDateTimeString)
    const timeDifference = selectedDateTime.getTime() - currentTime.getTime();

    setRemainingTime(timeDifference);
  
    setTimeout(() => {
      alert('첫 번째 알람 시간입니다!');
      setRemainingTime(0);         
    }, timeDifference);
  
    // setTimeout(() => {
    //   alert('첫 번째 알람이 종료되었습니다.');
    // }, timeDifference + 60000); // 첫 번째 알람 시간에서 1분 추가
  

  
  };
 
  useEffect(() => {
    let countdownInterval;
    
    if (remainingTime > 0) {
      countdownInterval = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1000);
      }, 1000);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [remainingTime]);

  const remainingSeconds = remainingTime / 1000;


  const barStyle = {
    width: '100%',
    height: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    overflow: 'hidden',
  };

  const fillStyle = {
    height: '100%',
    backgroundColor: '#7fc6a4',
    width: `${((remainingSeconds % 60) / 60) * 100}%`,
    transition: 'width 1s linear',
  };
  return (
    <TimeCss>
            {modalOpen  === true&&  
    <div>
    {/* (YYYY-MM-DD) */}
      <label>경매 날짜를 입력하세요 : </label>
      <br></br>
      <input
        type="date"
        value={date}
        onChange={handleDateChange}
      />
      <br />
      <label>시간을 입력하세요: </label>
      <br></br>
      <input
        type="time"
        value={time}
        onChange={handleTimeChange}
      />
      <br />
      <button onClick={setAlarm}>알람 설정</button>
      {remainingTime > 0 && (
        <div>
          <p>
            경매 까지 남은 시간: {formatTime(Math.floor(remainingSeconds / 3600))}시간{' '}
            {formatTime(Math.floor((remainingSeconds % 3600) / 60))}분{' '}
            {formatTime(Math.floor(remainingSeconds % 60))}초
          </p>
          <div style={barStyle}>
            <div style={fillStyle}></div>
          </div>
        </div>
      )}
    </div>
}</TimeCss>
  );
};