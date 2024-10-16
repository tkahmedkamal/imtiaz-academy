import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Modal,
  TableOperational,
  Filters,
  EnrStatusFilter,
  // CountryFilter,
  SortColumn,
} from '../ui/index.js';
import { StudentsEnrollmentsTable } from '../features/studentsEnrollments/index.js';
import StudentsProvider from '../context/StudentContext.jsx';
import { withPage } from '../hocs/index.js';
// import CreditFilter from '../ui/CreditFilter.jsx';
import CourseFilter from '../ui/CourseFilter.jsx';
import TeacherNameFilter from '../ui/TeacherNameFilter.jsx';
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
        {user?.roles.includes('AccountantAgent') && (
          <TableOperational windowName='create-student' false>
            <Filters>
            <EnrStatusFilter />
              <SortColumn
                data={[
                  { name: 'Student name (A-Z)'},
                  { name: 'Student name (Z-A)'},
                  { name: 'Course name (A-Z)'},
                  { name: 'Course name (Z-A)'}
                ]}
              />
              <CourseFilter />
              <TeacherNameFilter />
            </Filters>
          </TableOperational>
        )}
        {user?.roles.includes('EnrollmentAgent') && (
          <TableOperational windowName='create-student' false>
            <Filters>
              <EnrStatusFilter />
              <SortColumn
                data={[
                  { name: 'Student name (A-Z)'},
                  { name: 'Student name (Z-A)'},
                  { name: 'Course name (A-Z)'},
                  { name: 'Course name (Z-A)'}
                ]}
              />
              <CourseFilter />
              <TeacherNameFilter />
            </Filters>
          </TableOperational>
        )}
      </Modal>
      <StudentsEnrollmentsTable />
    </StudentsProvider>
  );
};

export default withPage(Student, 'students.title');
