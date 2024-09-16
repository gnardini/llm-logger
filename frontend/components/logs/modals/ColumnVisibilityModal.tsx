import { Modal } from '@frontend/components/common/Modal';
import { CheckBoxIcon } from '@frontend/svgs/CheckBoxIcon';
import { gray0, gray4, secondaryAccent } from '@frontend/utils/colors';
import { ColumnName } from '../hooks/useColumnVisibility';

interface ColumnVisibilityModalProps {
  visible: boolean;
  closeModal: () => void;
  visibleColumns: ColumnName[];
  toggleColumn: (column: ColumnName) => void;
}

const columnLabels: Record<ColumnName, string> = {
  time: 'Time',
  model: 'Model',
  inputTokens: 'Input Tokens',
  outputTokens: 'Output Tokens',
  tags: 'Tags',
  user: 'User',
  error: 'Error',
};

export function ColumnVisibilityModal({
  visible,
  closeModal,
  visibleColumns,
  toggleColumn,
}: ColumnVisibilityModalProps) {
  return (
    <Modal visible={visible} closeModal={closeModal}>
      <h2 className="text-xl font-semibold mb-4 text-secondary-accent">Visible Columns</h2>
      {Object.entries(columnLabels).map(([key, label]) => (
        <div key={key} className="flex items-center mb-2">
          <CheckBoxIcon
            id={`column-${key}`}
            squareColor={gray4}
            checkmarkColor={gray0}
            isSelected={visibleColumns.includes(key as ColumnName)}
            onClick={() => toggleColumn(key as ColumnName)}
            className="mr-2 cursor-pointer"
          />
          <label htmlFor={`column-${key}`}>{label}</label>
        </div>
      ))}
    </Modal>
  );
}
