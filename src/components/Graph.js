import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  MiniMap,
} from "react-flow-renderer";
import styles from "./graph.module.css";

const initialNodes = [];
const initialEdges = [];

const graphStyles = { width: "100%", height: "500px" };

function Graph() {
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

  const addNode = () => {
    const obj = {
      id: nodeId,
      data: { label: newNode },
      style: {
        color: "black",
        fontSize: "15px",
        fontWeight: "bold",
        backgroundColor: "cyan",
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
        nodes={nodes}
        edges={edges}
        style={graphStyles}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
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

export default Graph;
