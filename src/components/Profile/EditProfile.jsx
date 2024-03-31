import {
  Avatar,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Switch,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import useAuthStore from '../../store/authStore';
import usePreviewImg from '../../hooks/usePreviewImg';
import useEditProfile from '../../hooks/useEditProfile';
import useShowToast from '../../hooks/useShowToast';

const EditProfile = ({ isOpen, onClose }) => {
  const authUser = useAuthStore((state) => state.user);
  const [inputs, setInputs] = useState({
    fullName: authUser.fullName,
    username: authUser.username,
    bio: authUser.bio,
    isPrivate: authUser.isPrivate,
  });
  const fileRef = useRef(null);
  const { handleImageChange, selectedFile, setSelectedFile } = usePreviewImg();
  const { isUpdating, editProfile } = useEditProfile();
  const showToast = useShowToast();

  const handleEditProfile = async () => {
    try {
      await editProfile(inputs, selectedFile);
      setSelectedFile(null);
      onClose();
    } catch (error) {
      showToast('Error', error.message, 'error');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent bg={'gray.900'}>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <Stack direction={['column', 'row']} spacing={6}>
                <Center>
                  <Avatar
                    size="xl"
                    src={selectedFile || authUser.profilePicURL}
                    name={authUser.fullName}
                    border={'2px solid white '}
                  />
                </Center>
                <Center w="full">
                  <Button onClick={() => fileRef.current.click()}>Edit Profile Picture</Button>
                </Center>
                <Input type="file" hidden ref={fileRef} onChange={handleImageChange} />
              </Stack>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize={'md'}>Full Name</FormLabel>
              <Input
                placeholder={'Full Name'}
                size={'md'}
                type={'text'}
                value={inputs.fullName || authUser.fullName}
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize={'md'}>Username</FormLabel>
              <Input
                placeholder={'Username'}
                size={'md'}
                type={'text'}
                value={inputs.username || authUser.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel fontSize={'md'}>Bio</FormLabel>
              <Input
                placeholder={'Bio'}
                size={'md'}
                type={'text'}
                value={inputs.bio || authUser.bio}
                onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
              />
            </FormControl>
            <FormControl display="flex" alignItems="center" mt={8}>
              <FormLabel htmlFor="email-alerts" mb="0">
                Private Account
              </FormLabel>
              <Switch
                colorScheme="blue"
                size={'md'}
                id="email-alerts"
                isChecked={inputs.isPrivate}
                onChange={(e) => setInputs({ ...inputs, isPrivate: e.target.checked })}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button bg={'red.400'} color={'white'} mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleEditProfile} isLoading={isUpdating}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfile;
