import * as React from "react";
import Modal from "@mui/material/Modal";
import styles from "./myModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addNode } from "../features/nodes/nodeSlice";
import { useNavigate } from "react-router-dom";
import addIcon from "../assets/add.png";
import colorsArray from "../resources/colorsArray";

const alphaArr = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export default function MyModal({ handler }) {
  const nodes = useSelector((state) => state.node);

  const [nodeLabel, setNodeLabel] = useState("");
  const [subNodes, setSubNodes] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function invertHex(hex) {
    return (Number(`0x1${hex}`) ^ 0xffffff)
      .toString(16)
      .substr(1)
      .toUpperCase();
  }

  const handleAddNode = () => {
    const newNode = {
      id: nodes.nextId.toString(),
      data: { label: nodeLabel },
      position: { x: nodes.nextX, y: nodes.nextY },
      style: {
        backgroundColor: colorsArray[nodes.nextColor],
        fontWeight: 500,
        fontSize: "17px",
        padding: "5px",
        border: "none",
        color: "#" + invertHex(colorsArray[nodes.nextColor].slice(1)),
        width: "fit-content",
        maxWidth: "300px",
      },
    };
    dispatch(addNode({ newNode }));

    subNodes.length > 0 &&
      subNodes.forEach((node) => {
        if (Object.keys(node).length > 0) {
          let newNode = node;
          dispatch(addNode({ newNode }));
        }
      });

    // close the modal
    setNodeLabel("");
    setSubNodes([]);
    handler.close(false);
  };

  const handleAddSubNode = () => {
    setSubNodes([...subNodes, {}]);
  };

  return (
    <div>
      <Modal
        open={handler.open}
        onClose={() => handler.close(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.container}>
          <label htmlFor="parentNode">Enter Node Label :</label>
          <input
            className={styles.parentNode}
            type="text"
            name="parentNode"
            id="parentNode"
            placeholder="start typing here..."
            onChange={(e) => setNodeLabel(e.target.value)}
          />
          <div className={styles.dividerContainer}>
            <div></div>
            <span>add sub nodes for your current node</span>
            <div></div>
          </div>
          <div className={styles.subNodesContainer}>
            {subNodes.map((subNode, i) => (
              <textarea
                placeholder="sub node label..."
                className={styles.subNode}
                onChange={(e) => {
                  let newSubNode = {
                    id: nodes.nextId.toString() + alphaArr[i],
                    data: { label: e.target.value },
                    position: { x: nodes.nextX, y: nodes.nextY },
                    parentNode: nodes.nextId.toString(),
                    style: {
                      backgroundColor: colorsArray[nodes.nextColor],
                      fontSize: "16px",
                      padding: "3px",
                      border: "none",
                      color:
                        "#" + invertHex(colorsArray[nodes.nextColor].slice(1)),
                    },
                  };

                  let items = subNodes;
                  let item = { ...items[i] };
                  item = newSubNode;
                  items[i] = item;
                  setSubNodes(items);
                }}
              />
            ))}
            <div className={styles.addSubNodes} onClick={handleAddSubNode}>
              <img src={addIcon} alt="" />
            </div>
          </div>
          <button className={styles.addNode} onClick={handleAddNode}>
            Add Node
          </button>
        </div>
      </Modal>
    </div>
  );
}
