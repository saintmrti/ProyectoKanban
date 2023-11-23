import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";

import NavProduction from "../NavProduction";

import Programmer from "../../pages/Programmer";
import Production from "../../pages/Production";
import Home from "../../pages/Home";
import Prueba from "../../pages/Prueba";

// eslint-disable-next-line react-refresh/only-export-components
export const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planeacion" element={<NavProduction />}>
          <Route path="programador" element={<Programmer />} />
          <Route path="produccion" element={<Production />} />
          <Route path="prueba" element={<Prueba />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    ),
  },
]);

export const Root = () => <RouterProvider router={router} />;
