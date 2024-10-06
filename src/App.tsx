import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Principais rotas
import LandingPage from "./Screens/PublicScreens/LandingPage";
import DashboardPage from "./Screens/PrivateScreens/Dashboard";

//Telas publicas
import { Main } from "./components/Main";
import { Contact } from "./Screens/PublicScreens/Contact";
import { About } from "./Screens/PublicScreens/About";
import { Voluntarios } from "./Screens/PublicScreens/Voluntarios";
import { Beneficiarios } from "./Screens/PublicScreens/Beneficiarios";

//Login
import { Login } from "./Screens/Login";

//Telas privadas
import { Home } from "./Screens/PrivateScreens/Home";
import { Noticias } from "./Screens/PrivateScreens/Noticias";
import { Storage } from "./Screens/PrivateScreens/Estoque/Storage";
import { Outlet } from "./Screens/PrivateScreens/Estoque/Outlet";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<LandingPage />}>
          <Route index element={<Main />} />
          <Route path="contatos" element={<Contact />} />
          <Route path="sobre" element={<About />} />
          <Route path="voluntarios" element={<Voluntarios />} />
          <Route path="beneficiarios" element={<Beneficiarios />} />
        </Route>

        {/* Rota de Login */}
        <Route path="/login" element={<Login />} />

        {/* Rotas Privadas - Dashboard */}
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<Home />} />
          <Route path="noticias" element={<Noticias />} />
          <Route path="estoque" element={<Storage />}/>
          <Route path="outlet" element={<Outlet />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
