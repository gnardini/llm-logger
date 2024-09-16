import { useState, useEffect } from 'react';

export type ColumnName =
  | 'time'
  | 'model'
  | 'inputTokens'
  | 'outputTokens'
  | 'tags'
  | 'user'
  | 'error';

const defaultColumns: ColumnName[] = [
  'time',
  'model',
  'inputTokens',
  'outputTokens',
  'tags',
  'user',
  'error',
];

export const useColumnVisibility = () => {
  const [visibleColumns, setVisibleColumns] = useState<ColumnName[]>(() => {
    if (typeof localStorage === 'undefined') {
      return defaultColumns;
    }
    const stored = localStorage.getItem('logTableVisibleColumns');
    return stored ? JSON.parse(stored) : defaultColumns;
  });

  useEffect(() => {
    localStorage.setItem('logTableVisibleColumns', JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  const toggleColumn = (column: ColumnName) => {
    setVisibleColumns((prev) =>
      prev.includes(column) ? prev.filter((col) => col !== column) : [...prev, column],
    );
  };

  return { visibleColumns, toggleColumn };
};
