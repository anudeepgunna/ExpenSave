import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/Signup";
import Hero from "./components/hero/Hero";
import HomeLayout from "./Layouts/HomeLayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import UserLayout from "./Layouts/UserLayout";
import UserHome from "./pages/UserHome";
import UserRoute from "./protectedRoutes/UserRoute";
import AuthRoute from "./protectedRoutes/AuthRoute";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<HomeLayout />}>
          <Route
            path="/"
            element={
              <AuthRoute>
                <Hero />
              </AuthRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />

          <Route path="/signup" element={<SignUp />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route
            path="/home"
            element={
              <UserRoute>
                <UserHome />
              </UserRoute>
            }
          />
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
