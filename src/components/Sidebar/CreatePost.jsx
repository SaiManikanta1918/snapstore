import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import useShowToast from "../../hooks/useShowToast";
import useCreatePost from "../../hooks/useCreatePost";
import { Field, Formik, useFormik } from "formik";
import FileUploader from "../common/FileUploader";
import usePreviewImg from "../../hooks/usePreviewImg";
import { Link } from "react-router-dom";

const CreatePost = ({ post }) => {
  const showToast = useShowToast();
  const { isLoading, handleCreatePost } = useCreatePost();
  const { handleImageChange, selectedFile } = usePreviewImg();

  const formik = useFormik({
    initialValues: {
      caption: "",
      tags: [],
      location: "",
      file: null,
    },
  });

  const handlePostCreation = async (values) => {
    try {
      values.file = selectedFile;
      await handleCreatePost(values);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  const renderTextOnly = true;
  return renderTextOnly ? (
    <Text fontSize={"5xl"} color={"blue.300"}>
      This page is under construction
    </Text>
  ) : (
    <Container py={{ base: 0, md: 10 }} maxW={"container.lg"}>
      <Box>
        <Text my={4} color={"white"} fontSize={"4xl"}>
          Create Post
        </Text>
      </Box>
      <Formik
        initialValues={formik.initialValues}
        onSubmit={(values) => handlePostCreation(values)}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <FormLabel htmlFor="caption">Caption</FormLabel>
                <Field as={Input} id="caption" name="caption" />
              </FormControl>
              <FormControl isInvalid={!!errors.password && touched.password}>
                <FormLabel htmlFor="tags">Tags (separated by comma) </FormLabel>
                <Field
                  as={Input}
                  id="tags"
                  name="tags"
                  validate={(value) => {
                    let error;
                    console.log("value", value);

                    return error;
                  }}
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="file">Photo</FormLabel>
                <FileUploader
                  fieldChange={(files) => {
                    setFieldValue("file", files[0]), handleImageChange(files);
                  }}
                  mediaUrl={post?.imageURL}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="location">Location</FormLabel>
                <Field as={Input} id="location" name="location" />
              </FormControl>
              <Flex justifyContent={"end"} width={"100%"} gap={4} mt={10}>
                <Button type="button" bg="whiteAlpha.300" disabled={isLoading}>
                  <Link to="/">Cancel</Link>
                </Button>
                <Button type="submit" colorScheme="purple" disabled={isLoading}>
                  Submit
                </Button>
              </Flex>
            </VStack>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default CreatePost;



























