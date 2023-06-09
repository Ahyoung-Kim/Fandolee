import React, { useEffect } from "react";

import "./App.css";
import { Reset } from "styled-reset";
import styled from "styled-components";
import { colors } from "./common/color";

// firestore 데이터 베이스
import { db } from "./config/firebase";
import { Route, Routes } from "react-router-dom";

// components
import AuctionBiddingPage from "./pages/AuctionBiddingPage";
import Header from "./components/header/Header";
import Footer, { footerHeight } from "./components/footer/Footer";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MainLayout from "./layouts/MainLayout";
import SubLayout from "./layouts/SubLayout";
import ProfilePage from "./pages/ProfilePage";
import AuctionListPage from "./pages/AuctionListPage";
import AuctionUpPage from "./pages/AuctionUpPage";
import UserPage from "./pages/UserPage";
import MyPage from "./pages/MyPage";
import { MyTab } from "./constants/mypage";
import ProfileContainer from "./components/mypage/profile/ProfileContainer";
import ExchangeListPage from "./pages/ExchangeListPage";
import LikeContainer from "./components/mypage/like/LikeContainer";
import ChattingList from "./components/mypage/chat/ChattingList";
import TransactionList from "./components/mypage/transaction/TransactionList";
import AuctionPostPage from "./pages/AuctionPostPage";
import AuctionDetailPage from "./pages/AuctionDetailPage";
import ExchangePostPage from "./pages/ExchangePostPage";
import AuctionChattingPage from "./pages/AuctionChattingPage";
import AuctionModifyPage from "./pages/AuctionModifyPage";
import ExchangeDetailPage from "./pages/ExchangeDetailpage";
import ExchangeModifyPage from "./pages/ExchangeModifyPage";
import AuctionTransactionPage from "./pages/AuctionTransactionPage";
import ExchangeTransactionPage from "./pages/ExchangeTransactionPage";
import ExchangeTransactionListPage from "./pages/ExchangeTransactionListPage";
import TransactionDetail from "./components/mypage/transaction/TransactionDetail";
import ExTransactionDetail from "./components/mypage/transaction/ExTransactionDetail";

const App = () => {
  return (
    <RootLayout className="root-styles">
      {/* 스타일 리셋 */}
      <Reset />

      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* 메인 홈 페이지 */}
          <Route path="" element={<MainPage />} />
          {/* 프로필 페이지 - not used */}
          <Route path="profile/:uid" element={<ProfilePage />} />
          {/* 유저 페이지 */}
          <Route path="user/:uid" element={<UserPage />} />
          {/* 마이 페이지 */}
          <Route path="mypage/:uid" element={<MyPage />}>
            <Route path={MyTab[0].tab} element={<ProfileContainer />} />
            <Route path={MyTab[1].tab} element={<ChattingList />} />
            <Route path={MyTab[2].tab} element={<LikeContainer />} />
            <Route path={MyTab[3].tab} element={<TransactionList />} />
            <Route
              path={`${MyTab[3].tab}/:id`}
              element={<TransactionDetail />}
            />
            <Route
              path={`${MyTab[3].tab}/exchange/:id`}
              element={<ExTransactionDetail />}
            />
          </Route>
        </Route>

        <Route path="/user" element={<SubLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>

        <Route path="/auction" element={<MainLayout />}>
          {/*경매 게시글 게시 페이지*/}
          <Route path="auctionUp" element={<AuctionUpPage />} />
          {/*경매 게시글 나열 페이지*/}
          <Route path="list" element={<AuctionListPage />} />
          {/*경매 게시글 상세 페이지*/}
          <Route path="auctiondetail/:id" element={<AuctionDetailPage />} />
          {/*경매 게시글 수정 페이지*/}
          <Route
            path="auctiondetail/:id/modify"
            element={<AuctionModifyPage />}
          />
          {/*경매 투찰 임시 페이지 */}
          <Route path="auctionbidding/:id" element={<AuctionBiddingPage />} />
          {/* 경매 게시글 업로드 페이지 */}
          <Route path="post" element={<AuctionPostPage />} />
          {/* 경매 채팅 페이지 */}
          <Route path=":id/chat" element={<AuctionChattingPage />} />
        </Route>

        <Route path="/exchange" element={<MainLayout />}>
          {/* 교환 목록 페이지 */}
          <Route path="list" element={<ExchangeListPage />} />
          {/* 교환 업로드 페이지 */}
          <Route path="post" element={<ExchangePostPage />} />
          {/* 교환 상세 페이지 */}
          <Route path="exchangedetail/:id" element={<ExchangeDetailPage />} />
          <Route
            path="exchangedetail/:id/modify"
            element={<ExchangeModifyPage />}
          />
        </Route>

        {/* 거래 채팅 */}
        <Route path="/transaction" element={<MainLayout />}>
          {/*경매 exchange/productId */}
          <Route path="auction/:id" element={<AuctionTransactionPage />} />
          {/* 교환 */}
          {/* exchange/productId/uid(글 보는 사람) */}
          <Route
            path="exchange/:productId/:id"
            element={<ExchangeTransactionPage />}
          />
          {/* 글 올린사람 입장: 교환 채팅 목록*/}
          {/* exchange/productId/list (글 올린 사람) */}
          <Route
            path="exchange/:id/list"
            element={<ExchangeTransactionListPage />}
          />
        </Route>
      </Routes>

      {/* footer */}
      <Footer />
    </RootLayout>
  );
};

export default App;

const RootLayout = styled.div`
  background-color: ${colors.COLOR_MAIN_BACKGROUND};
  padding-bottom: ${footerHeight};
  min-height: calc(100vh - ${footerHeight});
  position: relative;
  min-width: 800px;
`;
