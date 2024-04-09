import { Button } from '@chakra-ui/react';
import { USER_ACTION } from '../../constants';

function SignUpButton({ isLoading }) {
  return (
    <Button
      justifyContent={'center'}
      width={'100%'}
      gap={4}
      mt={10}
      type="submit"
      colorScheme="purple"
      isLoading={isLoading}
    >
      {USER_ACTION.SIGN_UP}
    </Button>
  );
}

export default SignUpButton;
