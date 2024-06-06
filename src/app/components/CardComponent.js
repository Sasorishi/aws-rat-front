import React from "react";
import { Card } from "antd";
import moment from "moment";

const CardComponent = (data) => {
  const task = data.data;

  const formatDateTime = (dateString) => {
    return moment(dateString).format("MMMM Do YYYY, h:mm:ss a");
  };

  return (
    <Card
      title={task.name}
      extra={<a href={`/tasks/${task.id}`}>Détail</a>}
      style={{ width: "100%" }}
      className="shadow-sm"
    >
      <div>
        <p className="line-clamp-4">{task.description}</p>
      </div>
      <div className="mt-8 text-end">
        <span className="text-xs">{formatDateTime(task.createdAt)}</span>
      </div>
    </Card>
  );
};

export default CardComponent;
