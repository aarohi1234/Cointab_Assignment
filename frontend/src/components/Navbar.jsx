import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
export const Navbar = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );
  const handleNavigate = () => {
    navigate("/");
  };
  
  return (
    <div>
      <Box boxShadow="md" p="6">
        <Flex justifyContent={"space-around"} alignItems={"center"}>
          <Link to="/login">
            {" "}
            <Button>Login</Button>{" "}
          </Link>
          <Link to="/">
            {" "}
            <Button>Home</Button>{" "}
          </Link>
          <Link to="/profile">
            {" "}
            <Flex alignItems={"center"} justifyContent={"center"}>
             
              <Image
                onClick={handleNavigate}
                src="https://www.cointab.in/wp-content/uploads/2021/06/cointab_green-1.png"
                alt=""
              />
            </Flex>
          </Link>
        </Flex>
      </Box>
    </div>
  );
};
