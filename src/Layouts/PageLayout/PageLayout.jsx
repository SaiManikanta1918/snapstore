import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useLocation } from 'react-router-dom';
import Bottombar from '../../components/Bottombar/Bottombar';
import Topbar from '../../components/Topbar/Topbar';
import useGetLoggedInUser from '../../hooks/gethooks/useGetLoggedInUser';
import { SnapStoreLoader } from '../../components/Loaders';
import useAuthStore from '../../store/authStore.js';

const PageLayout = ({ children, authUser }) => {
  const { pathname } = useLocation();
  const canRenderSidebar = pathname !== '/login' && authUser;
  const canRenderBottombar =
    authUser && pathname.split('/').includes('chat') ? pathname.split('/').length < 3 : true;
  const { isLoading } = useGetLoggedInUser(authUser && authUser.uid);
  const canRenderTopbar =
    authUser && pathname.split('/').includes('chat') ? pathname.split('/').length < 3 : true;
  const isAuthUserLoading = useAuthStore((state) => state.isLoading);
  if (isLoading || isAuthUserLoading) return <SnapStoreLoader />;

  return (
    <Box w={'100%'} display={{ md: 'flex' }}>
      {canRenderTopbar && (
        <section
          style={{
            position: 'sticky',
            top: '0px',
            backgroundColor: 'rgb(9 9 10 / 1)',
            zIndex: '50',
          }}
        >
          <Topbar />
        </section>
      )}
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
            overflowY={'auto'}
          >
            {children}
          </Box>
        </Flex>
      </section>
      {canRenderBottombar && (
        <section
          style={{
            position: 'sticky',
            bottom: '0px',
            backgroundColor: 'rgb(9 9 10 / 1)',
            zIndex: '50',
          }}
        >
          <Bottombar />
        </section>
      )}
    </Box>
  );
};

export default PageLayout;
