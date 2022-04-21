import React, { useEffect, useState } from 'react';
import { DatabaseOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Select, Upload } from 'antd';
import { DetailsSection, ImgWrapper, CustomForm, AddButton } from './styles';

const { Option } = Select;

const AddRecords = ({ handleAdd }) => {
  const [category, setCategory] = useState('General Document');
  const [record, setRecord] = useState('');

  return (
    <>
      <DetailsSection>
        <ImgWrapper>
          <img src="/images/2.webp" alt="details" />
        </ImgWrapper>
        <div className="description">
          <div className="title">Add Records</div>
          <div className="price">
            Add records by just a few click and enter a private vault we made
            just for you!
          </div>
          <CustomForm
            name="AddRecord"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={handleAdd}
            autoComplete="off"
          >
            <CustomForm.Item className="records" name="file">
              <Upload
                beforeUpload={() => false}
                onChange={e => setRecord(e.fileList)}
              >
                <Button className="add-record-btn" icon={<UploadOutlined />}>
                  Click to Upload Records
                </Button>
              </Upload>
            </CustomForm.Item>
            <CustomForm.Item name="category">
              <Select
                placeholder="Select a category"
                value={category}
                onChange={value => setCategory(value)}
                allowClear
                className="category-select"
              >
                <Option value="General Document">General Document</Option>
                <Option value="MRI report">MRI report</Option>
                <Option value="CT Scan">CT Scan</Option>
                <Option value="Prescription Letter">Prescription Letter</Option>
                <Option value="XRAY SCAN">XRAY SCAN</Option>
                <Option value="Medical Clearance Certificate">
                  Medical Clearance Certificate
                </Option>
                <Option value="Others">Others</Option>
              </Select>
            </CustomForm.Item>

            <CustomForm.Item>
              <AddButton type="primary" htmlType="submit">
                Add Record
              </AddButton>
            </CustomForm.Item>
          </CustomForm>
        </div>
      </DetailsSection>
    </>
  );
};

export default AddRecords;
