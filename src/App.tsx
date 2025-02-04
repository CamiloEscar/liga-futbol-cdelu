// App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // Componente de inicio
import Champions from "./pages/Champions"; // Asegúrate de tener este componente
import { useLeague } from "./context/LeagueContext";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Admin from "./pages/admin";

function App() {
  useLeague();

  return (
    <div className="min-h-screen bg-gray-100">
      <AuthProvider>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/champions" element={<Champions />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
