import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login.jsx";
import SignUp from "./Components/SignUp/SignUp.jsx";
import LearningCenter from "./Components/LearningCenter/LearningCenter.jsx";
import Budgeting from "./Components/Budgeting/Budgeting.jsx";
import Finance from "./Components/Finance/Finance.jsx";
import Pie from "./Components/Pie/Pie.jsx";
<<<<<<< Updated upstream
import ProtectedRoute from "./ProtectedRoute.jsx";
=======
import Chat from "./Components/AI/Chat.jsx";
>>>>>>> Stashed changes

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/signup",
    element: (
      <div>
        <SignUp />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/Home",
    element: (
      <div>
<<<<<<< Updated upstream
        <ProtectedRoute>
          <Budgeting />
          <Pie />
          <Finance />
          <LearningCenter />
        </ProtectedRoute>
=======
        <Budgeting />
        <Pie/>
        <Finance />
        <LearningCenter />
        <Chat />
>>>>>>> Stashed changes
      </div>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
