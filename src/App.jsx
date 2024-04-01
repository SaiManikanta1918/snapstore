import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import AuthPage from './pages/AuthPage/AuthPage';
import PageLayout from './Layouts/PageLayout/PageLayout';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase/firebase';
import CreatePost from './components/Sidebar/CreatePost';
import { Explore } from './components/Sidebar/Explore';
import Chat from './components/Sidebar/Chat';
import { Spinner } from '@chakra-ui/react';

function App() {
  const [authUser, isLoading] = useAuthState(auth);

  if (isLoading) return <Spinner />;

  return (
    <main style={{ height: '100vh', display: 'flex' }}>
      <PageLayout authUser={authUser} loading={isLoading}>
        <Routes>
          <Route path="/login" element={!authUser ? <AuthPage /> : <Navigate to="/home" />} />
          <Route
            path="/"
            element={!authUser ? <Navigate to="/login" /> : <Navigate to="/home" />}
          />
          <Route path="/home" element={!authUser ? <Navigate to="/login" /> : <HomePage />} />
          <Route
            path="/explore/:selectedTab?"
            element={!authUser ? <Navigate to="/login" /> : <Explore />}
          />
          <Route
            path="/user/:userId/:selectedTab?"
            element={!authUser ? <Navigate to="/login" /> : <ProfilePage />}
          />
          <Route
            path="/create-post"
            element={!authUser ? <Navigate to="/login" /> : <CreatePost />}
          />
          <Route
            path="/chat/:selectedUser?"
            element={!authUser ? <Navigate to="/login" /> : <Chat />}
          />
        </Routes>
      </PageLayout>
    </main>
  );
}

export default App;
