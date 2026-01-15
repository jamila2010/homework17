import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Users from "./pages/Users";

function App() {
  const user=true
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user} >
          <MainLayout />
        </ProtectedRoutes>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path:"/users",
          element:<Users/>,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
      ],
    },
    {
      path: "register",
      element: user ? <Navigate to={"/"} />: <Register />,
    },
    {
      path: "login",
      element: user ? <Navigate to={"/"} />:<Login />,
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
