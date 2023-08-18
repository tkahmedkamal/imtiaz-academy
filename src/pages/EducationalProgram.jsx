import { Modal, TableOperational } from '../ui';
import {
  EducationalTable,
  CreateEducationalForm,
} from '../features/educational';
import EducationalProvider from '../context/EducationalContext';
import { withPage } from '../hocs';

const EducationalProgram = () => {
  return (
    <EducationalProvider>
      <Modal>
        <Modal.Window name='create-educational'>
          <CreateEducationalForm />
        </Modal.Window>
        <TableOperational
          windowName='create-educational'
          noFilter
          labelBtn='educational.buttons.add'
          isButton
        />
      </Modal>
      <EducationalTable />
    </EducationalProvider>
  );
};

export default withPage(EducationalProgram, 'sidebar.educational');
