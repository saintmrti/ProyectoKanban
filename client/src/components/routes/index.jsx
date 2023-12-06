import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";

import NavProduction from "../NavProduction";
import Hub from "../Hub";
import Programmer from "../Programmer";
import Production from "../Production";
import SliceHistory from "../SliceHistory";
import Capacity from "../Capacity";
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
          <Route path="historico" element={<SliceHistory />} />
          {/*<SliceHistory/>*/}
        </Route>
        <Route path="/capacidad" element={<Capacity />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    ),
  },
]);

export const Root = () => <RouterProvider router={router} />;
