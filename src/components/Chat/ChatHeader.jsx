import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ChatHeader = () => {
  const navigate = useNavigate();

  function gotoChatPage() {
    navigate('/chat');
  }

  return (
    <Box
      px={{ base: 2, md: 4 }}
      py={{ base: 2, md: 5 }}
      position={'absolute'}
      top={'0px'}
      width={'100%'}
      bg={'gray.700'}
    >
      <ArrowBackIcon cursor={'pointer'} boxSize={6} onClick={gotoChatPage} />
    </Box>
  );
};

export default ChatHeader;
