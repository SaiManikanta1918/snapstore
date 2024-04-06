import { Timestamp, arrayUnion, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../../firebase/firebase';
import { Text, Spinner, Input, Button, InputGroup, InputRightElement, Box } from '@chakra-ui/react';
import useAuthStore from '../../store/authStore';
import { AiOutlineSend } from 'react-icons/ai';

const ConversationContainer = ({ chatId }) => {
  const authUser = useAuthStore((state) => state.user);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);

  async function sendMessage(text) {
    setIsSending(true);
    const chatsRef = doc(firestore, 'chats', chatId);
    const newMessage = {
      message: text,
      createdAt: Timestamp.now(),
      senderId: authUser.uid,
    };
    await updateDoc(chatsRef, {
      messages: arrayUnion(newMessage),
    });
    setInputMessage('');
    setIsSending(false);
  }

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onSnapshot(doc(firestore, 'chats', chatId), (doc) => {
      console.log('doc', doc.data());
      let messages = doc.data().messages;
      console.log('messages', messages);
      setMessages(messages);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box flex={3} p={4} display={'flex'} flexDirection={'column'}>
      <Box height={'100%'} overflow={'auto'}>
        {messages.map((message) => (
          <Text py={1} textAlign={message.senderId === authUser.uid ? 'end' : ''} key={message.id}>
            {message.message}
          </Text>
        ))}
      </Box>
      <Box>
        <InputGroup size={'md'}>
          <Input
            pr="4.5rem"
            size={'lg'}
            value={inputMessage}
            bg={'grey.300'}
            placeholder="Enter text here"
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <InputRightElement width="4.5rem" h={'100%'}>
            <Button
              leftIcon={<AiOutlineSend size={'20px'} />}
              size="sm"
              h={'inherit'}
              disabled={isSending}
              isLoading={isSending}
              _hover={{ bg: 'blue.400' }}
              bg={'blue.300'}
              onClick={() => sendMessage(inputMessage)}
            >
              send
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    </Box>
  );
};

export default ConversationContainer;
