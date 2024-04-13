import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { AiOutlineSend } from 'react-icons/ai';
import useAuthStore from '../../store/authStore';
import { Timestamp, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { firestore } from '../../firebase/firebase';

const ChatFooter = ({ chatId, scrollRef }) => {
  const authUser = useAuthStore((state) => state.user);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  async function sendMessage(event) {
    event.preventDefault();
    if (!inputMessage) {
      return;
    }
    setIsSending(true);
    const chatsRef = doc(firestore, 'chats', chatId);
    const newMessage = {
      message: inputMessage,
      createdAt: Timestamp.now(),
      senderId: authUser.uid,
    };
    await updateDoc(chatsRef, {
      messages: arrayUnion(newMessage),
    });
    setInputMessage('');
    setIsSending(false);
    console.log('scrollRef.current', scrollRef.current, scrollRef.current.scrollIntoView);
    scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
  }

  return (
    <Box
      px={{ base: 2, md: 4 }}
      py={{ base: 2, md: 5 }}
      position={'absolute'}
      bottom={'0px'}
      width={'100%'}
      bg={'black'}
    >
      <Flex>
        <form style={{ width: '100%' }} onSubmit={sendMessage}>
          <Input
            type="text"
            borderRadius={'20px'}
            value={inputMessage}
            bg={'grey.300'}
            placeholder="Enter text here"
            onChange={(e) => setInputMessage(e.target.value)}
          />
        </form>
        <Button
          ml={4}
          leftIcon={<AiOutlineSend size={'20px'} />}
          isLoading={isSending}
          _hover={{ bg: 'blue.400' }}
          bg={'blue.300'}
          onClick={sendMessage}
        ></Button>
      </Flex>
    </Box>
  );
};

export default ChatFooter;
