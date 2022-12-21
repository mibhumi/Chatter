import logo from './logo.svg';
import './App.css';
import Register from './container/Register';
import './style.scss';
import Login from './container/Login';
import Home from './container/Home';
import { 
  BrowserRouter,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './component/context/AuthContext';

function App() {

  const {currentUser} = useContext(AuthContext);
  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to="/login"/>
    }
    return children;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
