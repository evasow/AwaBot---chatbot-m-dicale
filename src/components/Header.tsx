import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header: React.FC = () => {
  return (
    <AppBar 
      position="static"
      sx={{
        background: "linear-gradient(90deg, #6a11cb 0%, #e6d5f7 100%)",
        boxShadow: "none",
        marginBottom: "4px",
        borderRadius: "5px",
        marginTop: "10px",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontWeight: "bold",
            color: "#fff",
           
          }}
        >
          💬 AwaBot - Assistant Santé
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;