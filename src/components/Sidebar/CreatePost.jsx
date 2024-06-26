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
} from '@chakra-ui/react';
import useShowToast from '../../hooks/useShowToast';
import useCreatePost from '../../hooks/createhooks/useCreatePost';
import { Field, Formik } from 'formik';
import FileUploader from '../common/FileUploader';
import usePreviewImg from '../../hooks/usePreviewImg';
import { Link } from 'react-router-dom';

const CreatePost = ({ post }) => {
  const showToast = useShowToast();
  const { isLoading, handleCreatePost } = useCreatePost();
  const { handleImageChange, selectedFile } = usePreviewImg();

  const handlePostCreation = async (values) => {
    try {
      values.file = selectedFile;
      await handleCreatePost(values);
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  return (
    <Container py={{ base: 0, md: 10 }} maxW={'container.lg'}>
      <Box display={'flex'}>
        <img src="/add-post.svg" width={36} height={36} alt="add post" />
        <Text my={4} color={'white'} fontSize={'4xl'} pl={4}>
          Create Post
        </Text>
      </Box>
      <Formik
        initialValues={{
          caption: '',
          tags: [],
          location: '',
          file: null,
        }}
        onSubmit={(values) => handlePostCreation(values)}
      >
        {({ handleSubmit, errors, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <VStack spacing={4} align="flex-start">
              <FormControl>
                <FormLabel htmlFor="caption">Caption</FormLabel>
                <Field as={Input} id="caption" name="caption" />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="tags">Tags (separated by comma) </FormLabel>
                <Field
                  as={Input}
                  id="tags"
                  name="tags"
                  placeholder="Cricket, Coding, Teaching, App development"
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="file">Photo</FormLabel>
                <FileUploader
                  fieldChange={(files) => {
                    setFieldValue('file', files[0]), handleImageChange(files);
                  }}
                  mediaUrl={post?.imageURL}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="location">Location</FormLabel>
                <Field as={Input} id="location" name="location" />
              </FormControl>
              <Flex justifyContent={'end'} width={'100%'} gap={4} mt={10}>
                <Button type="button" bg="whiteAlpha.300" isDisabled={isLoading}>
                  <Link to="/">Cancel</Link>
                </Button>
                <Button type="submit" colorScheme="purple" isLoading={isLoading}>
                  Create
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
