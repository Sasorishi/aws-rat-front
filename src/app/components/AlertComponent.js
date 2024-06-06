import React, { useEffect, useState } from "react";
import { Alert, Space } from "antd";

const AlertComponent = (status, message, description) => {
  const [alertType, setAlertType] = useState(null);

  useEffect(() => {
    switch (status) {
      case "success":
        setAlertType("success");
        break;
      case "warning":
        setAlertType("warning");
        break;
      case "error":
        setAlertType("error");
        break;
      default:
        setAlertType(null);
        break;
    }
  }, [status]);

  const onClose = (e) => {
    console.log(e, "I was closed.");
  };

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      <Alert
        message={message}
        description={description}
        type={alertType}
        closable
        onClose={onClose}
      />
    </Space>
  );
};

export default AlertComponent;
