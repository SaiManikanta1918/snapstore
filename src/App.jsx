import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import CreatePost from "./components/Sidebar/CreatePost";
import { Explore } from "./components/Sidebar/Explore";

function App() {
  const [authUser] = useAuthState(auth);

  return (
    <main className="flex" style={{ height: "100vh" }}>
      <PageLayout>
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!authUser ? <AuthPage /> : <Navigate to="/" />}
          />
          {/* <Route path="/search" element={<Search />} /> */}
          <Route
            path="/explore/:selectedTab?"
            element={!authUser ? <Navigate to="/login" /> : <Explore />}
          />
          {/* <Route path="/notifications" element={<Notifications />} /> */}
          <Route
            path="/user/:userId/:selectedTab?"
            element={!authUser ? <Navigate to="/login" /> : <ProfilePage />}
          />
          <Route
            path="/create-post"
            element={!authUser ? <Navigate to="/login" /> : <CreatePost />}
          />
        </Routes>
      </PageLayout>
    </main>
  );
}

export default App;