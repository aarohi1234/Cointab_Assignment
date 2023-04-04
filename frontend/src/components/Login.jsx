import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Flex,
  Button,
  Heading,
  useToast,
  Box,
  Avatar,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Data = {
  email: "",
  password: "",
};
export const Login = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [userLogin, setUserLogin] = useState(Data);
  const [isLoginSuccess, setIsLoginSuccess] = useState({
    message: "",
    token: null,
    loggedIn: false,
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { key, value } = e.target;
    setUserLogin({
      ...userLogin,
      [key]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userLogin.email == "" || userLogin.password == "") {
      toast({
        title: "Invalid Credentials",
        description: "Please fill the proper Details",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } else {
      setLoading(true);
      fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
      })
        .then((res) => res.json())
        .then((res) => setIsLoginSuccess(res))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (isLoginSuccess.loggedIn) {
      localStorage.setItem("token", isLoginSuccess.token);
      localStorage.setItem("email", isLoginSuccess.email);
      toast({
        title: "Login Sucessfully",

        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      navigate("/");
    }
    if (isLoginSuccess.loggedIn == false && isLoginSuccess.message != "") {
      toast({
        title: "Too many Attempts.",
        description: `${isLoginSuccess.message}`,
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  }, [isLoginSuccess]);

  if (loading) {
    return (
      <Avatar
        position="absolute"
        marginLeft="0%"
        src="https://media.tenor.com/UnFx-k_lSckAAAAM/amalie-steiness.gif"
        alt="giff"
      />
    );
  }

  return (
    <>
      <Box display="flex" justifyContent="center" height="0vh" marginTop="40px">
        {loading}
      </Box>

      <Flex
        alignItems="center"
        justifyContent="center"
        height="50vh"
        flexDirection={"column"}>
        <Heading m={"2rem"}>Login</Heading>
        <FormControl
          p={55}
          boxShadow="md"
          border="4px dotted skyblue"
          w={"30%"}
          m="auto"
          h={"350px"}
          mt={7}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email address"
            id="email"
            name="email"
            onChange={handleChange}
          />

          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
            onChange={handleChange}
          />

          <Button
            mt="15px"
            width="full"
            type="submit"
            colorScheme="blue"
            onClick={handleSubmit}>
            Login
          </Button>

          <FormHelperText>
            Please create a account ?{" "}
            <Link
              to={"/signup"}
              style={{
                color: "teal",
              }}>
              Signup
            </Link>
          </FormHelperText>
        </FormControl>
      </Flex>
    </>
  );
};
