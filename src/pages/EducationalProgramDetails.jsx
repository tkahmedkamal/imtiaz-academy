import { Modal, TableOperational } from '../ui';
import { EducationalDetailsTable } from '../features/educationalDetails';
import EducationalDetailsProvider from '../context/EducationalDetailsContext';
import { withPage } from '../hocs';

const EducationalProgramDetails = () => {
  return (
    <EducationalDetailsProvider>
      <Modal>
        <TableOperational />
      </Modal>
      <EducationalDetailsTable />
    </EducationalDetailsProvider>
  );
};

export default withPage(
  EducationalProgramDetails,
  'educational.details.title',
  true,
  'sidebar.educational',
  'educational-program',
);
