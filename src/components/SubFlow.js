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
    type: "input",
    data: { label: "hello" },
    position: { x: 250, y: 5 },
    className: "light",
  },
  {
    id: "2",
    data: { label: "Choose your options" },
    position: { x: 100, y: 100 },
    className: "light",
    style: { backgroundColor: "rgba(255, 0, 0, 0.2)", width: 600, height: 100 },
  },
  {
    id: "2a",
    data: { label: "1. login" },
    position: { x: 10, y: 50 },
    parentNode: "2",
  },
  {
    id: "2b",
    data: { label: "2. Signup" },
    position: { x: 200, y: 50 },
    parentNode: "2",
  },
  {
    id: "2c",
    data: { label: "3. Assistance" },
    position: { x: 400, y: 50 },
    parentNode: "2",
  },
  {
    id: "3",
    data: { label: "Enter your password" },
    position: { x: 400, y: 200 },
    parentNode: "2",
  },
  {
    id: "4",
    data: { label: "Enter your email" },
    position: { x: 400, y: 300 },
    parentNode: "2",
  },
  {
    id: "5",
    data: { label: "Enter your Phone no." },
    position: { x: 400, y: 400 },
    parentNode: "2",
  },
];
const initialEdges = [];

const graphStyles = { width: "100%", height: "500px" };

function SubFlow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [newNode, setNewNode] = useState("");
  const [nodeId, setNodeId] = useState(1);
  const [x, setX] = useState(500);
  const [y, setY] = useState(50);

  const onNodesChange = useCallback(
    (changes) => setNodes((ns) => applyNodeChanges(changes, ns)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
    []
  );

  const onConnect = (connection) => setEdges((eds) => addEdge(connection, eds));

  console.log(nodes);
  console.log(edges);

  const addNode = () => {
    setNewNode("");
    const obj = {
      id: nodeId.toString(),
      data: { label: newNode },
      style: {
        color: "black",
        fontSize: "15px",
        fontWeight: "bold",
        backgroundColor: "white",
        fontFamily: "monospace",
      },
      position: { x: x, y: y },
    };
    setNodes([...nodes, obj]);
    setNodeId(nodeId + 1);
    setY(y + 100);
  };

  return (
    <>
      <ReactFlow
        className={styles.flowDiv}
        nodes={nodes}
        edges={edges}
        style={graphStyles}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        preventScrolling={false}
      >
        <Controls />
      </ReactFlow>
      <div className={styles.addNodes}>
        <input
          value={newNode}
          onChange={(e) => setNewNode(e.target.value)}
          type="text"
        />
        <button onClick={addNode}>add</button>
      </div>
    </>
  );
}

export default SubFlow;
