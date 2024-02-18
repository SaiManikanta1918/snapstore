import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import CreatePost from "./components/Sidebar/CreatePost";

function App() {
  const [authUser] = useAuthState(auth);

  return (
    <main className="flex" style={{ height: "100vh" }}>
      <PageLayout>
        <Routes>
          <Route
            path="/"
            element={authUser ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!authUser ? <AuthPage /> : <Navigate to="/" />}
          />
          <Route path="/user/:userId/:selectedTab?" element={<ProfilePage />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </PageLayout>
    </main>
  );
}

export default App;