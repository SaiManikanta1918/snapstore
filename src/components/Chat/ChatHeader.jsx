import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Link, Text, Avatar } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const ChatHeader = ({ user }) => {
  const navigate = useNavigate();

  function gotoChatPage() {
    navigate('/chat');
  }

  return (
    <Box
      px={{ base: 2, md: 4 }}
      py={{ base: 2, md: 4 }}
      position={'absolute'}
      top={'0px'}
      width={'100%'}
      bg={'gray.700'}
      display={'flex'}
      gap={4}
    >
      <ArrowBackIcon cursor={'pointer'} boxSize={6} onClick={gotoChatPage} />
      <Link to={`/user/${user.id}/posts`} as={RouterLink}>
        <Avatar src={user.profilePicURL} name={user.fullName} size={'sm'} />
      </Link>
      <Text noOfLines={1} fontSize={'md'}>
        {user.fullName}
      </Text>
    </Box>
  );
};

export default ChatHeader;
