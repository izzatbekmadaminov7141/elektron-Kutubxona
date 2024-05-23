import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RouterLayout from "./layout/RouterLayout";
import "./App.css";
import AllBooks from "./Pages/AllBooks";

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RouterLayout />,
      children: [
        {
          index: true,
          element: <AllBooks />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
