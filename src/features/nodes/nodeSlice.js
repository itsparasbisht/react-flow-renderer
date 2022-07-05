import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [],
  nextId: 2,
  nextX: 80,
  nextY: 40,
  nextColor: 1,
};

const nodeSlice = createSlice({
  name: "node",
  initialState,
  reducers: {
    addNode: (state, { payload }) => {
      state.nodes.push(payload.newNode);
      state.nextId++;
      state.nextX += 20;
      state.nextY += 20;
      state.nextColor += 1;
    },
    onDrag: (state, { payload }) => {
      state.nodes = [];
      state.nodes = payload.nodesArray;
    },
  },
});

export const { addNode, onDrag } = nodeSlice.actions;

export default nodeSlice.reducer;
