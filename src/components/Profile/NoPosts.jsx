import { Flex, Text } from '@chakra-ui/react';

const NoPosts = () => {
  return (
    <Flex flexDir="column" textAlign={'center'} mx={'auto'} mt={10}>
      <Text fontSize={'2xl'}>No Posts Found🤔</Text>
    </Flex>
  );
};

export default NoPosts;
