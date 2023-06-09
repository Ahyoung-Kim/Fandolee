import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faGear, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';

import { colors } from '../../common/color';
import { moneyFormat } from '../../common/money';

import { useEffect } from 'react';
import GreenLine from '../common/GreenLine';
import { useState } from 'react';
import Tag from '../common/Tag';
import { remainDate, timestampToDateFormat } from '../../common/date';
import { db, realTimeDatabase } from '../../config/firebase';
import useUser from '../../hooks/useUser';
import UserHeart from '../user/UserHeart';

const AuctionDetailInfo = ({ product }) => {
  const navigate = useNavigate();
  const user = useUser();
  const {
    images,
    title,
    maxPrice,
    minPrice,
    category,
    idol,
    member,
    info,
    id,
    uid,
    likes,
    isComplete,
    endDate,
    date,
    biddingDate,
    biddingPrice,
  } = product;
  const _remainDate = remainDate(endDate);
  const [complete, setComplete] = useState(0);

  const goAuctionChatting = () => {
    if(user){
      navigate(`/auction/${id}/chat`);
    }else{
      alert('로그인이 필요합니다.');
    }
    
  };

  const onDelete = async () => {
    if (!window.confirm('해당 게시글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      const productDB = db.collection('product');
      const chatRef = realTimeDatabase.ref(`biddingChatRoom/${product.id}`);

      await productDB.doc(id).delete();
      await chatRef.remove();

      navigate(-1);
    } catch (err) {
      console.log('delete product error: ', err);
    }
  };

  const onUpdate = async () => {
    navigate('./modify', { product });
  };

  useEffect(() => {
    if (_remainDate < 0) {
      const productRef = db.collection('product').doc(id);
      if (!isComplete) {
        productRef.update({ isComplete: 1 });
        setComplete(1);
      } else setComplete(1);
    }
  }, []);
  return (
    <Container>
      <EndDateDiv>
        {_remainDate < 0 || complete || isComplete ? (
          <EndDateText>경매가 종료된 상품입니다.</EndDateText>
        ) : (
          <EndDateText>
            낙찰까지{' '}
            <span style={{ color: colors.COLOR_RED_TEXT }}>
              {_remainDate}일
            </span>{' '}
            남았습니다.
          </EndDateText>
        )}

        <EndDateBox>낙찰 예정일 {timestampToDateFormat(endDate)}</EndDateBox>
      </EndDateDiv>

      <Image src={images[0]} />

      <SubContainer>
        {user && uid === user.uid && !isComplete && (
          <IconDiv>
            <Icon onClick={onUpdate}>
              <FontAwesomeIcon icon={faGear} />
            </Icon>
            <Icon onClick={onDelete}>
              <FontAwesomeIcon icon={faTrash} />
            </Icon>
          </IconDiv>
        )}

        <InfoDiv>
          <Title>{title}</Title>

          <Price>
            {moneyFormat(minPrice)} ~ {moneyFormat(maxPrice)} 원
          </Price>

          <GreenLine />

          <TagsDiv>
            <Tag label="굿즈 종류" text={category} />

            {idol ? <Tag label="아이돌" text={idol} /> : null}

            {member ? <Tag label="멤버" text={member} /> : null}
          </TagsDiv>
        </InfoDiv>

        <BtnDiv>
          {/* <Btn onClick={() => navigate(`/auction/auctionbidding/${dataID}`)}> */}
          
          { (complete || isComplete )? (
            <EndBtn onClick={goAuctionChatting}>경매 종료</EndBtn>
          ) : (
            <Btn onClick={goAuctionChatting}>경매 참여</Btn>
          )}
          
          <HeartDiv>
            <UserHeart product={product} HeartNumber={true} />
          </HeartDiv>
        </BtnDiv>
      </SubContainer>

      <UploadDate>게시일: {timestampToDateFormat(date)}</UploadDate>
    </Container>
  );
};

export default AuctionDetailInfo;

const Container = styled.div`
  padding: 15px;
  border-radius: 10px;
  border: 3px solid ${colors.COLOR_MAIN};
  width: max-content;
  margin: 80px auto 50px;
  display: flex;
  position: relative;
`;

const UploadDate = styled.div`
  font-size: 10px;
  color: ${colors.COLOR_DARKGRAY_TEXT};
  width: 100%;
  display: flex;
  justify-content: flex-end;
  line-height: 35px;
  position: absolute;
  left: 0;
  bottom: -35px;
`;

const EndDateDiv = styled.div`
  position: absolute;
  left: 0;
  top: -40px;
  width: 100%;
  //   background-color: orange;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const EndDateText = styled.div`
  font-size: 12px;
  font-weight: bold;
`;

const EndDateBox = styled.div`
  background-color: ${colors.COLOR_RED_BACKGROUND};
  color: white;
  font-weight: bold;
  padding: 0 15px;
  border-radius: 5px;
  font-size: 14px;
  line-height: 30px;
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 7px;
  display: inline-block;
`;

const SubContainer = styled.div`
  width: 500px;
  margin-left: 20px;
  //   background-color: orange;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const IconDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  //   background-color: orange;
  font-size: 18px;
`;

const Icon = styled.div`
  margin-left: 10px;
  cursor: pointer;
  color: ${colors.COLOR_DARKGRAY_BACKGROUND};
  transition: 0.4s;

  &:hover {
    color: #333;
  }
`;

const InfoDiv = styled.div``;

const Title = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 15px;
  margin-top: 10px;
  //   background-color: orange;
`;

const Price = styled.p`
  font-weight: bold;
  font-size: 26px;
  color: ${colors.COLOR_MAIN};
  margin-bottom: 15px;
`;

const TagsDiv = styled.div`
  margin-top: 7.5px;
`;

const BtnDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Btn = styled.div`
  width: 88%;
  background-color: ${colors.COLOR_MAIN};
  line-height: 45px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  text-align: center;
  border-radius: 7px;
`;

const EndBtn = styled.div`
  width: 88%;
  background-color: ${colors.COLOR_DARKGRAY_BACKGROUND};
  line-height: 45px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  text-align: center;
  border-radius: 7px;
`;

const HeartDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  //   background-color: white;
  height: 100%;
  width: 12%;
`;

const Likes = styled.p`
  color: ${colors.COLOR_HEART};
  font-size: 12px;
`;

const heartStyle = {
  color: colors.COLOR_HEART,
  fontSize: '28px',
  cursor: 'pointer',
};
