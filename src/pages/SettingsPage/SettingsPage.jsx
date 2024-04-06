import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';
import useAuthStore from '../../store/authStore';
import { ArrowForwardIcon } from '@chakra-ui/icons';

function SettingsPage() {
  const authUser = useAuthStore((state) => state.user);

  return (
    <Box p={4}>
      <Breadcrumb separator={<ArrowForwardIcon />}>
        <BreadcrumbItem>
          <BreadcrumbLink href={`/user/${authUser.uid}`} color={'blue.300'}>
            Profile
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Settings</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Text fontSize={'5xl'} color={'blue.300'} py={4}>
        We are coming with exciting settings, stay tune
      </Text>
    </Box>
  );
}

export default SettingsPage;
