import './App.css';
import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Dashboard from './Dashboard';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            main: '#FFE91C'
        }
    }
})

function App() {


  return (
        <ThemeProvider theme={theme}>
            <Dashboard />
        </ThemeProvider>
    
  );
}

export default App;
