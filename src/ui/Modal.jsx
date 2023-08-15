import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { BsX } from 'react-icons/bs';

import { useOutsideClick } from '../hooks';
import { routeVariants } from '../utils/motion';

const ModalContext = createContext();

const Modal = ({ children }) => {
  const [openModal, setOpenModal] = useState('');

  const close = () => setOpenModal('');
  const open = setOpenModal;

  return (
    <ModalContext.Provider value={{ openModal, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};

const Open = ({ children, opens }) => {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opens) });
};

const Window = ({ children, name }) => {
  const { openModal, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  useEffect(() => {
    const handleKey = e => {
      if (e.keyCode === 27) {
        console.log('xxx');
        close();
      }
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [close]);

  if (name !== openModal) return null;

  return createPortal(
    <div className='fixed inset-0 z-40 h-full w-full cursor-pointer bg-common-black/60'>
      <motion.div
        variants={routeVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='fixed left-1/2 right-1/2 top-1/2 max-h-[calc(100vh-50px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-common-white p-6 dark:bg-dark-paper xs:w-[calc(100vw-50px)] sm:w-[650px]'
        ref={ref}
      >
        <div className='flex justify-end'>
          <div
            className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm  text-3xl text-gray transition-colors duration-500 hover:bg-gray/10'
            onClick={close}
          >
            <BsX />
          </div>
        </div>

        {cloneElement(children, { closeModal: close })}
      </motion.div>
    </div>,
    document.getElementById('overlay'),
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
