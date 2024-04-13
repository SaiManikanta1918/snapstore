import { Link, Text, Tooltip, Avatar } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function ChatListItem({ user, isActive }) {
  return (
    <Link
      display={'flex'}
      to={`/chat/${user.id}`}
      as={RouterLink}
      alignItems={'center'}
      bg={isActive ? 'whiteAlpha.400' : ''}
      _hover={{ bg: 'whiteAlpha.400' }}
      borderRadius={6}
      p={{ base: 2, md: 4 }}
      gap={4}
      justifyContent={'flex-start'}
    >
      <Avatar src={user.profilePicURL} name={user.fullName} size={'md'} />
      <Tooltip label={user.fullName}>
        <Text noOfLines={1}>{user.fullName}</Text>
      </Tooltip>
    </Link>
  );
}

export default ChatListItem;
