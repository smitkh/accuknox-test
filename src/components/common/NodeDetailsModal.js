import React from "react";

export function NodeDetailsModal(props) {
  return (
    <div>
      <h3>{props.node.data("label")}</h3>
      <p>Details: {props.node.data("details")}</p>
    </div>
  );
}
