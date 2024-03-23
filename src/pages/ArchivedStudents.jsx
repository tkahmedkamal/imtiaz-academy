import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Modal,
  TableOperational,
  Filters,
  StatusFilter,
  CountryFilter,
  SortColumn,
  CourseFilter
} from '../ui/index.js';
import { AddStudent } from '../features/students/index.js';
import { StudentsAccountantTable } from '../features/students/accountant/index.js';
import { ArchivedStudentsEnrTable } from '../features/students/enrollment/ArchivedStudents/index.js';
import { StudentsTeacherTable } from '../features/students/teacher/index.js';
import StudentsProvider from '../context/StudentContext.jsx';
import { withPage } from '../hocs/index.js';
import CreditFilter from '../ui/CreditFilter.jsx';
import { useAuthCtx } from '../context/authContext.jsx';

const Student = () => {
  const navigate = useNavigate();
  const { user } = useAuthCtx();

  useEffect(() => {
    if (
      !user.roles.includes('AccountantAgent') &&
      !user.roles.includes('Teacher') &&
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
              <SortColumn
                data={[
                  { name: 'Student name (A-Z)'},
                  { name: 'Student name (Z-A)'}
                ]}
              />
              <CreditFilter />
              <CountryFilter />
            </Filters>
          </TableOperational>
        )}
        {user?.roles.includes('Teacher') && (
          <TableOperational windowName='create-student' false>
            <Filters>
              <StatusFilter />
              <SortColumn
                data={[
                  { name: 'Student name (A-Z)'},
                  { name: 'Student name (Z-A)'}
                ]}
              />
              <CourseFilter />
              <CountryFilter />
            </Filters>
          </TableOperational>
        )}
        {user?.roles.includes('EnrollmentAgent') && (
          <TableOperational windowName='create-student' isButton>
            <Filters>
              <StatusFilter />
              <SortColumn
                data={[
                  { name: 'Student name (A-Z)'},
                  { name: 'Student name (Z-A)'}
                ]}
              />
              <CountryFilter />
            </Filters>
          </TableOperational>
        )}
      </Modal>

      {user?.roles.includes('AccountantAgent') ? (
        <StudentsAccountantTable />
      ) : user?.roles.includes('Teacher') ? (
        <StudentsTeacherTable />
      ) : (
        <ArchivedStudentsEnrTable />
      )}
    </StudentsProvider>
  );
};

export default withPage(Student, 'students.title');
