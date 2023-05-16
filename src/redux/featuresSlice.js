import { createSlice } from "@reduxjs/toolkit";
import { edges, makeNodegroup, nodes } from "../constant/graphData";

export const featuresSlice = createSlice({
  name: "features",
  initialState: {
    allNodesShow: false,
    layout: "cola",
    showEdges: false,
    nodes: nodes,
    edges: edges,
    // cytoscapeInstance: null,
  },
  reducers: {
    setData: (state, action) => {
      const { nodes, edges } = action.payload;
      state.nodes = nodes;
      state.edges = edges;
    },
    selectLayout: (state, action) => {
      state.layout = action.payload;
    },
    toggleEdges: (state, action) => {
      state.showEdges = !state.showEdges;
    },
    groupNode: (state) => {
      state.allNodesShow = !state.allNodesShow;
    },
  },
});

export const { groupNode, selectLayout, setData, toggleEdges } =
  featuresSlice.actions;

export default featuresSlice.reducer;
