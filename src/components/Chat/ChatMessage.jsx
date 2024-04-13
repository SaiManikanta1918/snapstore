import { Box, Flex, Link } from '@chakra-ui/react';

const ChatMessage = ({ message, isSent }) => {
  const sentText = isSent ? 'sent' : 'received';
  return (
    <Box className={'message-' + sentText}>
      <Box className="message-container" flexDirection={isSent ? 'row-reverse' : ''}>
        <Box className={'message-text message-text--' + sentText}>
          <Flex
            className={'message-text-content message-text-content--' + sentText}
            flexDirection={isSent ? 'row-reverse' : ''}
            bg={isSent ? 'teal.700' : 'gray.700'}
            borderBottomEndRadius={isSent ? '' : 8}
            borderBottomStartRadius={isSent ? 8 : ''}
          >
            {message.isUrl ? (
              <Link isExternal href={message.message} color="blue.300" wordBreak={'break-word'}>
                {message.message}
              </Link>
            ) : (
              message.message
            )}
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatMessage;
