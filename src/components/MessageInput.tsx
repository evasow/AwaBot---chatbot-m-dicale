import React from "react";
import { TextField, Box, IconButton, InputAdornment } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";

interface MessageInputProps {
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({
  inputMessage,
  setInputMessage,
  handleSend,
}) => {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputMessage.trim()) handleSend();
  };

  return (
    <Box sx={{ display: "flex", padding: 1, backgroundColor: "white", width: "100%" }}>
      <form onSubmit={handleFormSubmit} style={{ width: "100%", display: "flex", margin:"20px" }}>
        <TextField
          fullWidth
          variant="outlined"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Tapez un message..."
          sx={{
            borderRadius: "20px",
          
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              backgroundColor: "#fff",
            },

          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    sx={{
                      backgroundColor: "#e0e0e0",  // Icône grisée
                      "&:hover": {
                        backgroundColor: "#b0b0b0",
                      },
                    }}
                  >
                    <AttachFileIcon />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: inputMessage.trim() ? (
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    sx={{
                      color: "#6a11cb",
                      backgroundColor: "#e0e0e0",  // Bouton grisé par défaut
                      "&:hover": {
                        backgroundColor: "#2575fc",
                      },
                      borderRadius: "50%",
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ) : (
                <InputAdornment position="end">
                  <IconButton
                    disabled
                    sx={{
                      color: "#b0b0b0",  // Bouton grisé lorsqu'il est désactivé
                      backgroundColor: "#e0e0e0",
                      borderRadius: "50%",
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </form>
    </Box>
  );
};

export default MessageInput;
