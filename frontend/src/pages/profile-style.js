import styled from "styled-components";

export const Contents = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  margin-top: 30px;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
`;

export const Content = styled.div`
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 0 3px gray;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  width: ${({ $none }) => ($none ? "30%" : "70%")};
  border-top: ${({ $none }) => $none && "3px solid blue"};
  align-items: ${({ $none }) => $none && "center"};
  text-align: ${({ $none }) => $none && "center"};

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export const Name = styled.div`
  font-size: 25px;
  padding: 10px;
`;

export const Position = styled.div`
  font-size: 18px;
  color: gray;
`;

export const Form = styled.form``;

export const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 18px;
  width: 30%;
`;

export const Input = styled.input`
  border: 1px solid lightgray;
  outline: none;
  border-radius: 3px;
  padding-left: 15px;
  font-size: 15px;
  height: 40px;
  width: 70%;
  color: #000;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
`;
