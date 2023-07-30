import { Link } from "react-router-dom";
import Buy from "../assets/Buy.png";
import inspector from "../assets/inspect.png";
import Insurance from "../assets/Insurance.png";
import Community from "../assets/Gallery.png";
import MyCar from "../assets/MyCar.png";
import Repair from "../assets/repairimg.png";
import ChangeKey from "../assets/ChangeKey.png";
import Sell from "../assets/Sell.png";
import Nav2 from "../components/Nav2";
import { TokenStorage } from "./../hooks/TokenStorage";
import {
  StyleMyPageContainer,
  StyleMyPageDiv,
  StyleMypageCardImg,
  StyleMypageCards,
} from "../style/mypage/MyPageStyle";
import { memo } from "react";
const tokenStorage = new TokenStorage();
const localStorageData = tokenStorage.getToken();
const cardInfo = [
  {
    path: "/user/mypage/mycarinfo",
    imgSrc: MyCar,
    alt: "MyCarInfo",
    text: "내 차 정보",
  },
  {
    path: "/user/mypage/repair",
    imgSrc: Repair,
    alt: "RepairInspector",
    text: "정비 내역",
  },
  {
    path: "/user/mypage/inspector",
    imgSrc: inspector,
    alt: "inspector",
    text: "검수 내역",
  },
  {
    path: "/user/mypage/community",
    imgSrc: Community,
    alt: "Community",
    text: "내가 쓴 글",
  },
  {
    path: "/user/mypage/buycontent",
    imgSrc: Buy,
    alt: "Buy",
    text: "구매 목록",
  },
  {
    path: "/user/mypage/sellcontent",
    imgSrc: Sell,
    alt: "Sell",
    text: "판매 목록",
  },
  {
    path: "/user/mypage/insurance",
    imgSrc: Insurance,
    alt: "Damage",
    text: "손상 내역",
  },
  {
    path:
      localStorageData?.userType === 0
        ? "/user/mypage/userpasswordmodify"
        : "/user/mypage/companypasswordmodify",
    imgSrc: ChangeKey,
    alt: "ChangeKey",
    text:
      localStorageData?.userType === 0
        ? "비밀번호 변경(유저)"
        : "비밀번호 변경(기업)",
  },
];

export interface CardType {
  card: {
    path: string;
    imgSrc: any;
    alt: string;
    text: string;
  };
}

const Card = memo(({ card }: CardType) => (
  <StyleMypageCards>
    <Link to={card.path}>
      <StyleMypageCardImg>
        <img src={card.imgSrc} alt={card.alt} />
      </StyleMypageCardImg>
      <p>{card.text}</p>
    </Link>
  </StyleMypageCards>
));

const MyPage = () => {
  return (
    <div>
      <Nav2 />
      <StyleMyPageContainer>
        <StyleMyPageDiv>
          {cardInfo.map((card, index) => (
            <Card key={index} card={card} />
          ))}
        </StyleMyPageDiv>
      </StyleMyPageContainer>
    </div>
  );
};

export default memo(MyPage);
