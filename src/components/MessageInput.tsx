import React from "react";
import { TextField, Box, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

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
  // Fonction pour gérer l'envoi du message via le formulaire
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de l'envoi du formulaire
    handleSend(); // Appel de la fonction handleSend pour envoyer le message
  };

  return (
    <Box
      sx={{
        display: "flex",
        padding: 2,
        backgroundColor: "#f7f9fc",
       // borderTop: "1px solid #e3e6f0",
      }}
    >
      {/* Formulaire qui capture l'événement submit */}
      <form onSubmit={handleFormSubmit} style={{ width: "100%", display: "flex" }}>
        <TextField
          fullWidth
          variant="outlined"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Tapez un message..."
          sx={{
            marginRight: 2,
            borderRadius: "20px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              backgroundColor: "#fff",
            },
          }}
        />
        <IconButton
          type="submit" // Soumettre le formulaire au clic
          sx={{
            //backgroundColor: "#6a11cb",
            color: "#6a11cb",
            "&:hover": {
              backgroundColor: "#2575fc",
            },
            borderRadius: "100%",
          }}
        >
          <SendIcon />
        </IconButton>
      </form>
    </Box>
  );
};

export default MessageInput;
