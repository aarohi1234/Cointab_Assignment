import { Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Homepage = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const token = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Box fontSize="20px" mt="30px">
          {email}
        </Box>

        <Box>
          {token ? (
            <Button
              position="absolute"
              mt="-64px"
              right={49}
              background="teal"
              color="white"
              onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
};
