import React, { useState } from 'react';
import {
  CustomInput,
  CustomInputPassword,
  SignInButton,
  CustomForm,
  CustomRow,
} from './styles';
import {
  LockOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Row, Checkbox, Radio, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { ROOT_URL } from '../../App';
import * as actionTypes from '../../store/actions';


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleLogin = async values => {
    // API Call for login
    console.log(values);

    await Axios.post(`${ROOT_URL}/login`, values)
      .then(res => {
        // Check res
        console.log(res);
        if (res.status === 200) {
          notification.success({
            message: `Success`,
            description: res.data.message,
            placement: 'bottomLeft',
          });
          if(values?.role === 'user'){
            dispatch({
              type: actionTypes.CHANGE_USER,
              userDetails: res.data,
            });
          navigate('/user')
        }
          else{
            dispatch({
              type: actionTypes.CHANGE_USER,
              userDetails: res.data,
            });
          navigate('/doctor')
        }
        } else {
          notification.error({
            message: `Error`,
            description: res.data.message,
            placement: 'bottomLeft',
          });
        }
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };


  return (
    <CustomRow>
    <div className='loginImgWrapper'></div>
    <CustomForm
      name="LoginForm"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={handleLogin}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <CustomForm.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <CustomInput
          placeholder="Enter your Email"
          prefix={<PhoneOutlined className="prefix-icons" />}
        />
      </CustomForm.Item>

      <CustomForm.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <CustomInputPassword
          placeholder="Enter your password"
          prefix={<LockOutlined className="prefix-icons" />}
        />
      </CustomForm.Item>
      <CustomForm.Item
        label="Login as: "
        className="sign-up-options"
        name="role"
      >
        <Radio.Group>
          <Radio value="user">User</Radio>
          <Radio value="doctor">Doctor</Radio>
        </Radio.Group>
      </CustomForm.Item>
      <CustomForm.Item className="actions">
        <CustomForm.Item
          name="remember"
          valuePropName="checked"
          noStyle
          className="checkbox"
        >
          <Checkbox>Remember me</Checkbox>
        </CustomForm.Item>

        <a className="forget" href="https://www.google.com">
          Forgot your password ?
        </a>
      </CustomForm.Item>

      <CustomForm.Item>
        <SignInButton type="primary" htmlType="submit">
          Sign in
        </SignInButton>
      </CustomForm.Item>
    </CustomForm>
    </CustomRow>
  );
};

export default Login;
