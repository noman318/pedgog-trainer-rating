import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { retry } from "./utils/commonFunctions";
import { Suspense, lazy, StrictMode } from "react";
import { render } from "react-dom";
const App = lazy(() => retry(() => import("./App")));
const rootElement = document.getElementById("root");

const main = () =>
  render(
    <Suspense fallback={<div />}>
      <StrictMode>
        
        <App />
      </StrictMode> 
    </Suspense>,  
    rootElement
  );

main();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
