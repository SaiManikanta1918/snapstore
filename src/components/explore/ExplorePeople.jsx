import { Box, Grid, GridItem, Skeleton, Text, VStack } from '@chakra-ui/react';
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers';
import SuggestedUser from '../SuggestedUsers/SuggestedUser';
import { useEffect, useState } from 'react';

const ExplorePeople = ({ searchText }) => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setFilteredUsers(
      suggestedUsers.filter((user) => user.fullName.toLowerCase().includes(searchText))
    );
  }, [searchText, suggestedUsers]);

  if (!suggestedUsers.length) {
    return (
      <Text fontSize={'4xl'} color={'blue.300'}>
        No users to display, Suggest your friends to create account
      </Text>
    );
  }

  return (
    <Grid
      templateColumns={{
        sm: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
      }}
      gap={10}
      columnGap={10}
    >
      {isLoading
        ? [...new Array(8)].map((_, idx) => (
            <VStack key={idx} alignItems={'flex-start'} gap={4}>
              <Skeleton w={'full'}>
                <Box h="100px">contents wrapped</Box>
              </Skeleton>
            </VStack>
          ))
        : filteredUsers.map((user) => {
            return (
              <GridItem
                key={user.id}
                cursor={'pointer'}
                borderRadius={4}
                overflow={'hidden'}
                position={'relative'}
              >
                <SuggestedUser user={user} />
              </GridItem>
            );
          })}
    </Grid>
  );
};

export default ExplorePeople;
