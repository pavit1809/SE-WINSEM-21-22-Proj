import { Layout, Form, Input, InputNumber } from "antd";
import styled from "styled-components";

export const CustomLayout = styled(Layout)`
  .ant-layout-header {
    background-color: #407fc3;
  }
  .ant-layout {
    height:92.5vh;
  }
  .navbar-actions {
    float: right;
    font-size:2vh;
    color:white;
    .tab {
      cursor: pointer;
      margin-left: 30px;
      .avatar {
        margin: 5px;
      }
      .notif-badge {
        top: 3px;
        .notif {
            color:white;
          font-size: 2vh;
        }
      }
    }
  }
`;

export const ImgWrapper = styled.div`
  width: 18vw;
  height: 30vh;
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
