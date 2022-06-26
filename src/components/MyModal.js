import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Stack, TextField } from "@mui/material";
import styles from "./myModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addNode } from "../features/node/nodeSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function MyModal({ handler }) {
  const nodes = useSelector((state) => state.node);

  const [nodeLabel, setNodeLabel] = useState("");

  const dispatch = useDispatch();

  const handleAddNode = () => {
    const newNode = {
      id: nodes.nextId.toString(),
      type: "input",
      data: { label: nodeLabel },
      position: { x: nodes.nextX, y: nodes.nextY },
    };

    dispatch(addNode({ newNode }));

    // close the modal
    handler.close(false);
  };

  return (
    <div>
      <Modal
        open={handler.open}
        onClose={() => handler.close(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Enter label for the node"
            variant="outlined"
            value={nodeLabel}
            onChange={(e) => setNodeLabel(e.target.value)}
          />
          <Typography variant="subtitle2" textAlign={"center"} mt={2}>
            You can add sub nodes to your current node
          </Typography>
          <div className={styles.subNodesContainer}>
            <TextField
              size="small"
              id="outlined-basic"
              label="sub node 1"
              variant="outlined"
            />
            <TextField
              size="small"
              id="outlined-basic"
              label="sub node 2"
              variant="outlined"
            />
            <TextField
              size="small"
              id="outlined-basic"
              label="sub node 3"
              variant="outlined"
            />
          </div>
          <Stack alignItems={"center"}>
            <Button
              sx={{
                width: "200px",
                marginTop: "10px",
                backgroundColor: "black",
              }}
              disableElevation
              variant="contained"
              onClick={handleAddNode}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
