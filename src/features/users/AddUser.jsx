import { Modal } from '../../ui';
import CreateUserForm from './CreateUserForm';

const AddUser = () => {
  return (
    <Modal.Window name='create-user'>
      <CreateUserForm />
    </Modal.Window>
  );
};

export default AddUser;
