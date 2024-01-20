import { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthCtx } from './context/authContext';

import { AppLayout } from './layout';

import {
  Dashboard,
  Student,
  Teachers,
  EducationalProgram,
  Course,
  NotFound,
  Approved,
  Users,
} from './pages';
import { Login, StudentSignup, TeacherSignup } from './pages/auth';
import { ProtectedRoutes } from './ui';
import StudentsEnrollments from './pages/StudentsEnrollments';

const App = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useAuthCtx();

  useEffect(() => {
    if (pathname === '/') {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate, pathname]);

  return (
    <div className='flex w-full'>
      <Routes>
        <Route
          path='/dashboard'
          element={
            <ProtectedRoutes>
              <AppLayout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path='teachers' element={<Teachers />} />
          {(user?.roles.includes('EnrollmentAgent') || user?.roles.includes('AccountantAgent')) && (
            <>      
            <Route
              path='students-enrollments'
              element={<StudentsEnrollments />}
            />
            </>

          )}
          {(user?.roles.includes('EnrollmentAgent') || user?.roles.includes('AccountantAgent')|| user?.roles.includes('Teacher') )   && (
            <>      
            <Route path='students' element={<Student />} />
            </>

          )}
          {user?.roles.includes('Admin') && (
            <>      
              <Route path='approved' element={<Approved />} />
              <Route path='user-management' element={<Users />} />
            </>
          )}
          <Route path='educational-program'>
            <Route index element={<EducationalProgram />} />
            <Route path='course' element={<Course />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/employee-signup' element={<TeacherSignup />} />
        <Route path='/student-signup' element={<StudentSignup />} />
      </Routes>

      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',
            // color: "var(--color-grey-700)",
            // backgroundColor: "var(--color-grey-0)",
          },
          className:
            'bg-paper dark:bg-dark-paper text-primary-text dark:text-dark-primary-text',
        }}
      />
    </div>
  );
};

export default App;
