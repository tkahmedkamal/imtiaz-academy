import { Modal } from '../../ui';
import CreateStudentForm from './CreateStudentForm';

const AddStudent = () => {
  return (
    <Modal.Window name='create-student'>
      <CreateStudentForm />
    </Modal.Window>
  );
};

export default AddStudent;
