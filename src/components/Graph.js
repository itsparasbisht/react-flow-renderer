import React from "react";
import ReactFlow, { Controls, MiniMap } from "react-flow-renderer";
import styles from "./graph.module.css";

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
      label: (
        <ol>
          <li>go on a ride</li>
          <li>on a date</li>
          <li>riding</li>
        </ol>
      ),
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
      <ReactFlow nodes={nodes} edges={edges} style={graphStyles}>
        <MiniMap />
        <Controls />
      </ReactFlow>
      <div className={styles.addNodes}>
        <input type="text" />
        <button>Add</button>
      </div>
    </>
  );
}

export default Graph;
