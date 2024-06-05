"use client";
import React from "react";
import Image from "next/image";
import { Col, Row } from "antd";
import { Button, Divider, FloatButton } from "antd";
import Card from "./components/CardComponent";

export default function Home() {
  const handleAddTaskButton = () => {
    console.log("onClick");
  };

  return (
    <main className="flex flex-col min-h-screen items-center p-24">
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
      <div className="w-full">
        <Row
          gutter={16}
          justify="space-around"
          align="start"
          className="bg-[#f0f0f0] py-8 rounded-md	"
        >
          <Col span={6}>
            <div className="mb-8 text-black text-center font-bold uppercase">
              <h1>A faire</h1>
            </div>
            <div className="my-4">
              <Card />
            </div>
            <div className="my-4">
              <Card />
            </div>
          </Col>
          <Col span={6}>
            <div className="mb-8 text-black text-center font-bold uppercase">
              <h1>En Cours</h1>
            </div>
            <Card />
          </Col>
          <Col span={6}>
            <div className="mb-8 text-black text-center font-bold uppercase">
              <h1>Terminé</h1>
            </div>
            <Card />
          </Col>
          <Col span={6}>
            <div className="mb-8 text-black text-center font-bold uppercase">
              <h1>Reserve</h1>
            </div>
            <Card />
          </Col>
        </Row>
      </div>
    </main>
  );
}
