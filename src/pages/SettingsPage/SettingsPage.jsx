import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Card, CardBody, CardHeader, Container, FormControl, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, StackDivider, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import useAuthStore from '../../store/authStore';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import useShowToast from '../../hooks/useShowToast';

function SettingsPage() {
  const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();
  const [issue, setIssue] = useState({name:'', email:'', problem:''});

  const [isIssueSubmitting, setIsIssueSubmitting] = useState('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  async function submitIssue(values) {
    if(!values.name || !values.email || !values.problem) {
      showToast('Error', 'Please fill all fields', 'error');
      return
    }
    setIsIssueSubmitting(true)
    try{
    const problemsRef = await addDoc(collection(firestore, 'problems'), {
      ...values,
      createdAt: Date.now(),
      userId: authUser.id,
    });
    if (!problemsRef){
      showToast('Error', 'Something went wrong', 'error');
      return
    }
    showToast(
        'Success',
        'Issue submitted successfully, our team reach out to you soon',
        'success'
      );
    }
    catch(error) {
      showToast('Error', error.message, 'error');
    }
    finally{
    setIsIssueSubmitting(false);
      onClose()
    }
  }

  return (
    <Box p={4}>
      <Container size={'lg'}>
        <Breadcrumb py={4} separator={<ArrowForwardIcon />}>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/user/${authUser.id}`} color={'blue.300'}>
              Profile
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Settings</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Card>
          <CardHeader>
            <Heading size="md">Settings</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="md">Facing problem in SnapStore</Heading>
                <Text
                  pt="2"
                  fontSize="sm"
                  textColor={'blue.300'}
                  cursor={'pointer'}
                  onClick={onOpen}
                >
                  click here
                </Text>
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent bg={'gray.900'}>
          <ModalHeader>Facing issue ?</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <Input
                placeholder={'Full Name'}
                size={'md'}
                type={'text'}
                value={issue.name}
                onChange={(e) => setIssue({ ...issue, name: e.target.value })}
              />
            </FormControl>
            <FormControl mt={4}>
              <Input
                placeholder={'Email'}
                size={'md'}
                type={'email'}
                value={issue.email}
                onChange={(e) => setIssue({ ...issue, email: e.target.value })}
              />
            </FormControl>
            <FormControl mt={4}>
              <Textarea
                placeholder={'Type here ...'}
                size={'md'}
                type={'text'}
                value={issue.problem}
                onChange={(e) => setIssue({ ...issue, problem: e.target.value })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button bg={'red.400'} color={'white'} mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={submitIssue} isLoading={isIssueSubmitting}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default SettingsPage;
