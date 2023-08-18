import {
  Modal,
  TableOperational,
  Filters,
  StatusFilter,
  CountryFilter,
} from '../ui';
import { AddStudent, StudentsTable } from '../features/students';
import StudentsProvider from '../context/StudentContext';
import { withPage } from '../hocs';
import CreditFilter from '../ui/CreditFilter.jsx';

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
            <CountryFilter />
            <CreditFilter />
          </Filters>
        </TableOperational>
      </Modal>
      <StudentsTable />
    </StudentsProvider>
  );
};

export default withPage(Student, 'students.title');
