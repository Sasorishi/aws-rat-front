"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Col, Row } from "antd";
import { Button, Divider, FloatButton, Empty, Flex, Spin } from "antd";
import Card from "../components/CardComponent";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddTaskButton = () => {
    router.push("/tasks/create", { scroll: false });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_WEB + "/tasks"
        );
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex flex-col min-h-screen items-center p-24">
      {!loading ? (
        <div className="w-full">
          <FloatButton onClick={handleAddTaskButton} />
          <div className="mb-24 text-center text-black">
            <Image
              className="m-auto relative invert"
              src="/aws.png"
              alt="Logo"
              width={180}
              height={37}
              priority
            />
            <h1 className="text-xl font-bold uppercase">Prospero</h1>
            <h3 className="text-md">Une solution de gestion de projet</h3>
          </div>
          {data && data.length > 0 ? (
            <Row
              gutter={[16, 16]}
              justify="space-around"
              align="top"
              className="bg-[#f0f0f0] py-8 rounded-md"
            >
              <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <div className="mb-8 text-black text-center font-bold uppercase">
                  <h1>A faire</h1>
                </div>
                {data.map((item, index) => {
                  return (
                    <div className="my-4" key={index}>
                      {item.status === "todo" && <Card data={item} />}
                    </div>
                  );
                })}
              </Col>
              <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <div className="mb-8 text-black text-center font-bold uppercase">
                  <h1>En Cours</h1>
                </div>
                {data.map((item, index) => {
                  return (
                    <div className="my-4" key={index}>
                      {item.status === "doing" && <Card data={item} />}
                    </div>
                  );
                })}
              </Col>
              <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <div className="mb-8 text-black text-center font-bold uppercase">
                  <h1>Terminé</h1>
                </div>
                {data.map((item, index) => {
                  return (
                    <div className="my-4" key={index}>
                      {item.status === "done" && <Card data={item} />}
                    </div>
                  );
                })}
              </Col>
              <Col xs={24} sm={12} md={12} lg={6} xl={6}>
                <div className="mb-8 text-black text-center font-bold uppercase">
                  <h1>Reserve</h1>
                </div>
                {data.map((item, index) => {
                  return (
                    <div className="my-4" key={index}>
                      {item.status === "stocked" && <Card data={item} />}
                    </div>
                  );
                })}
              </Col>
            </Row>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
      ) : (
        <Flex align="center" gap="middle">
          <Spin size="large" />
        </Flex>
      )}
    </main>
  );
}
