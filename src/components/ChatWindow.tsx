import React from "react";
import { Avatar, Box, List, ListItem, Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { motion } from "framer-motion";

interface Message {
  sender: "user" | "ChatGPT";
  message: string;
  timestamp: string;
}

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isTyping }) => {
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        padding: 2,
        backgroundColor: "#f7f9fc",
       // boxShadow:
        //border: "1px solid #e3e6f0",
        borderRadius: "8px",
      }}
    >
      <List>
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate="visible"
            variants={messageVariants}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
             <ListItem key={index} sx={{ justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
            
            {/* Avatar pour chaque message */}
            {msg.sender === "ChatGPT" && (
              <Avatar sx={{ bgcolor: "#4caf50", mr: 1 }}>🤖</Avatar>
            )}
              <Box
                sx={{
                  maxWidth: "75%",
                  display: "inline-block",
                  backgroundColor:
                    msg.sender === "user" ? "#c8e6ff" : "#e9f5e9",
                  borderRadius: "18px",
                  padding: "12px 16px",
                  wordBreak: "break-word",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <Typography
                variant="body1"
                sx={{
                    fontSize: "1rem",
                    color: msg.sender === "user" ? "#0d47a1" : "#2e7d32",
                }}
                >
                {msg.message.split("\n").map((line, i) => {
                    // Si la ligne commence par un numéro suivi d'un point (ex: "1. Texte")
                    if (line.match(/^\d+\.\s/)) {
                    return (
                        <Box key={i} sx={{ fontWeight: "bold", marginTop: "12px" }}>
                        {line}
                        </Box>
                    );
                    }
                    // Si la ligne commence par un tiret (ex: "- élément de liste")
                    else if (line.match(/^-\s/)) {
                    return (
                        <Box key={i} sx={{ paddingLeft: "20px", marginTop: "5px" }}>
                        • {line.replace(/^-\s/, "")} {/* Remplace le tiret par un point */}
                        </Box>
                    );
                    }
                    // Affichage normal de la ligne
                    else {
                    return (
                        <React.Fragment key={i}>
                        {line}
                        <br />
                        </React.Fragment>
                    );
                    }
                })}
                </Typography>

                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{ display: "block", marginTop: "8px" }}
                >
                  {msg.timestamp}
                </Typography>
              </Box>
                 {/* Avatar pour l'utilisateur */}
                {msg.sender === "user" && (
                <Avatar sx={{ bgcolor: "#1e88e5", ml: 1 }}>👤</Avatar>
                )}
            </ListItem>
          </motion.div>
        ))}

        {isTyping && (
          <ListItem sx={{ justifyContent: "flex-start" }}>
            <Box
              sx={{
                maxWidth: "75%",
                display: "flex",
                backgroundColor: "#e9f5e9",
                borderRadius: "18px",
                padding: "12px 16px",
                alignItems: "center",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              >
                <MoreHorizIcon sx={{ fontSize: 24, color: "grey" }} />
              </motion.div>
              <Typography variant="body2" sx={{ ml: 1, color: "grey" }}>
                AwaBot est en train d'écrire
              </Typography>
            </Box>
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default ChatWindow;