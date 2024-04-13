import { Flex } from '@chakra-ui/react';
import ChatListItem from './ChatListItem';

function ChatList({ users, selectedUserId }) {
  return (
    <Flex flex={1} p={2} flexDirection={'column'} gap={2}>
      {users.map((user) => (
        <ChatListItem key={user.id} user={user} isActive={user.id === selectedUserId} />
      ))}
    </Flex>
  );
}

export default ChatList;
