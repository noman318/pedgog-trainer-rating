import "./App.scss";
import { lazy } from "react";
import { retry } from "./utils/commonFunctions";
import { BrowserRouter } from "react-router-dom";

import AppStateProvider from "./providers/app.provider";
import Alert from "./components/partials/Alert";
import { createTheme, ThemeProvider } from "@material-ui/core";
import AxiosClient from "./utils/axios";
import NetworkProvider from "./providers/network.provider";
import styled from "styled-components";
// import Header from "./components/Header/Header";

const RouterComponent = lazy(() =>
  retry(() => import("./router/Router.Component"))
);

const theme = createTheme({
  palette: {
    primary: {
      main: "#FFBC36",
    },
    secondary: {
      main: "#000",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        fontFamily: "'Fira Sans', sans-serif",
      },
    },
    MuiAccordionSummary: {
      root: {
        padding: "8px 16px",
      },
      content: {
        margin: "0 !important",
      },
    },
    MuiTableSortLabel: {
      root: {
        color: "black !important",
      },
    },
    MuiTableRow: {
      head: {
        backgroundColor: "#F5F5F5",
      },
    },
    MuiTableCell: {
      root: {
        fontFamily: "'Fira Sans', sans-serif",
        fontSize: "1.1rem",
      },
      head: {
        color: "#000",
        fontWeight: "bold",
      },
      body: {
        padding: "1.2rem",
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: "12px 25px",
      },
      notchedOutline: {
        borderColor: "#eee",
      },
    },
    MuiIconButton: {
      label: {
        color: "inherit",
      },
    },
    MuiSelect: {
      outlined: {
        paddingRight: "48px !important",
      },
    },
  },
});
const AppWrapper = styled.div`
  overflow-x: hidden;
`;
function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppWrapper>
        <AppStateProvider>
          <NetworkProvider>
            <BrowserRouter>
              <AxiosClient />
              <Alert />
              <RouterComponent />
            </BrowserRouter>
          </NetworkProvider>
        </AppStateProvider>
      </AppWrapper>
    </ThemeProvider>
  );
}

export default App;
