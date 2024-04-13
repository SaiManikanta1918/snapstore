import useAuthStore from '../../store/authStore';
import useGetUsers from '../../hooks/gethooks/useGetUsers';
import { Box, Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import ConversationContainer from './ConversationContainer';
import { SnapStoreLoader } from '../Loaders';
import ChatList from './ChatList';

const Chat = () => {
  const { selectedUserId } = useParams();
  const authUser = useAuthStore((state) => state.user);
  const { isLoading, users } = useGetUsers(authUser.followers);

  const renderTextOnly = true;
  if (renderTextOnly) {
    return (
      <Text fontSize={'5xl'} color={'blue.300'}>
        This page is under development
      </Text>
    );
  }

  if (isLoading) {
    return <SnapStoreLoader />;
  }

  return (
    <Box display={'flex'} h={'100%'}>
      {selectedUserId ? (
        <ConversationContainer chatId="KcP32WvvxgZAV1YwEDCv" />
      ) : (
        <ChatList users={users} selectedUserId={selectedUserId} />
      )}
    </Box>
  );
};

export default Chat;
