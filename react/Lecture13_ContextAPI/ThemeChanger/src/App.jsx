import { useState } from 'react'
import './App.css'
import { Card,Toggle } from '../components';
import { ThemeProvider } from '../context/ThemeContext';
import { useEffect } from 'react';


function App() {
  
  const [themeMode,setThemeMode]=useState('light');
  const darkTheme=()=>{
    setThemeMode('dark')
  }
  const lightTheme=()=>{
    setThemeMode('light')
  }

  useEffect(()=>{
    document.body.className=themeMode;

    },[themeMode]);


  return (
    <>
    <ThemeProvider value={{themeMode,darkTheme,lightTheme}}>
      <Toggle />
      <Card />
    </ThemeProvider>
    </>
  )
}

export default App;
