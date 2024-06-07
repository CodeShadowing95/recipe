import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import { fetchUser } from './utils'
import { useEffect } from "react";

export default function App() {
  const navigate = useNavigate();
  const user = fetchUser();

  useEffect(() => {
    const user = fetchUser();

    if(!user) navigate('/auth')

  }, [navigate])

  return (
    <div className="flex w-screen min-h-screen bg-slate-200">
      <Routes>
        <Route path="/*" exact element={!user ? <Auth /> : <Home />}  />
        <Route path="/auth" exact element={!user ? <Auth />  : <Home />} />
        <Route path="/auth" element={!user ? <Navigate to="/auth" replace /> : <Navigate to="/*" replace />} />
      </Routes>
    </div>
  )
}