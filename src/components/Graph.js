import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  MiniMap,
} from "react-flow-renderer";
import styles from "./graph.module.css";

const initialNodes = [
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
  {
    id: "3",
    data: { label: "hello" },
    style: {
      color: "black",
      fontSize: "15px",
      fontWeight: "bold",
      backgroundColor: "cyan",
      fontFamily: "monospace",
    },
    position: { x: 550, y: 50 },
  },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const graphStyles = { width: "100%", height: "500px" };

function Graph() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((ns) => applyNodeChanges(changes, ns)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
    []
  );
  const onConnect = useCallback((connection) =>
    setEdges((eds) => addEdge(connection, eds))
  );

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        style={graphStyles}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <MiniMap />
        <Controls />
      </ReactFlow>
      <div className={styles.addNodes}></div>
    </>
  );
}

export default Graph;
