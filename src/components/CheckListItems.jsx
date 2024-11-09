import { useEffect, useState } from "react";


import {
  fetchCheckItems,
  createCheckItem,
  updateCheckItemStatus,
  deleteCheckItem,
} from "../services/checkListItemService";

import {
  Box,
  Button,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const CheckListItems = ({ checkListId, cardId }) => {
  const [checkItems, setCheckItems] = useState([]);
  const [error, setError] = useState(null);
  const [itemName, setItemName] = useState("");

  useEffect(() => {
    const loadCheckItems = async () => {
      try {
        const data = await fetchCheckItems(checkListId);
        setCheckItems(data);
      } catch (error) {
        setError("Error fetching checklist items.");
      }
    };

    loadCheckItems();
  }, [checkListId]);

  const createCheckListItem = async () => {
    if (!itemName) return;

    try {
      const newItem = await createCheckItem(checkListId, itemName);
      setCheckItems((prevList) => [...prevList, newItem]);

      setItemName("");
    } catch (error) {
      setError("Error creating checklist item.");
    }
  };

  const deleteCheckListItem = async (checkItemId) => {
    try {
          await deleteCheckItem(checkListId, checkItemId);
      setCheckItems((prevList) => prevList.filter((item) => item.id !== checkItemId));

    } catch (error) {
      setError("Error deleting checklist item.");
    }
  };

  const updateCheckListItemStatus = async (checkItemId, newStatus) => {
    try {
       await updateCheckItemStatus(cardId, checkItemId, newStatus);
      setCheckItems((prevList) =>
        prevList.map((item) =>
          item.id === checkItemId
            ? { ...item, state: newStatus ? "complete" : "incomplete" }
            : item
        )
      );
    } catch (error) {
      setError("Failed to update checklist item status.");
    }
  };

  return (
    <Box p={2} sx={{ bgcolor: "grey.200", borderRadius: 2, mt: 2 }}>
      <Typography variant="body1" fontWeight="bold" gutterBottom>
        Checklist Items
      </Typography>
      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}
      <List sx={{ maxHeight: 200, overflowY: "auto", p: 0 }}>
        {checkItems.map((item) => (
          <ListItem
            key={item.id}
            sx={{
              backgroundColor: "grey.300",
              borderRadius: 1,
              mb: 1,
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Checkbox
              checked={item.state === "complete"}
              onChange={() =>
                updateCheckListItemStatus(item.id, item.state !== "complete")
              }
              sx={{ mr: 1 }}
            />
            <ListItemText primary={item.name} />
            <IconButton
              color="error"
              onClick={() => deleteCheckListItem(item.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Box display="flex" alignItems="center" mt={2}>
        <TextField
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="New checklist item"
          size="small"
          fullWidth
          sx={{ bgcolor: "grey.200", mr: 1, borderRadius: 1 }}
        />
      </Box>
      <Box display="flex" alignItems="center" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={createCheckListItem}
        >
          Add Item
        </Button>
      </Box>
    </Box>
  );
};

export default CheckListItems;
