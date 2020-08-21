import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider, ColorModeProvider } from '@chakra-ui/core'
import customTheme from "./theme/theme";
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <ColorModeProvider>
        <App/>
      </ColorModeProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
