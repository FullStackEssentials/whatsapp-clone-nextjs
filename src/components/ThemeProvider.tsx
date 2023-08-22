'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

const themes = {
  dark: 'bg-whatsappBg text-white',
  light: 'bg-white text-black'
}

const ThemeContext = createContext<any>(null)

export enum ThemeType {
  LIGHT = 'light',
  DARK = 'dark',
}

type UseThemeReturn = {
  theme: ThemeType;
  themeClasses: string;
  toggleTheme: () => void;
}

export const useTheme = (): UseThemeReturn => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeType;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  defaultTheme = ThemeType.DARK,
}) => {
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    setThemeInHTML(defaultTheme)
  }, [defaultTheme])

  /**
   * Required or Tailwind `dark` classes to work.
   * https://tailwindcss.com/docs/dark-mode
   */
  const setThemeInHTML = (theme: ThemeType) => {
    const htmlElement = document.querySelector('html')
    if (theme === ThemeType.LIGHT) {
      htmlElement?.classList.remove('dark')
    } else {
      htmlElement?.classList.add('dark')
    }
  }

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const updatedTheme = prevTheme === ThemeType.LIGHT ? ThemeType.DARK : ThemeType.LIGHT;
      setThemeInHTML(updatedTheme)
      return updatedTheme
    })
  }

  const themeClasses = themes[theme]

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeClasses }}>
      {children}
    </ThemeContext.Provider>
  )
}
