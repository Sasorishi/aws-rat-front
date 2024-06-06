"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Input, Checkbox, Spin, Alert } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";
import { signIn } from "../auth";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onFinish = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signIn(values.username, values.password);
      setSuccess("Login successful!");
      console.log("Login successful!", result);
      router.push("/tasks");
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-col min-h-screen items-center py-24">
      <div className="py-8">
        {error && (
          <Alert message="Error" description={error} type="error" showIcon />
        )}
        {success && (
          <Alert
            message="Success"
            description={success}
            type="success"
            showIcon
          />
        )}
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Utilisateur"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mot de passe"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Se souvenir</Checkbox>
        </Form.Item>

        <div className="my-8 text-end">
          <a href="/auth/signup">
            <LeftCircleOutlined />
            <span className="text-black text-xs ml-2 hover:text-[#3B82F6] transition delay-75">
              pas de compte ?
            </span>
          </a>
        </div>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Connexion
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
