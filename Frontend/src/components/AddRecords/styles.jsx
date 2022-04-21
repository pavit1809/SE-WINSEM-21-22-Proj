import { Layout, Form, Input, InputNumber, Button } from 'antd';
import styled from 'styled-components';

export const ImgWrapper = styled.div`
  width: 28vw;
  height: 50vh;
  position: relative;
  overflow: hidden;
  background-color: white;
  border-radius: 18px;
  margin: 0 5vw 0 0;
  img {
    display: inline;
    margin: 0 auto;
    height: 100%;
    width: 100%;
  }
`;

export const Heading = styled.div`
  margin: 1vh 0 0 1vw;
  font-size: 6vh;
  color: #407fc3;
  font-weight: bold;
`;

export const DetailsSection = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 7vh 10vw 1vh 15vw;
  .description {
    margin: 0 5vw 0 0;
    width: 30vw;
  }
  .title {
    margin: 0 5vw 0 0;
    font-size: 3.5vh;
    color: #407fc3;
    font-weight: bold;
  }
  .content {
    margin-top: 10px;
    font-size: 1.5vh;
  }
  .price {
    margin-top: 10px;
    font-size: 2vh;
    color: #407fc3;
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
