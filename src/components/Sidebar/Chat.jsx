import {
  Avatar,
  ChatContainer,
  ConversationHeader,
  Message,
  MessageInput,
  MessageList,
  MessageSeparator,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import useAuthStore from '../../store/authStore';
import useGetUsers from '../../hooks/useGetUsers';
import { Box, Link, Spinner, Text, Tooltip } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Chat = () => {
  const { pathname } = useLocation();
  const { selectedUser } = useParams();
  const authUser = useAuthStore((state) => state.user);
  const { isLoading, users } = useGetUsers(authUser.followers);

  const renderTextOnly = true;
  if (renderTextOnly) {
    return (
      <Text fontSize={'5xl'} color={'blue.300'}>
        This page is under development
      </Text>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Box display={'flex'}>
        <Box flex={'1'}>
          {users.map((user) => (
            <Link
              key={user.id}
              display={'flex'}
              to={`/chat/${user.id}`}
              as={RouterLink}
              alignItems={'center'}
              gap={4}
              bg={user.id === pathname.split('/')[1] ? 'whiteAlpha.400' : ''}
              _hover={{ bg: 'whiteAlpha.400' }}
              borderRadius={6}
              p={4}
              w={{ base: 10, md: 'full' }}
              justifyContent={{ base: 'center', md: 'flex-start' }}
            >
              <Avatar src={user.profilePicURL} name={user.fullName} size={'md'} />
              <Tooltip label={user.fullName}>
                <Text noOfLines={1}>{user.fullName}</Text>
              </Tooltip>
            </Link>
          ))}
        </Box>
        <Box flex={'3 '}>
          {selectedUser && (
            <ChatContainer>
              <ConversationHeader>
                <Avatar
                  name="Emily"
                  src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                />
                <ConversationHeader.Content info="Active 10 mins ago" userName="Emily" />
              </ConversationHeader>
              <MessageList typingIndicator={<TypingIndicator content="Emily is typing" />}>
                <MessageSeparator content="Saturday, 30 November 2019" />
                <Message
                  model={{
                    direction: 'incoming',
                    message: 'Hello my friend',
                    position: 'single',
                    sender: 'Emily',
                    sentTime: '15 mins ago',
                  }}
                >
                  <Avatar
                    name="Emily"
                    src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                  />
                </Message>
                <Message
                  model={{
                    direction: 'outgoing',
                    message: 'Hello my friend',
                    position: 'single',
                    sener: 'Oliver',
                    sentTime: '15 mins ago',
                  }}
                />
                <Message
                  avatarSpacer
                  model={{
                    direction: 'incoming',
                    message: 'Hello my friend',
                    position: 'first',
                    sender: 'Emily',
                    sentTime: '15 mins ago',
                  }}
                />
                <Message
                  avatarSpacer
                  model={{
                    direction: 'incoming',
                    message: 'Hello my friend',
                    position: 'normal',
                    sender: 'Emily',
                    sentTime: '15 mins ago',
                  }}
                />
                <Message
                  avatarSpacer
                  model={{
                    direction: 'incoming',
                    message: 'Hello my friend',
                    position: 'normal',
                    sender: 'Emily',
                    sentTime: '15 mins ago',
                  }}
                />
                <Message
                  model={{
                    direction: 'incoming',
                    message: 'Hello my friend',
                    position: 'last',
                    sender: 'Emily',
                    sentTime: '15 mins ago',
                  }}
                >
                  <Avatar
                    name="Emily"
                    src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                  />
                </Message>
                <Message
                  model={{
                    direction: 'outgoing',
                    message: 'Hello my friend',
                    position: 'first',
                    sentTime: '15 mins ago',
                  }}
                />
                <Message
                  model={{
                    direction: 'outgoing',
                    message: 'Hello my friend',
                    position: 'normal',
                    sentTime: '15 mins ago',
                  }}
                />
                <Message
                  model={{
                    direction: 'outgoing',
                    message: 'Hello my friend',
                    position: 'normal',
                    sentTime: '15 mins ago',
                  }}
                />
                <Message
                  model={{
                    direction: 'outgoing',
                    message: 'Hello my friend',
                    position: 'last',
                    sentTime: '15 mins ago',
                  }}
                />
                <Message
                  avatarSpacer
                  model={{
                    direction: 'incoming',
                    message: 'Hello my friend',
                    position: 'first',
                    sender: 'Emily',
                    sentTime: '15 mins ago',
                  }}
                />
                <Message
                  model={{
                    direction: 'incoming',
                    message: 'Hello my friend',
                    position: 'last',
                    sender: 'Emily',
                    sentTime: '15 mins ago',
                  }}
                >
                  <Avatar
                    name="Emily"
                    src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                  />
                </Message>
                <MessageSeparator content="Saturday, 31 November 2019" />
                <Message
                  model={{
                    direction: 'incoming',
                    message: 'Hello my friend',
                    position: 'single',
                    sender: 'Emily',
                    sentTime: '15 mins ago',
                  }}
                >
                  <Avatar
                    name="Emily"
                    src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                  />
                </Message>
                <Message
                  model={{
                    direction: 'outgoing',
                    message: 'Hello my friend',
                    position: 'single',
                    sender: 'Oliver',
                    sentTime: '15 mins ago',
                  }}
                />
                <Message
                  avatarSpacer
                  model={{
                    direction: 'incoming',
                    message: 'Hello my friend',
                    position: 'first',
                    sender: 'Emily',
                    sentTime: '15 mins ago',
                  }}
                />
                <Message
                  avatarSpacer
                  model={{
                    direction: 'incoming',
                    message: 'Hello my friend',
                    position: 'normal',
                    sender: 'Emily',
                    sentTime: '15 mins ago',
                  }}
                />
                <Message
                  avatarSpacer
                  model={{
                    direction: 'incoming',
                    message: 'Hello my friend',
                    position: 'normal',
                    sender: 'Emily',
                    sentTime: '15 mins ago',
                  }}
                />
                <Message
                  model={{
                    direction: 'incoming',
                    message: 'Hello my friend',
                    position: 'last',
                    sender: 'Emily',
                    sentTime: '15 mins ago',
                  }}
                >
                  <Avatar
                    name="Emily"
                    src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                  />
                </Message>
                <Message
                  model={{
                    direction: 'outgoing',
                    message: 'Hello my friend',
                    position: 'first',
                    sentTime: '15 mins ago',
                  }}
                />
                <Message
                  model={{
                    direction: 'outgoing',
                    message: 'Hello my friend',
                    position: 'normal',
                    sentTime: '15 mins ago',
                  }}
                />
                <Message
                  model={{
                    direction: 'outgoing',
                    message: 'Hello my friend',
                    position: 'normal',
                    sentTime: '15 mins ago',
                  }}
                />
                <Message
                  model={{
                    direction: 'outgoing',
                    message: 'Hello my friend',
                    position: 'last',
                    sentTime: '15 mins ago',
                  }}
                />
                <Message
                  avatarSpacer
                  model={{
                    direction: 'incoming',
                    message: 'Hello my friend',
                    position: 'first',
                    sender: 'Emily',
                    sentTime: '15 mins ago',
                  }}
                />
                <Message
                  model={{
                    direction: 'incoming',
                    message: 'Hello my friend',
                    position: 'last',
                    sender: 'Emily',
                    sentTime: '15 mins ago',
                  }}
                >
                  <Avatar
                    name="Emily"
                    src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
                  />
                </Message>
              </MessageList>
              <MessageInput placeholder="Type message here" />
            </ChatContainer>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Chat;
