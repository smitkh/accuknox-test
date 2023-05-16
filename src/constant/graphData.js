export const nodes = [
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

export const edges = [
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

export const makeNodegroup = () => {
  const personNodes = nodes.filter((item) => item.data.type !== "company");
  const group = nodes.reduce((prev, next) => {
    prev[next.data.group] = prev[next.data.group]
      ? [...prev[next.data.group], { ...next }]
      : [{ ...next }];
    return { ...prev };
  }, {});

  const newNodes = Object.keys(group).map((item) => ({
    data: {
      id: `${item}`,
      label: `${item} group`,
      group: `${item} group`,
      type: "company group",
    },
  }));

  const finalNode = [...personNodes, ...newNodes];

  const newEdges = edges.reduce((prev, next) => {
    if (
      next.data.type === "IS-SHAREHOLDER" &&
      next.data.source.includes("company") &&
      next.data.target.includes("company")
    ) {
      return [...prev];
    } else {
      const modifyEdge = {
        data: {
          ...next.data,
          source: next.data.source.includes("company")
            ? nodes.find((item) => item.data.id === next.data.source)?.data
                .group
            : next.data.source,
          target: next.data.target.includes("company")
            ? nodes.find((item) => item.data.id === next.data.target)?.data
                .group
            : next.data.target,
        },
      };
      return [...prev, modifyEdge];
    }
  }, []);

  return { nodes: finalNode, edges: newEdges };
};
