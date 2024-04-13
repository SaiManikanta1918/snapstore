import { Box, Flex, Skeleton, SkeletonCircle, Spinner, VStack } from '@chakra-ui/react';

// skeleton for profile header
export const ProfileHeaderSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      direction={{ base: 'column', sm: 'row' }}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <SkeletonCircle size="20" />
      <VStack alignItems={{ base: 'center', sm: 'flex-start' }} gap={2} mx={'auto'} flex={1}>
        <Skeleton height="12px" width="150px" />
        <Skeleton height="12px" width="100px" />
      </VStack>
    </Flex>
  );
};

export const CommentSkeleton = () => {
  return (
    <Flex gap={4} w={'full'} alignItems={'center'}>
      <SkeletonCircle h={10} w="10" />
      <Flex gap={1} flexDir={'column'}>
        <Skeleton height={2} width={100} />
        <Skeleton height={2} width={50} />
      </Flex>
    </Flex>
  );
};

export const PostsSkeleton = () => {
  return [0, 1, 2].map((_, idx) => (
    <VStack key={idx} gap={4} alignItems={'flex-start'} mb={10}>
      <Flex gap="2">
        <SkeletonCircle size="10" />
        <VStack gap={2} alignItems={'flex-start'}>
          <Skeleton height="10px" w={'200px'} />
          <Skeleton height="10px" w={'200px'} />
        </VStack>
      </Flex>
      <Skeleton w={'full'}>
        <Box h={'400px'}>contents wrapped</Box>
      </Skeleton>
    </VStack>
  ));
};

export const ExplorePeopleSkeleton = () => {
  return [...new Array(8)].map((_, idx) => (
    <VStack key={idx} alignItems={'flex-start'} gap={4}>
      <Skeleton w={'full'}>
        <Box h="100px">contents wrapped</Box>
      </Skeleton>
    </VStack>
  ));
};

export const GridPostsSkeleton = () => {
  return [...new Array(6)].map((_, idx) => (
    <VStack key={idx} alignItems={'flex-start'} gap={4}>
      <Skeleton w={'full'} borderRadius={'20px'}>
        <Box h="300px">contents wrapped</Box>
      </Skeleton>
    </VStack>
  ));
};

export const FeedPostsSkeleton = () => {
  return [0, 1, 2].map((_, idx) => (
    <VStack key={idx} gap={4} alignItems={'flex-start'} mb={10}>
      <Flex gap="2">
        <SkeletonCircle size="10" />
        <VStack gap={2} alignItems={'flex-start'}>
          <Skeleton height="10px" w={'200px'} />
          <Skeleton height="10px" w={'200px'} />
        </VStack>
      </Flex>
      <Skeleton w={'full'}>
        <Box h={'400px'}>contents wrapped</Box>
      </Skeleton>
    </VStack>
  ));
};

export const SnapStoreLoader = () => {
  return (
    <Flex flexDir="column" h="100vh" alignItems="center" justifyContent="center" flex={1}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        label="loading chats..."
      />
    </Flex>
  );
};
