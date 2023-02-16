import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import openNotificationWithIcon from "../../animations";
import { getAllTypes } from "../../../services/product.services";
import { UploadOutlined } from "@ant-design/icons";

export default function FormProd({ onFinish, currItem, nameForm }) {
  const [form] = Form.useForm();

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };
  const [url, setUrl] = useState(currItem ? currItem.url : "");
  const [arrType, setArrType] = useState([]);

  useEffect(() => {
    getArrType();
  }, []);

  const getArrType = async () => {
    try {
      const arrTypeDoc = await getAllTypes();
      setArrType(arrTypeDoc.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {}
  };

  //get image
  const onChange = (e) => {
    let file = e.file;
    console.log(e);
    if (file.size < 1048480) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setUrl(e.target.result);
      };
    } else {
      openNotificationWithIcon("warning", "Please choose image size < 1MB");
    }
  };

  useEffect(() => {
    form.setFieldsValue(currItem);
  }, [form, currItem]);

  const beforeUpload = (file) => {
    if (file.size > 1048480) return null;
    return false;
  };

  return (
    <Form
      form={form}
      {...layout}
      name="nest-messages"
      onFinish={(value) => onFinish(value, url)}
      validateMessages={validateMessages}
      initialValues={currItem}
    >
      <h2 className="title-add">{nameForm}</h2>
      <Form.Item
        name={["name"]}
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={["type"]}
        label="Type"
        rules={[{ required: true, message: "Province is required" }]}
      >
        <Select
          label="Name"
          className="ant-form-item-control-input-content"
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
        >
          {arrType.map((item) => {
            return <Select.Option key={item.type}>{item.type}</Select.Option>;
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name={["num"]}
        label="Num"
        className="ant-form-item-control-input-content"
        rules={[
          {
            type: "number",
            min: 0,
            max: 1000000000000,
            required: true,
          },
        ]}
      >
        <InputNumber className="ant-input" />
      </Form.Item>
      <Form.Item
        name={["price"]}
        label="Price"
        rules={[
          {
            type: "number",
            min: 0,
            max: 1000000000000,
            required: true,
          },
        ]}
      >
        <InputNumber className="ant-input" />
      </Form.Item>
      <Form.Item name={["des"]} label="Descriptions">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Upload" valuePropName="fileList">
        <Upload
          beforeUpload={beforeUpload}
          listType="picture"
          maxCount={1}
          onChange={onChange}
          fileList={[url]}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 18 }}>
        <Button type="primary" htmlType="submit">
          {nameForm}
        </Button>
      </Form.Item>
    </Form>
  );
}
