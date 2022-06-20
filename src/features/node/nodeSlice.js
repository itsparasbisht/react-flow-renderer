import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [],
  nodeId: 1,
};

const nodeSlice = createSlice({
  name: "node",
  initialState,
});

export default nodeSlice.reducer;
