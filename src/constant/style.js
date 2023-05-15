import user from '../images/user.svg'
import company from '../images/company.svg'

const isShareholderType = "IS-SHAREHOLDER";

const getNodeColor = (node) => {
  const group = node.data("group");
  if (group === "purple") {
    return "#67328E";
  }
  if (group === "green") {
    return "#328E5B";
  }
  return "#DE8B53";
};

const getEdgeColor = (edge) => {
  
  if (edge.data("type") === isShareholderType) {
    return "#89C7D6";
  }
  return "#8E6538";
};

const getIcon = (node) => {
    if (node.data('type').includes('company') ) {
        return company;
      }
      return user;
}

export const style = [
  {
    selector: "node",
    style: {
      label: "data(label)",
      "text-valign": "bottom",
      "text-halign": "center",
      color: "#7B7B7B",
      "font-size": 16,
      "border-width": 5,
      "border-color": function (ele) {
        return getNodeColor(ele);
      },
    //   "text-margin-y": "5px",
      padding: 10,
      "text-wrap": "wrap",
      "font-weight": 700,
      "text-overflow-wrap": "anywhere",
      'background-image': function (ele) {
        return getIcon(ele);
      },
      'background-height': '35px',
      'background-width': '35px',
      'background-fit':'none',
      "background-opacity": 0.3,
      "background-repeat": "no-repeat",
      "background-clip": "none",
      'background-color' :function (ele) {
        return getNodeColor(ele);
      }
    },
  },
  {
    selector: 'edge',
    style: {
      width: '2px',
      'line-color': function (ele) {
        return getEdgeColor(ele);
      },
      'curve-style': 'bezier',
    },
  },
  {
    selector: "node[label]",
    style: {
      content: "data(label)",
    },
  },
];
