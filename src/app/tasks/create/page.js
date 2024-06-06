"use client";
import React, { useState } from "react";
import { Button, Form, Input, Select, Space } from "antd";
import axios from "axios";
import AlertComponent from "@/app/components/AlertComponent";

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
  const [loading, setLoading] = useState();
  const onStatusChange = (value) => {
    switch (value) {
      case "todo":
        form.setFieldsValue({
          note: "todo",
        });
        break;
      case "doing":
        form.setFieldsValue({
          note: "doing",
        });
        break;
      case "done":
        form.setFieldsValue({
          note: "done",
        });
        break;
      case "stocked":
        form.setFieldsValue({
          note: "stocket",
        });
        break;
      default:
    }
  };

  const onFinish = (values) => {
    try {
      const result = axios.post(process.env.NEXT_PUBLIC_API_WEB + "/tasks", {
        name: values.title,
        status: values.status,
        description: values.description,
      });
    } catch (err) {
      setError(err);
      return (
        <AlertComponent status="error" message="Error" description={err} />
      );
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    form.resetFields();
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
          name="status"
          label="Statut"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="Select a option and change input text above"
            onChange={onStatusChange}
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
