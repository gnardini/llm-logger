import { Modal } from '@frontend/components/common/Modal';
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
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Visible Columns</h2>
        {Object.entries(columnLabels).map(([key, label]) => (
          <div key={key} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`column-${key}`}
              checked={visibleColumns.includes(key as ColumnName)}
              onChange={() => toggleColumn(key as ColumnName)}
              className="mr-2"
            />
            <label htmlFor={`column-${key}`}>{label}</label>
          </div>
        ))}
      </div>
    </Modal>
  );
}