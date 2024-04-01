import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import Bottombar from '../../components/Bottombar/Bottombar';
import Topbar from '../../components/Topbar/Topbar';
import useGetLoggedInUser from '../../hooks/useGetLoggedInUser';
import { PageLayoutSpinner } from '../../components/Loaders';

const PageLayout = ({ children, authUser }) => {
  const { pathname } = useLocation();
  const canRenderSidebar = pathname !== '/login' && authUser;
  const { isLoading } = useGetLoggedInUser(authUser);

  if (isLoading) return <PageLayoutSpinner />;

  return (
    <Box w={'100%'} display={{ md: 'flex' }}>
      <section
        style={{ position: 'sticky', top: '0px', backgroundColor: 'rgb(9 9 10 / 1)', zIndex: '50' }}
      >
        {authUser && <Topbar />}
      </section>
      <nav>
        {canRenderSidebar ? (
          <Box w={{ base: '70px', md: '240px' }} display={{ base: 'none', md: 'block' }}>
            <Sidebar />
          </Box>
        ) : null}
      </nav>
      <section style={{ height: '100%', display: 'flex', flex: '1 1 0%' }}>
        <Flex flexDir={'row'} flex={'1 1 0%'}>
          <Box
            flex={1}
            w={{ base: 'calc(100% - 70px)', md: 'calc(100% - 240px)' }}
            mx={'auto'}
            overflowY={'scroll'}
          >
            {children}
          </Box>
        </Flex>
      </section>
      <section
        style={{
          position: 'sticky',
          bottom: '0px',
          backgroundColor: 'rgb(9 9 10 / 1)',
          zIndex: '50',
        }}
      >
        {authUser && <Bottombar />}
      </section>
    </Box>
  );
};

export default PageLayout;
