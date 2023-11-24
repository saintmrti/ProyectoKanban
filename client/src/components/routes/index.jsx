import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";

import NavProduction from "../NavProduction";
import Hub from "../../components/Hub";
import Programmer from "../../components/Programmer";
import Production from "../../components/Production";

// eslint-disable-next-line react-refresh/only-export-components
export const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <Routes>
        <Route path="/" element={<Hub />} />
        <Route path="/planeacion" element={<NavProduction />}>
          <Route path="programador" element={<Programmer />} />
          <Route path="produccion" element={<Production />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    ),
  },
]);

export const Root = () => <RouterProvider router={router} />;
