import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import AlertComponent from './components/AlertComponent';
import GridComponent from './components/GridComponent';
import SnackBarComponent from './components/SnackBarComponent';

import i18n from './i18n';
import { useTranslation } from 'react-i18next';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const AppContext = createContext(null);

const supabase = createClient('https://qnezskkazqyaowiyaeom.supabase.co/', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuZXpza2thenF5YW93aXlhZW9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5Nzc1MjIsImV4cCI6MjA0NzU1MzUyMn0.qXHLSk5m11CgN3dE7hnVKNtzzLsjnvWu5ykPLB4os8w');

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const { t: translate } = useTranslation();
  const timeoutDuration = 6000;

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguageState] = useState<string>(i18n.language);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertVariant, setAlertVariant] = useState(null);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const showSnackMessage = (message: string) => {
    setSnackMessage(message);
    setSnackOpen(true);
  };

  const showAlertMessage = (message: string, severity: string, variant: string) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertVariant(variant);

    setTimeout(() => {
      setAlertMessage('');
    }, timeoutDuration);
  };

  const handleClose = () => {
    setSnackMessage('');
    setSnackOpen(false);
  };

  const sharedState = {
    toggleTheme,
    theme,
    language,
    changeLanguage,
    supabase,
    showSnackMessage,
    showAlertMessage,
    translate,
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      changeLanguage(storedLanguage);
    } else {
      const navLang = navigator.language.split('-')[0];
      changeLanguage(navLang);
    }
  }, []);

  return (
    <div className="app-background">
      <AppContext.Provider value={sharedState}>
        {children}
        <SnackBarComponent
          autoHideDuration={timeoutDuration}
          onClose={handleClose}
          open={snackOpen}
          message={snackMessage}
        />
        {alertMessage && (
          <GridComponent
            container
            sx={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: '100%',
              padding: 2,
            }}
          >
            <GridComponent item xs={12}>
              <AlertComponent variant={alertVariant} severity={alertSeverity}>
                {alertMessage}
              </AlertComponent>
            </GridComponent>
          </GridComponent>
        )}
      </AppContext.Provider>
    </div>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
