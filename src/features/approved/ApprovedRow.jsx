import { useTranslation } from 'react-i18next';
import { BsCheckLg } from 'react-icons/bs';

import { Table, ActionBtn, Modal } from '../../ui';
import ApprovedForm from './ApprovedForm';

const ApprovedRow = ({ index, user }) => {
  const { t } = useTranslation();

  const { id, name } = user;

  return (
    <Table.Tr>
      <Table.Td classes='font-bold'>#{index + 1}</Table.Td>
      <Table.Td>{name}</Table.Td>

      <Table.Td classes='flex item-center gap-3'>
        <Modal>
          <Modal.Open opens={`approved-${id}`}>
            <ActionBtn
              title={t('global.approve')}
              icon={<BsCheckLg />}
              status='primary'
            />
          </Modal.Open>

          <Modal.Window name={`approved-${id}`}>
            <ApprovedForm userId={id} />
          </Modal.Window>
        </Modal>
      </Table.Td>
    </Table.Tr>
  );
};

export default ApprovedRow;
