import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import GoogleAuth from './GoogleAuth';
import { USER_ACTION } from '../../constants';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Box border={'1px solid gray'} borderRadius={4} padding={5}>
        <VStack spacing="8">
          <Image src="/snapstore.png" h={24} cursor={'pointer'} alt="Snapstore" />

          {isLogin ? <Login /> : <Signup />}
          <Flex alignItems={'center'} justifyContent={'center'} my={4} gap={1} w={'full'}>
            <Box flex={2} h={'1px'} bg={'gray.400'} />
            <Text mx={1} color={'white'}>
              OR
            </Text>
            <Box flex={2} h={'1px'} bg={'gray.400'} />
          </Flex>

          <GoogleAuth prefix={isLogin ? USER_ACTION.LOG_IN : USER_ACTION.SIGN_UP} />
        </VStack>
      </Box>

      <Box border={'1px solid gray'} borderRadius={4} padding={5}>
        <Flex alignItems={'center'} justifyContent={'center'}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </Box>
          <Box onClick={() => setIsLogin(!isLogin)} color={'blue.500'} cursor={'pointer'}>
            {isLogin ? USER_ACTION.SIGN_UP : USER_ACTION.LOG_IN}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;
