import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';

import { Icon } from '../ui';
import { useConfig } from '../context/ConfigContext';

const SwitchTheme = () => {
  const { theme, handleSwitchTheme } = useConfig();

  return (
    <Icon onClick={handleSwitchTheme}>
      {theme === 'light' ? <BsFillMoonFill /> : <BsFillSunFill />}
    </Icon>
  );
};

export default SwitchTheme;
