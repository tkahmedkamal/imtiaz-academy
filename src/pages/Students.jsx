import {
  Modal,
  TableOperational,
  Filters,
  StatusFilter,
  GenderFilter,
  CountryFilter,
} from '../ui';
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
          isButton
        >
          <Filters>
            <StatusFilter />
            <GenderFilter />
            <CountryFilter />
          </Filters>
        </TableOperational>
      </Modal>
      <StudentsTable />
    </StudentsProvider>
  );
};

export default withPage(Student, 'students.title');
