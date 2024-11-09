import  { useState } from "react";

import { createCard } from "../services/cardsService"; 

import {
  Button,
  Box,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";

const Cards = ({ id, setCards }) => {
  const [error, setError] = useState(null);
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [cardName, setCardName] = useState("");
  const [toast, setToast] = useState({ open: false, message: "", severity: "" });


  //Creating card
  const handleCreateCard = async () => {
    try {
      const newCard = await createCard(cardName, id); 
      setCards((prevCards) => [...prevCards, newCard]);
      setError(null);
      setIsInputVisible(false);
      setCardName("");
      setToast({
        open: true,
        message: "Card created successfully.",
        severity: "success",
      });
    } catch (error) {
      setError(error.message);
      setToast({
        open: true,
        message: "Error creating card.",
        severity: "error",
      });
    }
  };

  const handleToastClose = () => setToast({ ...toast, open: false });

  return (
    <Box mb={4}>
      {isInputVisible ? (
        <Box sx= {{ display: "flex", flexDirection:"column",gap:2, mt:2 }} >
          <TextField
            placeholder="Enter card name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            variant="outlined"
            size="small"
            error={!!error}
            helperText={error}
            fullWidth
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={handleCreateCard}
            variant="contained"
            color="primary"
          >
            Create Card
          </Button>
          <Button
            onClick={() => setIsInputVisible(false)}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          </Box>
        </Box>
      ) : (
        <Button
          onClick={() => setIsInputVisible(true)}
          variant="contained"
          color="primary"
          style={{color:"white" }}
        >
          + Add new Card
        </Button>
      )}

      <Snackbar open={toast.open} autoHideDuration={6000} onClose={handleToastClose}>
        <Alert onClose={handleToastClose} severity={toast.severity} sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Cards;
