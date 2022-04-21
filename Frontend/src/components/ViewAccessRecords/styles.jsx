import { Layout, Form, Input, InputNumber, Button } from "antd";
import styled from "styled-components";

export const Heading = styled.div`
  margin: 1vh 0 0 1vw;
  font-size: 6vh;
  color: #407fc3;
  font-weight: bold;
`;

export const DetailsSection = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 1vh 10vw 1vh -35vw;
  .description {
    margin: 0 5vw 0 0;
    width: 30vw;
  }
  .title {
    margin: 0 5vw 0 0;
    font-size: 3.5vh;
    color: black;
    font-weight: bold;
  }
  .price {
    margin-top: 10px;
    font-size: 2vh;
    color: #407fa3;
    font-weight: bold;
  }
`;

export const AddButton = styled(Button)`
  width: 550px;
`;

export const CustomForm = styled(Form)`
  .ant-form-item {
    width: 350px;
  }
  margin: 80px 0 0 0px;
  .records .add-record-btn {
    width: 550px;
  }
  .category-select {
    width: 550px;
  }
`;

export const PDFContainer = styled.div`
  @media print {
    .pdf-container {
      display: none;
    }
  }
`;
