/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import NavGarage from "../../../components/NavGarage";
import car from "../../../assets/giup-car.png";
import dotBogi from "../../../assets/dot-bo-gi.png";
import register from "../../../assets/register.png";
import { useNavigate } from "react-router-dom";

const container = css`
  width: 100%;
  height: 88.5vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  img {
    /* align-self; */
    height: 75%;
    width: 75%;
    opacity: 0.6;
    position: absolute;
    z-index: 0;
  }
  .topTxt {
    margin-top: 0;
    p {
      margin-top: 0;
    }
  }
  p {
    color: #d23131;
    font-size: 84px;
    font-weight: bold;
    margin: 0 0 0 0;
  }
  .bottomTxt {
    margin: 20px 0;
    display: flex;
    p:nth-of-type(1) {
      color: white;
      margin-right: 20px;
    }
  }
  button {
    width: 18vw;
    height: 53vh;
    margin: 0 20px 0 20px;
    z-index: 2;
    position: relative;
    background-color: #f6f6f6;
    opacity: 0.9;
    border-radius: 10px;
  }
  .btnSection {
    display: flex;
    flex-direction: row;
    margin: 10px 0 0 0;
    .btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      div:nth-of-type(1) {
        flex: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          position: relative;
          height: 50%;
          /* width: 50%; */
        }
      }
      div:nth-of-type(3) {
        color: #a8a8a8;
      }

      div:nth-of-type(2) {
        font-size: 25px;
        font-weight: bold;
        flex: 1;
      }

      div:nth-of-type(3) {
        font-size: 20px;
        flex: 1;
      }
    }
  }
`;

export default function InspectorHome() {
  const navigate = useNavigate();
  const bookList = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/garage/reserve");
  };

  return (
    <>
      <NavGarage />
      <div css={container}>
        <img src={car} />
        <div className="topTxt">
          <p>Inspector</p>
        </div>
        <div className="btnSection">
          <button className="btn" onClick={bookList}>
            <div>
              <img src={dotBogi} />
            </div>
            <div>Check</div>
            <div>
              예약자 리스트를
              <br />
              조회해보세요
            </div>
          </button>
          <button className="btn">
            <div>
              <img src={register} />
            </div>
            <div>Check</div>
            <div>
              정비내역을
              <br />
              조회해보세요
            </div>
          </button>
        </div>
        <div className="bottomTxt">
          <p>with</p>
          <p>Car-born</p>
        </div>
      </div>
    </>
  );
}
