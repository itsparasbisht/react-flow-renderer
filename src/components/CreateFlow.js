import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Controls,
  MiniMap,
} from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { addNode, onDrag } from "../features/nodes/nodeSlice";
import MyModal from "./MyModal";
import styles from "./createFlow.module.css";

const initialEdges = [];

const graphStyles = { width: "100%", height: "80vh" };

function CreateFlow() {
  const nodeSlice = useSelector((state) => state.node);
  const [nodes, setNodes] = useState(nodeSlice.nodes);
  console.log(nodes);

  const dispatch = useDispatch();

  // nodes from store
  useEffect(() => {
    setNodes(nodeSlice.nodes);
  }, [nodeSlice]);

  useEffect(() => {
    nodes.length > 1 && dispatch(onDrag({ nodesArray: nodes }));
  }, [nodes]);

  const [edges, setEdges] = useState(initialEdges);
  console.log("nodes:", nodes);
  console.log("edges:", edges);
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
      {nodes.length > 0 ? (
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
      ) : (
        <div className={styles.initialAddNodes}>
          <div className={styles.initialAddRow}>
            <h3>Start adding nodes to generate the flow for your ChatBot</h3>
            <button onClick={() => setOpenModal(true)}>ADD</button>
          </div>
        </div>
      )}
      {nodes.length > 0 ? (
        <div className={styles.addNodes}>
          <button onClick={() => setOpenModal(true)}>ADD</button>
        </div>
      ) : (
        ""
      )}
      <MyModal handler={{ open: openModal, close: setOpenModal }} />
    </>
  );
}

export default CreateFlow;
