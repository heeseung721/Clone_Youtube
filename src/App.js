import "./App.css";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import Router from "./shares/Router";

import { useEffect } from "react";
import { auth } from "./redux/modules/signSlice";
import { useDispatch } from "react-redux";
import { Cookies } from "react-cookie";

if (process.env.REACT_APP_NODE_ENV === "production") {
  disableReactDevTools();
}

function App() {
  const dispatch = useDispatch();
  const cookie = new Cookies();
  useEffect(() => {
    if (cookie.get("token")) dispatch(auth());
  }, []);

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
