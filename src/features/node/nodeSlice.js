import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [
    {
      id: "1",
      type: "input",
      data: { label: "hello" },
      position: { x: 0, y: 0 },
    },
  ],
  nextId: 2,
  nextX: 300,
  nextY: 20,
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
    },
  },
});

export const { addNode } = nodeSlice.actions;

export default nodeSlice.reducer;
