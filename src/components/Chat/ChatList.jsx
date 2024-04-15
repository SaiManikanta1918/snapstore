import { Flex, Text } from '@chakra-ui/react';
import ChatListItem from './ChatListItem';
import useGetChatUsers from '../../hooks/gethooks/useGetChatUsers';
import { SnapStoreLoader } from '../Loaders';

const ChatList = () => {
  const { isLoading, users } = useGetChatUsers();

  if (isLoading) {
    return <SnapStoreLoader />;
  }

  if (!isLoading && !users.length) {
    return (
      <Text p={4} color={'blue.300'} fontWeight={'bold'} fontSize={{ base: '2xl', md: '4xl' }}>
        No users available, to get started go to user profile and click on message
      </Text>
    );
  }

  return (
    <Flex flex={1} p={2} flexDirection={'column'}>
      <Text p={4} fontWeight={'bold'} fontSize={{ base: '2xl', md: '4xl' }}>
        Chats
      </Text>
      {users.map((user) => (
        <ChatListItem key={user.id} user={user} />
      ))}
    </Flex>
  );
};

export default ChatList;
