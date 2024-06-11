import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import PlayersPage from "./pages/PlayersPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import TournamentsPage from "./pages/TournamentsPage";
import "./App.css";
import { TournamentsProvider } from "./context/TournamentsContext";
import CreateTournament from "./pages/CreateTournament";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AuthProvider>
        <TournamentsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/players" element={<PlayersPage />} />
                <Route path="/tournaments" element={<TournamentsPage />} />
                <Route path="/new-tournament" element={<CreateTournament />} />
                <Route path="/tournaments/edit/:id" element={<CreateTournament />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TournamentsProvider>
        <Toaster />
      </AuthProvider>
    </>
  );
}

export default App;
