import { createContext, useContext, useEffect } from 'react';
import i18next from 'i18next';

import { useLocalStorage } from '../hooks';

const ConfigContext = createContext({
  theme: '',
  lng: '',
  handleSwitch: () => {},
  handleSwitchLang: () => {},
});

const ConfigProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [lng, setLng] = useLocalStorage('lng', 'en');

  const handleSwitchTheme = () => {
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'));
  };

  const handleSwitchLang = () => {
    setLng(prev => (prev === 'en' ? 'ml' : 'en'));
  };

  useEffect(() => {
    if (
      theme === 'dark' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    i18next.changeLanguage(lng);
  }, [lng]);

  return (
    <ConfigContext.Provider
      value={{ theme, lng, handleSwitchTheme, handleSwitchLang }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const { theme, lng, handleSwitchTheme, handleSwitchLang } =
    useContext(ConfigContext);

  return {
    theme,
    lng,
    handleSwitchTheme,
    handleSwitchLang,
  };
};

export default ConfigProvider;
