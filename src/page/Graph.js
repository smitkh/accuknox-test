import React from "react";
import CytoscapeGraph from "../components/common/CytoscapeGraph";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";

const style = [
  {
    selector: "node",
    style: {
      "background-color": "#11479e",
      label: "data(label)",
      width: "label",
      height: "label",
      "text-valign": "center",
      "text-halign": "center",
      color: "white",
      "font-size": "20px",
      "border-width": 1,
      "border-color": "#333",
    },
  },
  {
    selector: "edge",
    style: {
      "curve-style": "bezier",
      "target-arrow-shape": "triangle",
      "line-color": "#9dbaea",
      "target-arrow-color": "#9dbaea",
      width: 2,
    },
  },
];

const Graph = () => {
  const { nodes, edges } = useSelector((state) => state.graph);

  return (
    <div className="main">
      <Sidebar />
      {!!nodes.length && (
        <div className="graph-main">
          <CytoscapeGraph
            nodes={nodes}
            edges={edges}
          />
        </div>
      )}
    </div>
  );
};

export default Graph;
