"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CloseSquareFilled } from "@ant-design/icons";
import { Button, Form, Input, Select, Space, Flex, Spin } from "antd";
import axios from "axios";

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
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_WEB}/tasks/${id}`
        );
        console.log(response.data);
        form.setFieldsValue({
          title: response.data.name,
          status: response.data.status,
          description: response.data.description,
        });
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onStatutChange = (value) => {
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
          note: "stocked",
        });
        break;
      default:
    }
  };

  const onFinish = (values) => {
    console.log(values);
    try {
      const response = axios.put(
        `${process.env.NEXT_PUBLIC_API_WEB}/tasks/${id}`,
        {
          name: values.title,
          status: values.status,
          description: values.description,
        }
      );
    } catch (err) {
      // setError(err);
      setAlert({ status: "error", message: "Error", description: err.message });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = () => {
    try {
      const response = axios.delete(
        `${process.env.NEXT_PUBLIC_API_WEB}/tasks/${id}`
      );
    } catch (err) {
      // setError(err);
      console.log("ici");
      setAlert({ status: "error", message: "Error", description: err.message });
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="flex flex-col min-h-screen items-center py-24">
      {alert && (
        <AlertComponent
          status={alert.status}
          message={alert.message}
          description={alert.description}
        />
      )}
      {!loading ? (
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
              <Button danger onClick={onDelete}>
                Supprimer
              </Button>
            </Space>
          </Form.Item>
        </Form>
      ) : (
        <Flex align="center" gap="middle">
          <Spin size="large" />
        </Flex>
      )}
    </div>
  );
};

export default TaskInformation;
