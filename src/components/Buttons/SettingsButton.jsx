import { SettingsIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function SettingsButton() {
  const navigate = useNavigate();

  return (
    <Button
      leftIcon={<SettingsIcon />}
      colorScheme="teal"
      variant="solid"
      size={{ base: 'xs', md: 'md' }}
      onClick={() => navigate('/settings')}
    >
      Settings
    </Button>
  );
}

export default SettingsButton;
