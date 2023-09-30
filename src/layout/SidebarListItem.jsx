import { NavLink } from 'react-router-dom';

const SidebarListItem = ({ item: { label, link, icon, noLink, handler } }) => {
  return (
    <>
      {!noLink && (
        <NavLink
          to={link}
          end
          className={({ isActive }) =>
            isActive
              ? 'group inline-flex w-full items-center gap-x-3 border-r-2 border-primary bg-primary/5 px-6 py-2.5 text-primary transition-colors duration-500 dark:border-dark-primary dark:bg-dark-primary/5 dark:text-dark-primary'
              : 'group inline-flex w-full items-center gap-x-3  px-6 py-2.5 transition-colors duration-500 hover:text-primary dark:hover:text-dark-primary'
          }
        >
          <span className='text-[20px]'>{icon}</span>
          <span className='text-sm'>{label}</span>
        </NavLink>
      )}

      {noLink && (
        <button
          className='group inline-flex w-full items-center gap-x-3  px-6 py-2.5 transition-colors duration-500 hover:text-primary dark:hover:text-dark-primary'
          onClick={handler}
        >
          <span className='text-[20px]'>{icon}</span>
          <span className='text-sm'>{label}</span>
        </button>
      )}
    </>
  );
};

export default SidebarListItem;
