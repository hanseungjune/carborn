/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import carBackground from "../assets/carBackground2.jpg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/Logo.png";
import { LOGOUT_REQUEST } from "../modules/LoginSubmitGlobal";
import { container } from "../style/mypage/MyPageStyle";
import { useMemo, useEffect, useState, useCallback } from "react";
import { TokenStorage } from "../hooks/TokenStorage";

const PAGE_TITLES: { [key: string]: string } = {
  "/": "Car-Born Home",
  "/login": "Login",
  "/myvehicle/registration": "Car Registration",
  "/user/mypage": "MyPage",
  "/user/mypage/mycarinfo": "MyCarInfo",
  "/user/mypage/repair": "MyRepairHistory",
  "/user/mypage/buycontent": "MyPurchaseHistory",
  "/user/mypage/sellcontent": "MySalesHistory",
  "/user/mypage/inspector": "MyInspectorHistory",
  "/user/mypage/insurance": "MyInsuranceHistory",
  "/getagreement": "TermsofUse",
  "/signup": "SignUp",
  "/searchid": "SearchID",
  "/searchid/searchidcomplete": "SearchID Complete",
  "/passwordresetcheck": "SearchPassword",
  "/passwordresetcheck/passwordreset": "ResetPassword",
  "/passwordresetcheck/passwordreset/passwordcomplete": "Reset Complete",
  "/user/mypage/community": "MyPostsHistory",
  "/user/mypage/userpasswordmodify": "ResetPassword",
  "/user/community": "Community",
  "/user/car/list": "CarList",
  "/user/car/sale": "CarSaleRegister",
  "/user/car": "MyCarRegister",
  "/user/community/write": "NewArticleWrite",
  "/user/self-repair": "CheckList",
};

const DYNAMIC_PAGE_TITLES = [
  { path: "/user/mypage/mycarinfo/:carId/detail", title: "MyCarInfo" },
  {
    path: "/user/mypage/repair/:resultId/completedetail",
    title: "MyRepairDetail",
  },
  {
    path: "/user/mypage/repair/:bookId/bookdetail",
    title: "MyRepairReserve",
  },
  {
    path: "/user/mypage/inspector/:resultId/completedetail",
    title: "MyInspectorDetail",
  },
  {
    path: "/user/mypage/inspector/:bookId/bookdetail",
    title: "MyInspectorReserve",
  },
  {
    path: "/user/mypage/insurance/:resultId/completedetail",
    title: "MyInsuranceDetail",
  },
  { path: "/user/car/:carId/:id", title: "DetailCarInfo" },
  { path: "/user/mypage/mycarinfo/:carId/detail", title: "CarDetail" },
];

export default function Nav2(msg: any) {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isHome = location.pathname === "/";
  const isMap = location.pathname === "/user/map";

  const section2 = css`
    width: ${isHome || isMap ? "100%" : "80%"};
    height: 45vh;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.8);
    background-image: ${!isHome && !isMap ? `url(${carBackground})` : ""};
    position: relative;
  `;

  useEffect(() => {
    let title = PAGE_TITLES[location.pathname] || null;

    if (!title) {
      for (const { path, title: pageTitle } of DYNAMIC_PAGE_TITLES) {
        const regex = new RegExp(
          `^${path.replace(/:[^\s/]+/g, "([\\w-]+)")}$`,
          "g"
        );
        const match = location.pathname.match(regex);
        if (match) {
          title = pageTitle;
          break;
        }
      }
    }

    setTitle(title || "Unknown Page");
  }, [location.pathname, setTitle]);

  // 리팩토링
  const tokenStorage = useMemo(() => new TokenStorage(), []);
  const localStorageData = useMemo(() => tokenStorage.getToken(), [tokenStorage]);
  const [token, setToken] = useState(localStorageData?.accessToken);
  const LogoutSubmit = useCallback(async () => {
    dispatch({ type: LOGOUT_REQUEST });
    setToken(null);
  }, [dispatch]);

  const navigateToLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const navigateToHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const navigateToCarList = useCallback(() => {
    navigate("/user/car/list");
  }, [navigate]);

  const navigateToMap = useCallback(() => {
    navigate("/user/map");
  }, [navigate]);

  const navigateToCommunity = useCallback(() => {
    navigate("/user/community");
  }, [navigate]);

  const navigateToCar = useCallback(() => {
    navigate("/user/car");
  }, [navigate]);

  const navigateToSelfRepair = useCallback(() => {
    navigate("/user/self-repair");
  }, [navigate]);

  const navigateToMyPage = useCallback(() => {
    navigate(`/user/mypage`);
  }, [navigate]);

  useEffect(() => {
    let title = PAGE_TITLES[location.pathname] || null;

    if (!title) {
      for (const { path, title: pageTitle } of DYNAMIC_PAGE_TITLES) {
        const regex = new RegExp(
          `^${path.replace(/:[^\s/]+/g, "([\\w-]+)")}$`,
          "g"
        );
        const match = location.pathname.match(regex);
        if (match) {
          title = pageTitle;
          break;
        }
      }
    }

    setTitle(title || "Unknown Page");
  }, [location.pathname]);

  return (
    <div css={container}>
      <div className="section1">
        <div className="loginInfo">
          {token ? (
            <div
              className="logo"
              onClick={LogoutSubmit}
              css={{ cursor: "pointer" }}
            >
              LOGOUT
            </div>
          ) : (
            <div
              className="logo"
              onClick={navigateToLogin}
              css={{ cursor: "pointer" }}
            >
              LOGIN
            </div>
          )}
        </div>
      </div>
      <div css={section2} className="navSection2">
        <div className="menuBar">
          <div className="logo" onClick={navigateToHome}>
            <img
              src={Logo}
              alt="logo"
              width="32%"
              height="auto"
              className="logoImg"
            />
          </div>
          <div className="menu">
            <div className="item" onClick={navigateToCarList}>
              거래
            </div>
            <div className="item" onClick={navigateToMap}>
              예약
            </div>
            <div className="item" onClick={navigateToCommunity}>
              커뮤니티
            </div>
            <div className="item" onClick={navigateToCar}>
              내 차 등록
            </div>
            <div className="item" onClick={navigateToSelfRepair}>
              셀프 정비
            </div>
            {token ? (
              <div className="item" onClick={navigateToMyPage}>
                마이페이지
              </div>
            ) : null}
          </div>
        </div>
        <div className="location" css={{ cursor: "default" }}>
          {title}
        </div>
      </div>
    </div>
  );
}
