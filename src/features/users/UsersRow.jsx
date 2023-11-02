import { useTranslation } from 'react-i18next';
import { BiEdit } from 'react-icons/bi';
import { LuArchive } from 'react-icons/lu';
import { TbInfoSquare } from 'react-icons/tb';

import { Table, ActionBtn, Modal, Tag, Confirm } from '../../ui';
import EditUserForm from './EditUserForm';
import useArchiveUser from './useArchiveUser';
import { Archive } from '../../assets';

const UsersRow = ({ index, user }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useArchiveUser();

  const {
    id,
    name,
    phoneNumber,
    isActive,
  } = user;

  return (
    <Table.Tr>
      <Table.Td classes='font-bold'>#{index + 1}</Table.Td>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{phoneNumber}</Table.Td>

      <Table.Td>
        {isActive ? (
          <Tag label={'Active'} status='success' />
        ) : (
          <Tag label={'Pending'} status='warn' />
        )}
      </Table.Td>

      <Table.Td classes='flex item-center gap-3'>
        <Modal>
          <Modal.Open opens={`edit-user-${id}`}>
            <ActionBtn
              title={t('global.edit')}
              icon={<BiEdit />}
              status='primary'
            />
          </Modal.Open>

          <Modal.Open opens={`info-user-${id}`}>
            <ActionBtn
              title={t('global.info')}
              icon={<TbInfoSquare />}
              status='primary'
            />
          </Modal.Open>
          <Modal.Open opens={`archive-user-${id}`}>
            <ActionBtn
              title={t('global.archive')}
              icon={<LuArchive />}
              status='danger'
            />
          </Modal.Open>

          <Modal.Window name={`edit-user-${id}`}>
            <EditUserForm userId={id} />
          </Modal.Window>
          <Modal.Window name={`archive-user-${id}`}>
            <Confirm
              label={t('archive.label')}
              message={t('archive.message')}
              statusBtn='warn'
              icon={Archive}
              isLoading={isLoading}
              handleConfirm={() => mutate(id)}
            />
          </Modal.Window>
        </Modal>
      </Table.Td>
    </Table.Tr>
  );
};

export default UsersRow;
