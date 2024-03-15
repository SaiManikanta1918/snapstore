import { Box, Container, Stack } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

const AuthPage = () => (
  <Container
    maxW="lg"
    py={{ base: "12", md: "24" }}
    px={{ base: "0", sm: "8" }}
  >
    <Stack spacing="8">
      <Stack spacing="6"></Stack>
      <Box
        py={{ base: "0", sm: "8" }}
        px={{ base: "4", sm: "10" }}
        bg={{ base: "transparent", sm: "bg.surface" }}
        boxShadow={{ base: "none", sm: "md" }}
        borderRadius={{ base: "none", sm: "xl" }}
      >
        <Stack spacing="6">
          <Stack spacing="5">
            <AuthForm />
          </Stack>
        </Stack>
      </Box>
    </Stack>
  </Container>
);

export default AuthPage;


