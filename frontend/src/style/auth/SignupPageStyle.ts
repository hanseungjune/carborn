import styled from "@emotion/styled";

export interface IStyleSignUpBoxDivProps {
    border?: string;
  }

export const StyleSignUpBoxDiv = styled.div<IStyleSignUpBoxDivProps>`
  width: 30vw;
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #ffffff;
  border: 2px solid ${(props) => props.border};
  border-radius: 5px;
`;