import { useTranslation } from 'react-i18next';
import { BiEdit } from 'react-icons/bi';
import { LuFileArchive } from 'react-icons/lu';
import { LuNewspaper } from 'react-icons/lu';
import { TbInfoSquare } from 'react-icons/tb';

import { Table, ActionBtn, Modal, Confirm } from '../../ui';
import EditEducationalForm from './EditEducationalForm';
import { useConfig } from '../../context/ConfigContext';
import useArchiveEducational from './useArchiveEducational';
import { Archive } from '../../assets';
import CreateEducationalDetailsForm from '../educationalDetails/CreateEducationalDetailsForm';

const EducationalRow = ({ index, program }) => {
  const { t } = useTranslation();
  const { lng } = useConfig();
  const { mutate, isLoading } = useArchiveEducational();

  const { id, namePr, nameSc } = program;

  return (
    <Table.Tr>
      <Table.Td classes='font-bold'>#{index + 1}</Table.Td>
      <Table.Td>{lng === 'en' ? namePr : nameSc}</Table.Td>
      <Table.Td classes='flex item-center gap-3'>
        <div className='flex w-full justify-center'>
          <Modal>
            <Modal.Open opens={`edit-educational-${id}`}>
              <ActionBtn
                title={t('global.edit')}
                icon={<BiEdit />}
                status='primary'
              />
            </Modal.Open>

            <Modal.Open opens={`archive-educational-${id}`}>
              <ActionBtn
                title={t('global.archive')}
                icon={<LuFileArchive />}
                status='warn'
              />
            </Modal.Open>

            <Modal.Open opens={`create-details-educational-${id}`}>
              <ActionBtn
                title={t('educational.details.buttons.add')}
                icon={<LuNewspaper />}
                status='primary'
              />
            </Modal.Open>

            <Modal.Open opens={`details-educational-${id}`}>
              <ActionBtn
                title={t('global.details')}
                icon={<TbInfoSquare />}
                status='primary'
              />
            </Modal.Open>

            <Modal.Window name={`edit-educational-${id}`}>
              <EditEducationalForm program={program} />
            </Modal.Window>

            <Modal.Window name={`archive-educational-${id}`}>
              <Confirm
                label={t('archive.label')}
                message={t('archive.message')}
                statusBtn='warn'
                icon={Archive}
                isLoading={isLoading}
                handleConfirm={() => mutate(id)}
              />
            </Modal.Window>

            <Modal.Window name={`details-educational-${id}`}>
              <p>Details</p>
            </Modal.Window>

            <Modal.Window name={`create-details-educational-${id}`}>
              <CreateEducationalDetailsForm programId={id} />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Td>
    </Table.Tr>
  );
};

export default EducationalRow;
