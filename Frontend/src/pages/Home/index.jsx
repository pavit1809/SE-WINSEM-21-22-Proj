import React from 'react';
import {
  HomeBody,
  ActionContainer,
  HeaderContainer,
} from './styles';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  const showLoginModal = () => {
    navigate('/login');
  };

  const showSignUpModal = () => {
    navigate('/signup');

  };
  return (
    <HomeBody>
      <ActionContainer>
        <div className="title">MedSec</div>
        <div className="actions">
          <div onClick={showSignUpModal}>Sign Up</div>
          <div onClick={showLoginModal}>Login</div>
        </div>
      </ActionContainer>

      <HeaderContainer>
        <div>
          <div className="title">MedSec</div>
          <div className="moto">
            Welcome to camping buddy! Jump right in and explore our many
            backgrounds <br/>
            Feel free to share some of your own and comment on
            others
          </div>
        </div>
        <div>
          <div className="Logo-wrapper">
            <img src="/images/logoMain.svg" className="logo" alt="logo" />
          </div>
        </div>
      </HeaderContainer>
    </HomeBody>
  );
};

export default Home;
