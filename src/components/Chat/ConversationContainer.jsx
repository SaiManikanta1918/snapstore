import { SnapStoreLoader } from '../Loaders';
import useGetChat from '../../hooks/createhooks/useGetChat';
import ChatHeader from './ChatHeader';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import { Box } from '@chakra-ui/react';
import { useRef } from 'react';

// const style = {
//   message: `flex items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full`,
//   name: `fixed mt-[-4rem] text-gray-600 text-xs`,
//   sent: `bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full`,
//   received: `bg-[#e5e5ea] text-black float-left rounded-br-full `,
// };

const ConversationContainer = ({ chatId }) => {
  const scrollRef = useRef();
  const { isLoading, messages } = useGetChat(chatId);

  if (isLoading) {
    return <SnapStoreLoader />;
  }

  return (
    <Box flex={1} display={'flex'} flexDirection={'column'} position={'relative'}>
      <ChatHeader />
      <ChatBody messages={messages} />
      {/* <span id="scroll-chat" ref={scrollRef}></span> */}
      <ChatFooter chatId={chatId} scrollRef={scrollRef} />
    </Box>
  );
};

export default ConversationContainer;
