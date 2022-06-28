import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  MiniMap,
} from "react-flow-renderer";
import { useSelector } from "react-redux";
import styles from "./graph.module.css";
import MyModal from "./MyModal";

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
  const nodeSlice = useSelector((state) => state.node);
  const [nodes, setNodes] = useState(nodeSlice.nodes);
  console.log(nodes);

  useEffect(() => {
    setNodes(nodeSlice.nodes);
  }, [nodeSlice]);

  const [edges, setEdges] = useState(initialEdges);

  // handle modal
  const [openModal, setOpenModal] = useState(false);

  const onNodesChange = useCallback(
    (changes) => setNodes((ns) => applyNodeChanges(changes, ns)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((es) => applyEdgeChanges(changes, es)),
    []
  );

  const onConnect = (connection) => setEdges((eds) => addEdge(connection, eds));

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
        <button onClick={() => setOpenModal(true)}>add</button>
      </div>
      <MyModal handler={{ open: openModal, close: setOpenModal }} />
    </>
  );
}

export default SubFlow;
