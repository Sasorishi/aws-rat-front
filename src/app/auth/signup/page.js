"use client";

import React, { useState, onChange } from "react";
import { useRouter } from "next/navigation";
import { Button, Form, Input, Alert, Flex, Typography } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";
import { signUp, confirmSignUp } from "@/auth";

const { Title } = Typography;

const SignupForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");

  const onFinish = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signUp(
        values.username,
        values.email,
        values.password
      );
      setUsername(values.username);
      setSuccess(
        "SignUp successful! Please check your email for the confirmation code."
      );
      setStep(2);
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onConfirmFinish = async (values) => {
    setLoading(true);
    setError(null);
    console.log(username);
    console.log(values);
    console.log(values.confirmationCode);
    try {
      const result = await confirmSignUp(username, values.confirmationCode);
      setSuccess("Confirmation successful! You can now log in.");
      router.push("/");
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const onConfirmFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const sharedProps = {
    onChange,
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
      {step === 1 && (
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
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
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

          <div className="my-8 text-end">
            <a href="/">
              <LeftCircleOutlined />
              <span className="text-black text-xs ml-2 hover:text-[#3B82F6] transition delay-75">
                déjà un compte ?
              </span>
            </a>
          </div>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Valider
            </Button>
          </Form.Item>
        </Form>
      )}
      {step === 2 && (
        <Form
          name="confirm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onConfirmFinish}
          onFinishFailed={onConfirmFinishFailed}
          autoComplete="off"
        >
          <Flex gap="middle" align="flex-start" vertical className="py-8">
            <Title level={5}>Confirmation Code</Title>
            <Form.Item
              label="Code"
              name="confirmationCode"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input.OTP
                formatter={(str) => str.toUpperCase()}
                rules={[
                  {
                    required: true,
                    message: "Please input your confirmation code!",
                  },
                ]}
                {...sharedProps}
              />
            </Form.Item>
          </Flex>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Confirmer
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default SignupForm;
