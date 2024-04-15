import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import ConversationContainer from './ConversationContainer';
import ChatList from './ChatList';

const Chat = () => {
  const { selectedChat } = useParams();

  return (
    <Box display={'flex'} h={'100%'}>
      {selectedChat ? <ConversationContainer chatId={selectedChat} /> : <ChatList />}
    </Box>
  );
};

export default Chat;
