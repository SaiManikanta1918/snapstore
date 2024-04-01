import { Grid, GridItem, Text } from '@chakra-ui/react';
import useGetSuggestedUsers from '../../hooks/useGetSuggestedUsers';
import SuggestedUser from '../SuggestedUsers/SuggestedUser';
import { useEffect, useState } from 'react';
import { ExplorePeopleSkeleton } from '../Loaders';

const ExplorePeople = ({ searchText }) => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setFilteredUsers(
      suggestedUsers.filter((user) => user.fullName.toLowerCase().includes(searchText))
    );
  }, [searchText, suggestedUsers]);

  if (!isLoading && !filteredUsers.length) {
    return (
      <Text fontSize={'4xl'} color={'blue.300'}>
        No users to display, Suggest your friends to create account
      </Text>
    );
  }

  if (searchText.length && !filteredUsers.length) {
    return (
      <Text fontSize={'4xl'} color={'blue.300'}>
        No users found
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
      {isLoading ? (
        <ExplorePeopleSkeleton />
      ) : (
        filteredUsers.map((user) => {
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
        })
      )}
    </Grid>
  );
};

export default ExplorePeople;
