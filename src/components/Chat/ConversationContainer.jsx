import { SnapStoreLoader } from '../Loaders';
import useGetChat from '../../hooks/gethooks/useGetChat';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { Box } from '@chakra-ui/react';
import { useRef } from 'react';

const ConversationContainer = ({ chatId }) => {
  const scrollRef = useRef();
  const { isLoading, messages, userData } = useGetChat(chatId);

  if (isLoading || !userData) {
    return <SnapStoreLoader />;
  }

  return (
    <Box flex={1} display={'flex'} flexDirection={'column'} position={'relative'}>
      <ChatHeader user={userData} />
      <ChatBody messages={messages} />
      {/* <span id="scroll-chat" ref={scrollRef}></span> */}
      <ChatFooter chatId={chatId} scrollRef={scrollRef} />
    </Box>
  );
};

export default ConversationContainer;
