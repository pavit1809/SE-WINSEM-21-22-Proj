import React, { useState } from 'react';
import {
  CustomRow,
  CustomInput,
  SignInButton,
  CustomForm2,
  CustomInputCode,
  GetCodeButton,
} from './styles';
import {
  KeyOutlined,
  MailOutlined,
  MessageOutlined,
  PhoneOutlined,
  UploadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Row, Radio, notification, Upload, Button, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { ROOT_URL } from '../../App';
const { Option } = Select;

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [details, setDetails] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [otp, setOtp] = useState('');
  const [otpStatus, setOtpStatus] = useState('Get Code');
  const navigate = useNavigate();

  const handleSignUp = async values => {
    console.log(values, details);
    // API Call for SignUp
    let signUpDetails = {
      name: values?.name,
      email: values?.email,
      password: values?.password,
      phoneNumber: values?.phoneNumber,
      role: values?.role,
    };
    if (values?.role === 'doctor') {
      signUpDetails = {
        ...signUpDetails,
        certifications: details?.doc,
        designation: values?.designation,
      };
    }
    await Axios.post(`${ROOT_URL}/signup`, signUpDetails)
      .then(res => {
        console.log(res);
        if (res.status === 201) {
          notification.success({
            message: `Success`,
            description: res.data.message,
            placement: 'bottomLeft',
          });
          navigate('/login');
        } else {
          notification.error({
            message: `Error`,
            description: res.data.message,
            placement: 'bottomLeft',
          });
        }
      })
      .catch(err => {
        notification.error({
          message: `Error`,
          description: err.message,
          placement: 'bottomLeft',
        });
        console.log('err', err);
      });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const getCodeDisable = () => {
    if (otpStatus === 'Get Code') {
      return phoneNumber.length !== 10;
    } else if (otpStatus === 'Verify Code') {
      return otp.length !== 6;
    } else {
      return false;
    }
  };
  const handleGetCode = async () => {
    setLoading(true);
    if (otpStatus === 'Get Code') {
      const values = { phoneNumber: phoneNumber };
      console.log(values);
      await Axios.post(`${ROOT_URL}/otp/new`, values)
        .then(res => {
          console.log(res);

          if (res.status === 200) {
            setOtpStatus('Verify Code');
            notification.success({
              message: `Success`,
              description: res.data.message,
              placement: 'bottomLeft',
            });
            setLoading(false);
          } else {
            notification.error({
              message: `Error- Some Problem Occurred`,
              description: res.data.message,
              placement: 'bottomLeft',
            });
            setLoading(false);
          }
        })
        .catch(err => {
          console.log('err', err);
          setLoading(false);
        });
    } else {
      const values = { entity: phoneNumber, otp: otp };
      console.log(values);
      await Axios.post(`${ROOT_URL}/otp/verify`, values)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            setOtpStatus('Verified');
            notification.success({
              message: `Success`,
              description: res.data.message,
              placement: 'bottomLeft',
            });
            setLoading(false);
          } else {
            notification.error({
              message: `Error- Invalid OTP`,
              description: res.data.message,
              placement: 'bottomLeft',
            });
            setLoading(false);
          }
        })
        .catch(err => {
          notification.error({
            message: `Error- Invalid OTP`,
            description: err.message,
            placement: 'bottomLeft',
          });
          console.log('err', err);
          setLoading(false);
        });
    }
  };

  const handleUpload = async e => {
    setDetails({ ...details, doc: e.fileList });
    const fileList = e.fileList;
    let formData = new FormData();
    formData.append('file', fileList[0].originFileObj);
    await Axios.post(`${ROOT_URL}/document/upload`, formData)
      .then(res => {
        if (res.status === 201) {
          console.log(res.data);
          setDetails({ ...details, doc: [res.data.documentId] });
          notification.success({
            message: `Success`,
            description: res.data.message,
            placement: 'bottomLeft',
          });
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
  const designations = [
    'Ortho',
    'Bone Specialist',
    'Cardi-vascular',
    'Neuro Surgeon',
    'ENT',
    'General Medicine',
  ];
  return (
    <CustomRow>
      <div className="loginImgWrapper"></div>
      <CustomForm2
        name="SignUpForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={handleSignUp}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <CustomForm2.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Name!',
            },
          ]}
        >
          <CustomInput
            placeholder="Enter your Name"
            value={details?.name || ''}
            onChange={e => setDetails({ ...details, name: e.target.value })}
            prefix={<UserOutlined className="prefix-icons" />}
          />
        </CustomForm2.Item>
        <CustomForm2.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
            { type: 'email', message: 'Not a valid email!' },
          ]}
        >
          <CustomInput
            placeholder="Enter your Email"
            value={details?.email || ''}
            onChange={e => setDetails({ ...details, email: e.target.value })}
            prefix={<MailOutlined className="prefix-icons" />}
          />
        </CustomForm2.Item>
        <CustomForm2.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}
        >
          <CustomInput
            type="password"
            placeholder="Enter your Password"
            value={details?.password || ''}
            onChange={e => setDetails({ ...details, password: e.target.value })}
            prefix={<KeyOutlined className="prefix-icons" />}
          />
        </CustomForm2.Item>
        <CustomForm2.Item
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: 'Please input your Phone Number!',
            },
            { min: 10, message: 'Not a valid Phone Number!' },
            { max: 10, message: 'Not a valid Phone Number!' },
          ]}
        >
          <CustomInput
            placeholder="Enter your Phone Number"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            prefix={<PhoneOutlined className="prefix-icons" />}
          />
        </CustomForm2.Item>
        <Row>
          <CustomForm2.Item name="verification code">
            <CustomInputCode
              value={otp}
              onChange={e => setOtp(e.target.value)}
              placeholder="Enter your verification code"
              prefix={<MessageOutlined className="prefix-icons" />}
            />
          </CustomForm2.Item>
          <CustomForm2.Item name="verification code">
            <GetCodeButton
              loading={loading}
              disabled={getCodeDisable()}
              onClick={handleGetCode}
            >
              {otpStatus}
            </GetCodeButton>
          </CustomForm2.Item>
        </Row>
        <CustomForm2.Item
          label="Sign Up as: "
          className="sign-up-options"
          name="role"
        >
          <Radio.Group
            value={details?.role || ''}
            onChange={e => setDetails({ ...details, role: e.target.value })}
          >
            <Radio value="user">User</Radio>
            <Radio value="doctor">Doctor</Radio>
          </Radio.Group>
        </CustomForm2.Item>
        {details?.role === 'doctor' && (
          <>
            <CustomForm2.Item
              label="Certifications"
              className="sign-up-options"
              name="doc"
            >
              <Upload
                beforeUpload={() => false}
                onChange={e => handleUpload(e)}
              >
                <Button icon={<UploadOutlined />}>
                  Click to Upload Certification
                </Button>
              </Upload>
            </CustomForm2.Item>

            <CustomForm2.Item
              name="designation"
              rules={[
                {
                  required: true,
                  message: 'Please select your Designation!',
                },
              ]}
            >
              <Select
                placeholder="Select your designation"
                style={{ width: '550px', fontSize: '1.5vh' }}
                value={details?.designation || ''}
                onChange={e => setDetails({ ...details, designation: e })}
                allowClear
              >
                {designations.map(desig => (
                  <Option value={desig}>{desig}</Option>
                ))}
              </Select>
            </CustomForm2.Item>
          </>
        )}

        <CustomForm2.Item>
          <SignInButton
            disabled={otpStatus !== 'Verified'}
            type="primary"
            htmlType="submit"
          >
            Sign Up
          </SignInButton>
        </CustomForm2.Item>
      </CustomForm2>
    </CustomRow>
  );
};

export default SignUp;
