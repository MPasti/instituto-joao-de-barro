import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PrivateRouter from "./components/PrivateRouter";

const ToastOptions = {
  style: {
    fontSize: "16px",
  },
  success: {
    duration: 3000, // Duram 3 segundos
  },
  error: {
    duration: 3000,
  },
};

//Principais rotas
import LandingPage from "./Screens/PublicScreens/LandingPage";
import DashboardPage from "./Screens/PrivateScreens/Dashboard";

//Telas publicas
import { Main } from "./components/Main";
import { Contact } from "./Screens/PublicScreens/Contact";
import { About } from "./Screens/PublicScreens/About";
import { Voluntarios } from "./Screens/PublicScreens/Voluntarios";
import { Beneficiarios } from "./Screens/PublicScreens/Beneficiarios";
import { Projetos } from "./Screens/PublicScreens/Projetos";
import { Blog } from "./Screens/PublicScreens/Blog";
import { Donation } from "./Screens/PublicScreens/Donation";

//Login
import { Login } from "./Screens/Login";

//Telas privadas
import { Home } from "./Screens/PrivateScreens/Home";
import { Noticias } from "./Screens/PrivateScreens/Noticias";
import { Perfil } from "./Screens/PrivateScreens/Perfil";
import { Financeiro } from "./Screens/PrivateScreens/Financeiro";
import { StorageHome } from "./Screens/PrivateScreens/Estoque/StorageHome";
import { BuildingHome } from "./Screens/PrivateScreens/Obras/BuildingHome";

function App() {
  return (
    <div className="app-container">
      <Router>
        <Toaster position="top-right" toastOptions={ToastOptions} />
        
        <div className="content">
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<LandingPage />}>
              <Route index element={<Main />} />
              <Route path="contatos" element={<Contact />} />
              <Route path="projetos" element={<Projetos />} />
              <Route path="noticias" element={<Blog />} />
              <Route path="sobre" element={<About />} />
              <Route path="voluntarios" element={<Voluntarios />} />
              <Route path="beneficiarios" element={<Beneficiarios />} />
              <Route path='doacoes' element={<Donation />}/>
            </Route>

            {/* Rota de Login */}
            <Route path="/login" element={<Login />} />

            {/* Rotas Privadas - Dashboard */}
            <Route element={<PrivateRouter />}>
              <Route path="/dashboard" element={<DashboardPage />}>
                <Route index element={<Home />} />
                <Route path="noticias" element={<Noticias />} />
                <Route path="perfil" element={<Perfil />} />
                <Route path="financeiro" element={<Financeiro />} />
                <Route path="estoque" element={<StorageHome />}/>
                <Route path="obras" element={<BuildingHome />}/>
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}


export default App;

