import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import ProfilePosts from './ProfilePosts';
import LikedPosts from './LikedPosts';
import SavedPosts from './SavedPosts';
import useUserProfileStore from '../../store/userProfileStore';
import useAuthStore from '../../store/authStore';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { PROFILE_TABS } from '../../constants';
import { LikesTab, PostsTab, SavesTab } from '../Tabs';

const ProfileTabs = () => {
  const navigate = useNavigate();
  const { selectedTab, userId } = useParams();
  const tabIndex = PROFILE_TABS.findIndex((tab) => tab.name === selectedTab);
  const [selectedTabIndex, setSelectedTabIndex] = useState(tabIndex > -1 ? tabIndex : 0);

  function onTabChage(index) {
    navigate(`/user/${userId}/${PROFILE_TABS[index].name}`);
    setSelectedTabIndex(index);
  }

  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);

  return (
    <Tabs flex={1} defaultIndex={selectedTabIndex} onChange={(index) => onTabChage(index)} isLazy>
      <TabList>
        <Tab>
          <PostsTab />
        </Tab>
        {authUser?.id === userProfile?.id && (
          <Tab>
            <LikesTab />
          </Tab>
        )}
        {authUser?.id === userProfile?.id && (
          <Tab>
            <SavesTab />
          </Tab>
        )}
      </TabList>
      <TabPanels>
        <TabPanel>
          <ProfilePosts />
        </TabPanel>
        <TabPanel>
          <LikedPosts />
        </TabPanel>
        <TabPanel>
          <SavedPosts />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProfileTabs;
