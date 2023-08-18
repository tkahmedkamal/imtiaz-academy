import { Modal, TableOperational, ProgramTypeFilter } from '../ui';
import { CourseTable } from '../features/course';
import CourseProvider from '../context/CourseContext';
import { withPage } from '../hocs';

const Course = () => {
  return (
    <CourseProvider>
      <Modal>
        <TableOperational>
          <ProgramTypeFilter />
        </TableOperational>
      </Modal>
      <CourseTable />
    </CourseProvider>
  );
};

export default withPage(Course, 'educational.course.title');
