import { Box, Link } from '@chakra-ui/react';
import { AiOutlineHome } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => {
  return (
    <Link
      display={'flex'}
      to={'/'}
      as={RouterLink}
      alignItems={'center'}
      gap={4}
      _hover={{ bg: 'whiteAlpha.400' }}
      borderRadius={6}
      p={2}
      w={{ base: 10, md: 'full' }}
      justifyContent={{ base: 'center', md: 'flex-start' }}
    >
      <AiOutlineHome size={25} />
      <Box display={{ base: 'none', md: 'block' }} fontSize={'xl'}>
        Home
      </Box>
    </Link>
  );
};

export default Home;
