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
        {user?.roles.includes('AccountantAgent') && (
          <TableOperational windowName='create-student' false>
            <Filters>
              <StatusFilter />
              <CreditFilter />
              <CountryFilter />
            </Filters>
          </TableOperational>
        )}
        {user?.roles.includes('EnrollmentAgent') && (
          <TableOperational windowName='create-student' isButton>
            <Filters>
              <StatusFilter />
              <CountryFilter />
            </Filters>
          </TableOperational>
        )}
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
