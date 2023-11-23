import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import moment from "moment";
import momentTz from "moment-timezone";
import es from "moment/locale/es";

import App from "./App.jsx";
import { store } from "./store";

moment.updateLocale("es", es);
momentTz.tz.setDefault("America/Mexico_City");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
