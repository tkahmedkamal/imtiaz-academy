import { useConfig } from '../context/ConfigContext';
import { LogoLight, LogoDark } from '../assets';

const Logo = () => {
  const { theme } = useConfig();

  return (
    <>
      {theme === 'light' && (
        <img src={LogoLight} alt='Imtiaz Academy' loading='lazy' />
      )}
      {theme === 'dark' && (
        <img src={LogoDark} alt='Imtiaz Academy' loading='lazy' />
      )}
    </>
  );
};

export default Logo;
