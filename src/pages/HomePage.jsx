import { useEffect, useState } from "react";
import Boards from "../components/Boards";
import { fetchBoards, addBoard } from "../services/boardService";

import {
  Box,
  Typography,
  Modal,
  Button,
  TextField,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";

const HomePage = () => {
  const [boards, setBoards] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [bgColor, setBgColor] = useState("white");
  const [boardName, setBoardName] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const onOpen = () => setIsOpen(true);
  const onClose = () => {
    setBoardName("");
    setIsOpen(false);
  };

  //Fetching Board
  useEffect(() => {
    const loadBoards = async () => {
      try {
        const boardsData = await fetchBoards();
        setBoards(boardsData);
      } catch (error) {
        setError(error.message);
      }
    };
    loadBoards();
  }, []);

  //Creating Board
  const handleCreateBoard = async () => {
    try {
      const newBoard = await addBoard(boardName, bgColor);
      setBoards([...boards, newBoard]);
      setToast({
        open: true,
        message: "Board Created. Your new board has been created.",
        severity: "success",
      });
      onClose();
    } catch (error) {
      setError(error.message);
      setToast({
        open: true,
        message: "Error. An error occurred while creating the board.",
        severity: "error",
      });
    }
  };

  const handleToastClose = () => setToast({ ...toast, open: false });

  return (
    <Box sx={{ pt: "90px", minHeight: "100vh", bgcolor: "black", paddingX: 2 }}>
      <Typography variant="h4" marginY={4} color="white">
        My Trello Boards
      </Typography>

      <Box>
        <Grid container spacing={2}>
          <Grid item>
            <Box
              onClick={onOpen}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "180px",
                height: "60px",
                border: "2px dashed #ccc",
                cursor: "pointer",
                "&:hover": { borderColor: "blue" },
              }}
            >
              <Typography variant="body1" color="white">
                + Create New Board
              </Typography>
            </Box>
          </Grid>
          {boards.map((board) => (
            <Grid item key={board.id}>
              <Boards board={board} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Modal open={isOpen} onClose={onClose}>
        <Box
          sx={{
            bgcolor: "background.paper",
            boxShadow: 24,
            padding: 4,
            borderRadius: 2,
            width: "90%",
            maxWidth: "400px",
            mx: "auto",
            mt: "10%",
          }}
        >
          <Typography variant="h6">Create Board</Typography>
          <Box display="flex" gap={1} marginBottom={2}>
            {[
              "blue",
              "lime",
              "orange",
              "red",
              "purple",
              "pink",
              "green",
              "grey",
            ].map((color) => (
              <Box
                key={color}
                sx={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: color,
                  cursor: "pointer",
                  border: color === bgColor ? "2px solid black" : "none",
                }}
                onClick={() => setBgColor(color)}
              />
            ))}
          </Box>
          <TextField
            fullWidth
            required
            label="Board Title"
            margin="normal"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />

          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <Button variant="contained" onClick={handleCreateBoard}>
              Create Board
            </Button>
            <Button variant="outlined" onClick={onClose}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleToastClose}
      >
        <Alert
          onClose={handleToastClose}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default HomePage;
