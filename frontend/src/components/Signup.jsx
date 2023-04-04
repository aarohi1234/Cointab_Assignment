import {
    FormControl,
    FormLabel,
    FormHelperText,
    Input,
    Flex,
    Button,
    Heading,
    useToast,
    Avatar,
    Box,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  
  export default function Signup() {
    const toast = useToast();
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const [isSignupSuccess,setIsSignupSuccess] = useState({message:"",signedUp:false})
  

    const [signupForm, setSignupForm] = useState({
      email: "",
      password: "",
    });
  
 
    function handleSignup(e) {
      e.preventDefault();
    

    if(signupForm.email == "" || signupForm.password == ""){

        toast({
            title: "failed",
            description: "Please fill the Valid Details",
            status: "error",
            duration:2000,
            isClosable: true,
            position: "top",
          });
        

    }else{
        setLoading(true)
        fetch("http://localhost:8080/signup",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupForm)
        })
        .then((res)=>res.json())
        .then((res)=>setIsSignupSuccess(res))
        .finally(()=>setLoading(false))
    }  
    }


  
    function handleChange(e) {
      setSignupForm({ ...signupForm, [e.target.id]: e.target.value });
    }


    useEffect(()=>{
                if(isSignupSuccess.signedUp){
                  
                    toast({
                      title: "Account created.",
                      description: "Account has been created",
                        status: "success",
                        duration:2000,
                        isClosable: true,
                        position: "top",
                      });
                      navigate("/login");
                }
                if(isSignupSuccess.signedUp==false && isSignupSuccess.message!=""){
                    toast({
                        title: "Invalid credentials",
                        
                        status: "warning",
                        duration:2000,
                        isClosable: true,
                        position: "top",
                      });
                }
            },[isSignupSuccess])


            if(loading){

                return <Avatar position='absolute' marginLeft='0%' src="https://media.tenor.com/K2UGDd4acJUAAAAC/load-loading.gif" alt="gif" />
                
            }

    return (

        <>

        <Box display="flex" justifyContent='center' height='0vh' margin='auto'  >
          
           {loading}
           </Box>

      <Flex
        alignItems="center"
        justifyContent="center"
        height="50vh"
        flexDirection={"column"}
      >
        <Heading m={"2rem"}>Signup</Heading>
        <FormControl
          p={55} boxShadow="md" border="4px dotted skyblue"  w={"30%"} m="auto" h={"350px"} mt={7}
        >
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email address"
            id="email"
            onChange={handleChange}
          />
  
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            id="password"
            onChange={handleChange}
          />
  
          <Button
            mt="15px"
            width="full"
            type="submit"
            colorScheme="blue"
            onClick={handleSignup}
          >
            Signup
          </Button>

          <FormHelperText>
            Already have an account ?{" "}
            <Link
              to={"/login"}
              style={{
               
                color: "blue",
              }}
            >
              Login 
            </Link>
          </FormHelperText>
        </FormControl>
      </Flex>

      </>
    );
  }
  