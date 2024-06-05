"use client";
import React from "react";
import { Button, Form, Input, Select, Space } from "antd";
const { TextArea } = Input;
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const TaskInformation = () => {
  const [form] = Form.useForm();
  const onStatutChange = (value) => {
    switch (value) {
      case "todo":
        form.setFieldsValue({
          note: "Hi, man!",
        });
        break;
      case "doing":
        form.setFieldsValue({
          note: "Hi, lady!",
        });
        break;
      case "done":
        form.setFieldsValue({
          note: "Hi there!",
        });
        break;
      case "stocked":
        form.setFieldsValue({
          note: "Hi there!",
        });
        break;
      default:
    }
  };
  const onFinish = (values) => {
    console.log(values);
  };
  const onReset = () => {
    form.resetFields();
  };
  const onFill = () => {
    form.setFieldsValue({
      note: "Hello world!",
      gender: "male",
    });
  };

  return (
    <div className="py-16">
      <Form
        {...layout}
        form={form}
        name="control-hooks"
        onFinish={onFinish}
        className="m-auto"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item
          name="title"
          label="Titre"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="statut"
          label="Statut"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            onChange={onStatutChange}
            allowClear
          >
            <Option value="todo">A faire</Option>
            <Option value="doing">En cours</Option>
            <Option value="done">Terminée</Option>
            <Option value="stocked">Reserve</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <TextArea rows={8} />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Valider
            </Button>
            <Button htmlType="button" onClick={onReset}>
              Par défault
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TaskInformation;
