import { Box } from '@chakra-ui/react';
import ChatMessage from './ChatMessage';
import useAuthStore from '../../store/authStore';

const ChatBody = ({ messages }) => {
  const authUser = useAuthStore((state) => state.user);

  return (
    <Box
      height={'100%'}
      overflow={'auto'}
      px={{ md: 4 }}
      py={{ base: 14, md: 20 }}
      display={'flex'}
      flexDirection={'column'}
    >
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} isSent={message.senderId === authUser.uid} />
      ))}
    </Box>
  );
};

export default ChatBody;
