import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import {
  SettingsConsumer,
  SettingsProvider,
} from "./@core/context/settingContext";
import ThemeComponent from "./@core/theme/ThemeComponent";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <SettingsProvider>
      <SettingsConsumer>
        {({ settings }) => {
          return (
            <ThemeComponent settings={settings}>
              <App />
            </ThemeComponent>
          );
        }}
      </SettingsConsumer>
    </SettingsProvider>
  </AuthProvider>
);
