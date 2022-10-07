
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from '../components/Routes/ProtectedRoute';
import { router } from "../routes";
import { useAuth } from '../hooks/useAuth'

const App = () => {

  const { loading } = useAuth();

  if (loading) return <h4>Loading..</h4>

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Router>
        <Routes>
          {
            router.map((route, index) => {
              return <Route key={index} path={route.path} element={route.isAuth ? <ProtectedRoute><route.component /></ProtectedRoute> : <route.component />} />
            })
          }
        </Routes>
      </Router>
    </MantineProvider>
  )
}

export default App;