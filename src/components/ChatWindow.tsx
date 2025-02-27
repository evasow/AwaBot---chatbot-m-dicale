import React, { useEffect, useRef } from "react";
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
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        padding: 2,
        backgroundColor: "white",
        borderRadius: "8px",
        maxHeight: "800px",
        // border: "1px solid #b8d0fa",
        //boxShadow: "0 4px 10px rgb(171, 89, 252)",
      }}
    >
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index} sx={{ justifyContent: msg.sender === "user" ? "flex-end" : "flex-start" }}>
            {msg.sender === "ChatGPT" && <Avatar sx={{ bgcolor: "#6a11cb", mr: 1 }}>
            <span className="material-symbols-outlined">smart_toy</span>
              </Avatar>}
            <Box
              sx={{
                maxWidth: "75%",
                backgroundColor: msg.sender === "user" ? "#6a11cb" : "#e6d5f7",
                borderBottomRightRadius: msg.sender === "user" ? "none" : "18px",
                borderRadius: "18px",
                padding: "12px 16px",
                wordBreak: "break-word",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="body1" sx={{ fontSize: "1rem", color: msg.sender === "user" ? "white" : "black" }}>
                {msg.message.split("\n").map((line, i) => (
                  <React.Fragment key={i}>{line}<br /></React.Fragment>
                ))}
              </Typography>
              <Typography variant="caption" color="textSecondary" sx={{ display: "block", marginTop: "8px" }}>
                {msg.timestamp}
              </Typography>
            </Box>
            {/* {msg.sender === "user" && <Avatar sx={{ bgcolor: "#1e88e5", ml: 1 }}>👤</Avatar>} */}
          </ListItem>
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
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}>
                <MoreHorizIcon sx={{ fontSize: 24, color: "grey" }} />
              </motion.div>
              <Typography variant="body2" sx={{ ml: 1, color: "grey" }}>
                AwaBot est en train d'écrire
              </Typography>
            </Box>
          </ListItem>
        )}
        <div ref={messageEndRef} />
      </List>
    </Box>
  );
};

export default ChatWindow;
