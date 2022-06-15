import React from "react";
import ReactFlow from "react-flow-renderer";

const nodes = [
  {
    id: "1",
    data: { label: "Hi" },
    style: {
      color: "black",
      fontSize: "15px",
      fontWeight: "bold",
      backgroundColor: "cyan",
      fontFamily: "monospace",
    },
    position: { x: 50, y: 50 },
  },
  {
    id: "2",
    data: {
      label:
        "Hello user, Choose something \
    (1) Go on a ride \
    (2) Date someone\
    (3) Go to concert",
    },
    style: {
      color: "red",
      fontSize: "15px",
      fontWeight: "bold",
      backgroundColor: "yellow",
      fontFamily: "monospace",
    },
    position: { x: 200, y: 140 },
  },
];
const edges = [{ id: "e1-2", source: "1", target: "2", type: "step" }];

const graphStyles = { width: "100%", height: "500px" };

function Graph() {
  return (
    <>
      <ReactFlow nodes={nodes} edges={edges} style={graphStyles} />
    </>
  );
}

export default Graph;
