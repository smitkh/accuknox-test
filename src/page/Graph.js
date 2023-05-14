import React from "react";
import CytoscapeGraph from "../components/common/CytoscapeGraph";

const nodes = [
  {
    data: {
      id: "owner-1",
      label: "Stackerholder #1",
      group: "purple",
      type: "person",
    },
  },
  {
    data: {
      id: "company-1",
      label: "Company #1",
      group: "purple",
      type: "company",
    },
  },
  {
    data: {
      id: "company-2",
      label: "Company #2",
      group: "purple",
      type: "company",
    },
  },
  {
    data: {
      id: "owner-2",
      label: "Stakeholder #2",
      group: "green",
      type: "person",
    },
  },
  {
    data: {
      id: "company-3",
      label: "Company #3",
      group: "green",
      type: "company",
    },
  },
  {
    data: {
      id: "company-4",
      label: "Company #4",
      group: "green",
      type: "company",
    },
  },
  {
    data: {
      id: "owner-3",
      label: "Stakeholder #3",
      group: "orange",
      type: "person",
    },
  },
  {
    data: {
      id: "company-5",
      label: "Company #5",
      group: "orange",
      type: "company",
    },
  },
  {
    data: {
      id: "company-6",
      label: "Company #6",
      group: "orange",
      type: "company",
    },
  },
  {
    data: {
      id: "company-7",
      label: "Company #7",
      group: "orange",
      type: "company",
    },
  },
  {
    data: {
      id: "company-8",
      label: "Company #8",
      group: "orange",
      type: "company",
    },
  },
];

const edges = [
  {
    data: {
      id: "is-shareholder-0",
      label: "IS-SHAREHOLDER",
      source: "owner-1",
      target: "company-1",
      type: "IS-SHAREHOLDER",
    },
  },
  {
    data: {
      id: "is-shareholder-1",
      label: "IS-SHAREHOLDER",
      source: "company-1",
      target: "company-2",
      type: "IS-SHAREHOLDER",
    },
  },
  {
    data: {
      id: "is-shareholder-2",
      label: "IS-SHAREHOLDER",
      source: "owner-2",
      target: "company-4",
      type: "IS-SHAREHOLDER",
    },
  },
  {
    data: {
      id: "is-shareholder-3",
      label: "IS-SHAREHOLDER",
      source: "owner-2",
      target: "company-3",
      type: "IS-SHAREHOLDER",
    },
  },
  {
    data: {
      id: "is-shareholder-4",
      label: "IS-SHAREHOLDER",
      source: "company-4",
      target: "company-3",
      type: "IS-SHAREHOLDER",
    },
  },
  {
    data: {
      id: "is-shareholder-5",
      label: "IS-SHAREHOLDER",
      source: "owner-3",
      target: "company-5",
      type: "IS-SHAREHOLDER",
    },
  },
  {
    data: {
      id: "is-shareholder-6",
      label: "IS-SHAREHOLDER",
      source: "owner-3",
      target: "company-6",
      type: "IS-SHAREHOLDER",
    },
  },
  {
    data: {
      id: "is-shareholder-7",
      label: "IS-SHAREHOLDER",
      source: "company-6",
      target: "company-8",
      type: "IS-SHAREHOLDER",
    },
  },
  {
    data: {
      id: "is-shareholder-8",
      label: "IS-SHAREHOLDER",
      source: "company-5",
      target: "company-7",
      type: "IS-SHAREHOLDER",
    },
  },
  {
    data: {
      id: "is-shareholder-9",
      label: "IS-SHAREHOLDER",
      source: "company-7",
      target: "company-8",
      type: "IS-SHAREHOLDER",
    },
  },
  {
    data: {
      id: "transaction-1",
      label: "IS-TRANSACTION",
      source: "company-5",
      target: "company-4",
      type: "IS-TRANSACTION",
    },
  },
  {
    data: {
      id: "transaction-2",
      label: "IS-TRANSACTION",
      source: "company-7",
      target: "company-4",
      type: "IS-TRANSACTION",
    },
  },
  {
    data: {
      id: "transaction-3",
      label: "IS-TRANSACTION",
      source: "company-8",
      target: "company-3",
      type: "IS-TRANSACTION",
    },
  },
  {
    data: {
      id: "transaction-4",
      label: "IS-TRANSACTION",
      source: "company-8",
      target: "company-3",
      type: "IS-TRANSACTION",
    },
  },
  {
    data: {
      id: "transaction-5",
      label: "IS-TRANSACTION",
      source: "company-3",
      target: "company-1",
      type: "IS-TRANSACTION",
    },
  },
  {
    data: {
      id: "transaction-6",
      label: "IS-TRANSACTION",
      source: "company-2",
      target: "company-8",
      type: "IS-TRANSACTION",
    },
  },
  {
    data: {
      id: "transaction-7",
      label: "IS-TRANSACTION",
      source: "company-7",
      target: "company-4",
      type: "IS-TRANSACTION",
    },
  },
];

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
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <CytoscapeGraph
        nodes={nodes}
        edges={edges}
        style={style}
        layout={"cola"}
      />
    </div>
  );
};

export default Graph;
