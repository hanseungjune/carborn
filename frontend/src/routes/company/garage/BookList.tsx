/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import NavGarage from "../../../components/NavGarage";
import car from "../../../assets/giup-car.png";
import GarageUserTable from "../../../components/garage/GarageUserTable";

const container = css`
  width: 100%;
  height: 88.5vh;
  background-color: black;
  position: relative;
  display: flex;
  justify-content: center;
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
`;

export default function BookList() {
  return (
    <>
      <NavGarage />
      <div css={container}>
        <img src={car} />
        <GarageUserTable />
      </div>
    </>
  );
}
