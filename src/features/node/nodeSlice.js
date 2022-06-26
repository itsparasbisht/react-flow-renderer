import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [
    {
      id: "1",
      type: "input",
      data: { label: "hello" },
      position: { x: 250, y: 5 },
      className: "light",
    },
  ],
  nextId: 2,
  nextX: 300,
  nextY: 20,
};

const nodeSlice = createSlice({
  name: "node",
  initialState,
});

export default nodeSlice.reducer;
