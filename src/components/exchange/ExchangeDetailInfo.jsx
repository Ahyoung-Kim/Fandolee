import React from "react";

import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";

import { colors } from "../../common/color";
import { moneyFormat } from "../../common/money";

import GreenLine from "../common/GreenLine";
import { useState } from "react";
import Tag from "../common/Tag";
import { useNavigate } from "react-router-dom";

const AuctionDetailInfo = ({ product }) => {
  const navigate = useNavigate();
  const [isLike, setIsLike] = useState(false);
  const {
    image,
    title,
    category,
    idol,
    haveMember,
    wantMember,
    info,
    id,
    uid,
    likes,
    isComplete,
    region,
    transactionType
  } = product;

  return (
    <Container>
      <Image src={image} />

      <SubContainer>
        <InfoDiv>
          <Title>{title}</Title>


          <GreenLine />

          <TagsDiv>
            <Tag label="굿즈 종류" text={category} />

            {idol ? <Tag label="아이돌" text={idol} /> : null}
            {haveMember ? <Tag label="보유 멤버" text={haveMember} /> : null}
            {wantMember ? <Tag label="교환 멤버" text={wantMember} /> : null}
            {region ? <Tag label="지역" text={region} /> : null}
            {transactionType ? <Tag label="교환방법" text={transactionType} /> : null}
            {info ?  <Tag label="설명" text={info} /> : null}
          </TagsDiv>
        </InfoDiv>

        
      </SubContainer>
    </Container>
  );
};

export default AuctionDetailInfo;

const Container = styled.div`
  padding: 15px;
  border-radius: 10px;
  border: 3px solid ${colors.COLOR_MAIN};
  width: max-content;
  margin: 50px auto;
  display: flex;
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
  obejct-fit: cover;
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
`;

const InfoDiv = styled.div``;

const Title = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 15px;
  margin-top: 10px;
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
  fontSize: "28px",
  cursor: "pointer",
};
