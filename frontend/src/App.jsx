import Header from "./components/Header"
import { Outlet } from "react-router-dom"
import { Container } from "@mui/material"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function App() {

  return (
    <>
      <Header />
      <ToastContainer />
      <Container sx={{ my: 2}}>
        <Outlet />
      </Container>
    </>
  )
}

export default App