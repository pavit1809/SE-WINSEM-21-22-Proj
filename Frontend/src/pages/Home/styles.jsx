import styled from 'styled-components';
import { Input, Modal, Tabs, Form, Button, Row } from 'antd';

export const HomeBody = styled.div`
  background-image: url(/images/homeBG.svg);
  background-repeat: no-repeat;
  background-size: 100% auto;
  width: 100vw;
  height: 100vh;
  position: absolute;
  overflow-x: hidden;
`;

export const ActionContainer = styled.div`
  color: white;
  display: flex;
  width: 100vw;
  position: absolute;
  justify-content: space-between;

  font-size: 4vh;
  .title {
    margin: 2px 16px 0 16px;
  }
  .actions {
    display: flex;
    div {
      margin: 2px 16px 0 16px;
    }
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 30vh 12vw 0 5vw;
  color: white;
  .title {
    font-size: 20vh;
    ${'' /* color: #12afff; */}
  }
  .moto {
    display: flex;
    font-size: 4vh;
    font-weight: 600;
    .icon {
      margin: 0 6px;
    }
  }
  .Logo-wrapper {
    width: 40vh;
    height: 40vh;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    background-color: white;
  }
  .logo {
    display: inline;
    margin: 0 auto;
    height: 100%;
    width: auto;
  }
`;

export const AboutContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20vw 0 15vw;
  .about-wrapper {
    width: 80vw;
    height: 50vh;
    position: relative;
    overflow: hidden;
    margin:0 50px 0 0;
  }
  .about {
    display: inline;
    margin: 0 auto;
    height: 100%;
    width: 100%;
  }
  .about-us {
    text-align:center;
    width: 100vw;
    .title {
      color: black;
      font-size: 3.5vh;
      font-weight: 600;
      margin: 0 0 5vh; 0;
    }
    .content {
      font-size: 3vh;
    }
  }
`;

export const Footer = styled.div`
  color: black;
  left: 10px;
  bottom: 10px;
  display: flex;
  margin: 10vh 0 2vh 0;
  div {
    margin: 0 16px 0 16px;
  }
`;

export const CustomModal = styled(Modal)`
  .ant-modal-content {
    font-size: 2.5vh;
    background-color: #a3bcd7;
    border-radius: 50px;
  }
  .ant-modal-close-x {
    margin: 10px 10px 0 0;
  }
`;

export const CustomTabs = styled(Tabs)`
  .ant-tabs {
    font-size: 2.5vh;
    background-color: #a3bcd7;
  }
  .ant-tabs-tab-btn {
    font-size: 2vh;
  }
`;

export const CustomInput = styled(Input)`
  font-size: 2.5vh;
  margin: 10px 0;
  width: 550px;
  .prefix-icons {
    color: #1890ff;
  }
`;
export const CustomInputPassword = styled(Input.Password)`
  font-size: 2.5vh;
  margin: 10px 0;
  width: 550px;
  .prefix-icons {
    color: #1890ff;
  }
`;

export const CustomInputCode = styled(Input)`
  font-size: 2.5vh;
  margin: 10px 0;
  width: 350px;
  .prefix-icons {
    color: #1890ff;
  }
`;

export const CustomRow = styled(Row)`
.loginImgWrapper{
  background-image: url(/images/loginImg.svg);
  background-repeat: no-repeat;
  background-size: 100% auto;
  width: 50vw;
  height: 100vh;
}
`;

export const CustomForm = styled(Form)`
.ant-form-item{
  width: 350px;
}
  margin:300px 0 0 120px;
  .actions {
    display: flex;
    justify-content: space-between;
    width: 750px;
    margin: 30px 0;

  }
  .checkbox {
    margin: 0 50px 0 0;
  }
  .forget {
    margin: 0 0 0 200px;
  }
  .sign-up-options {
    label {
      font-size: 2vh;
    }
    margin: 30px 0 30px 100px;

  }
`;
export const CustomForm2 = styled(Form)`
.ant-form-item{
  width: 350px;
}
  margin:150px 0 0 200px;
  .actions {
    display: flex;
    justify-content: space-between;
    width: 750px;
    margin: 30px 0;

  }
  .checkbox {
    margin: 0 50px 0 0;
  }
  .forget {
    margin: 0 0 0 200px;
  }
  .sign-up-options {
    label {
      font-size: 2vh;
    }
    margin: 30px 0 30px 100px;

  }
`;
export const SignInButton = styled(Button)`
  width: 550px;
`;

export const GetCodeButton = styled(Button)`
  width: 190px;
  margin: 10px 0 10px 10px;
  font-size: 2.5vh;
  height: 5vh;
`;
