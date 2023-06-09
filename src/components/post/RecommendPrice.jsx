import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../common/color";
import { moneyFormat } from "../../common/money";
import { db } from "../../config/firebase";
import useUser from "../../hooks/useUser";

const RecommendPrice = ({ title, category }) => {
  const user = useUser();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minTitle, setMaxTitle] = useState("");
  const [maxTitle, setMinTitle] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const body = {
    title: title,
    category: category,
    uid: user.uid,
    recommendMaxPrice: parseInt(maxPrice),
    recommendMinPrice: parseInt(minPrice),
    isComplete: isComplete,
  };

  const sendRecommend = async () => {
    if (!title || !category) {
      alert("상품명과 카테고리를 입력하세요.");
      return;
    }
    // 가격 추천 시작
    setIsLoading(true); // 로딩 중
    try {
      const recommendPrice = db.collection("recommendPrice");
      await recommendPrice.add({ ...body });
      console.log("send success");

      // 15초 후에 문서 업데이트
      setTimeout(() => {
        const docRef = db
          .collection("recommendPrice")
          .where("title", "==", title)
          .where("category", "==", category)
          .where("uid", "==", user.uid)
          .limit(1);

        docRef.get().then((query) => {
          if (!query.empty) {
            updateFireStoreDoc(query.docs[0].id);
          }
        });
        setIsLoading(false); // 로딩 끝
      }, 15000);
    } catch (err) {
      console.log("sendRecommend err: ", err);
    }
  };

  // 파이어스토어의 문서가 업데이트 되면 다시 가져옴
  const updateFireStoreDoc = async (docId) => {
    const docRef = await db.collection("recommendPrice").doc(docId).get();
    try {
      if (!docRef.empty) {
        const data = docRef.data();
        setMinPrice(data.recommendMinPrice);
        setMaxPrice(data.recommendMaxPrice);
        setMinTitle(data.recommendMinTitle);
        setMaxTitle(data.recommendMaxTitle);
        setIsComplete(data.isComplete);
      }
    } catch (err) {
      console.log("updateFireStoreDoc err: ", err);
    }
  };

  const goOtherSite = () => {
    const siteURL = `https://m.bunjang.co.kr/search/products?q=${title}`;
    window.open(siteURL, "_blank");
  };
  return (
    <Container>
      <RecommendBox>
        <FandolBox>
          <FandolImg src="/img/fandol.png" />
          <FandolText>팬봇 추천</FandolText>
        </FandolBox>

        <TextBox>
          <Text>최소</Text>
          <Price>{moneyFormat(minPrice)}</Price>
        </TextBox>
        <Recommended>{minTitle}</Recommended>

        <TextBox>
          <Text>최대</Text>
          <Price>{moneyFormat(maxPrice)}</Price>
        </TextBox>
        <Recommended>{maxTitle}</Recommended>
      </RecommendBox>

      <RecommendBtn onClick={sendRecommend}>
        {isLoading ? "Loading..." : "가격 추천 받기"}
      </RecommendBtn>
      <OtherSiteBtn onClick={goOtherSite}>다른 사이트 둘러보기</OtherSiteBtn>
    </Container>
  );
};

export default RecommendPrice;

const Container = styled.div`
  margin-top: 40px;
`;

const RecommendBox = styled.div`
  border-radius: 15px;
  border: 3px solid ${colors.COLOR_MAIN};
  position: relative;
  // padding: 20px 0 15px;
  padding: 20px;
  width: 300px;
  box-sizing: border-box;
`;

const FandolBox = styled.div`
  background-color: white;
  position: absolute;
  top: -25px;
  left: 35px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 25px 0 10px;
`;

const FandolImg = styled.img`
  height: 100%;
  object-fit: contain;
`;

const FandolText = styled.p`
  color: ${colors.COLOR_MAIN};
  font-size: 20px;
  font-weight: bold;
  margin-left: 5px;
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  // margin: 15px 0;
  // background-color: orange;
`;

const Text = styled.span`
  color: ${colors.COLOR_MAIN};
  font-size: 14px;
  font-weight: bold;
  margin-right: 20px;
`;

const Recommended = styled.div`
  // background-color: orange;
  text-align: center;
  padding: 7px 0 5px;
  font-size: 12px;
  color: ${colors.COLOR_GRAY_TEXT};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 18px;
`;

const RecommendBtn = styled.div`
  border-radius: 8px;
  background-color: ${colors.COLOR_MAIN};
  height: 50px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  cursor: pointer;
`;

const OtherSiteBtn = styled.div`
  // border-radius: 8px;
  // background-color: ${colors.COLOR_BLUE_BUTTON};
  // height: 50px;
  // color: white;
  // font-weight: bold;
  // font-size: 18px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  font-size: 12px;
  margin-top: 10px;
  color: ${colors.COLOR_GRAY_TEXT};
  text-decoration: underline;
`;
