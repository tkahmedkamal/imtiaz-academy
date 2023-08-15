import { Modal, TableOperational } from '../ui';
import { AddStudent, StudentsTable } from '../features/students';
import StudentsProvider from '../context/StudentContext';
import { withPage } from '../hocs';

const Student = () => {
  return (
    <StudentsProvider>
      <Modal>
        <AddStudent />
        <TableOperational
          windowName='create-student'
          labelBtn='students.buttons.add'
        />
      </Modal>
      <StudentsTable />
    </StudentsProvider>
  );
};

export default withPage(Student, 'students.title');
