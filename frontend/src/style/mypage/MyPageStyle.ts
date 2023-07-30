import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const StyleMyPageContainer = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  background-color: white;
  /* background: linear-gradient(
    to bottom,
    #000000,
    #1e0000e8
  );
  background-size: 100% 200%;
  animation: gradient 10s ease infinite;

  @keyframes gradient {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 0% 100%;
    }
    100% {
      background-position: 0% 0%;
    }
  } */
`;

export const StyleMyPageDiv = styled.div`
  margin-top: 3rem;
  width: 70vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const StyleMypageCards = styled.div`
  &:hover {
    transform: scale(1.05);
    transition: all 0.2s;
    background-color: #d23131b7;
    z-index: 2;
    p {
      color: white;
    }
  }

  &:not(:hover) {
    transform: scale(1);
    transition: all 0.2s;
    background-color: #f2f2f2;
    p {
      color: #000000c3;
    }
  }

  width: 15vw;
  height: 38vh;
  background-color: #f2f2f2;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  margin-bottom: 1rem;

  &:nth-of-type(4n) {
    margin-right: 0rem;
  }

  & > a {
    text-decoration: none;
    text-align: center;
    margin-top: 3rem;
  }

  & > a:nth-of-type(4n) {
    margin-right: 0rem;
  }

  & > a > p {
    color: #000000c3;
    font-size: 1.5rem;
    font-weight: 900;
  }
`;

export const StyleMypageCardImg = styled.div`
  height: 40%;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
  img {
    width: 55%;
  }
`;

export const container = css`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  position: relative;

  .logoImg {
    cursor: pointer;
  }
  .section1 {
    width: 100%;
    height: 4vh;
    background-color: black;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    .loginInfo {
      align-items: center;
      display: flex;
      justify-content: end;
      height: 100%;
      width: 80%;
      background-color: black;
      color: white;
      div {
        margin: 0 20px;
      }
      font-size: 16px;
    }
  }

  .menuBar {
    width: 80%;
    height: 13.5vh;
    display: flex;
    color: white;
    .logo {
      flex: 4;
      display: flex;
      align-items: center;
    }
    .menu {
      font-size: 20px;
      font-weight: 550;
      flex: 6;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-evenly;
    }
    .item {
      cursor: pointer;
      &:hover {
        font-size: 22px;
        transition: all 0.2s;
      }
      transition: all 0.2s;
    }
  }
  .location {
    position: relative;
    color: white;
    font-size: 40px;
    font-weight: bolder;
    margin-bottom: 10px;
    width: 80%;
    margin-bottom: 20px;
  }
`;