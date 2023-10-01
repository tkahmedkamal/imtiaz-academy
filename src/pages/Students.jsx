import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Modal,
  TableOperational,
  Filters,
  StatusFilter,
  CountryFilter,
} from '../ui';
import { AddStudent } from '../features/students';
import { StudentsAccountantTable } from '../features/students/accountant';
import { StudentsEnrollmentTable } from '../features/students/enrollment';
import StudentsProvider from '../context/StudentContext';
import { withPage } from '../hocs';
import CreditFilter from '../ui/CreditFilter.jsx';
import { useAuthCtx } from '../context/authContext';

const Student = () => {
  const navigate = useNavigate();
  const { user } = useAuthCtx();

  useEffect(() => {
    if (
      !user.roles.includes('AccountantAgent') &&
      !user.roles.includes('EnrollmentAgent')
    ) {
      navigate(-1);
    }
  }, [user, navigate]);

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
            {user?.roles.includes('AccountantAgent') && <CreditFilter />}
            <CountryFilter />
          </Filters>
        </TableOperational>
      </Modal>

      {user?.roles.includes('AccountantAgent') ? (
        <StudentsAccountantTable />
      ) : (
        <StudentsEnrollmentTable />
      )}
    </StudentsProvider>
  );
};

export default withPage(Student, 'students.title');
