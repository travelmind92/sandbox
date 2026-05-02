import React, { useEffect, useState } from "react";

export type ColumnDef<T> = {
  key: string;
  header: string;
  render: (row: T) => React.ReactNode;
};

type ResourceListProps<T extends { id: string }> = {
  title: string;
  subtitle: string;
  loadingLabel: string;
  emptyLabel: string;
  errorLabel: string;
  loadData: () => Promise<T[]>;
  columns: ColumnDef<T>[];
  headerActions?: React.ReactNode;
};

function ResourceList<T extends { id: string }>({
  title,
  subtitle,
  loadingLabel,
  emptyLabel,
  errorLabel,
  loadData,
  columns,
  headerActions,
}: ResourceListProps<T>) {
  const [rows, setRows] = useState<T[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setRows(null);
    setError(null);

    loadData()
      .then((data) => {
        if (!cancelled) {
          setRows(data);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          const fallback = err instanceof Error ? err.message : errorLabel;
          setError(fallback);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [errorLabel, loadData]);

  return (
    <section className="resource-list">
      <div className="resource-list-header">
        <div className="resource-list-header-row">
          <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          {headerActions}
        </div>
      </div>

      {error && <p className="resource-list-message resource-list-error">{error}</p>}
      {rows === null && !error && (
        <p className="resource-list-message">{loadingLabel}</p>
      )}
      {rows && rows.length === 0 && (
        <p className="resource-list-message">{emptyLabel}</p>
      )}

      {rows && rows.length > 0 && (
        <div className="resource-table-wrapper">
          <table className="resource-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.key}>{column.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td key={`${row.id}-${column.key}`}>{column.render(row)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ResourceList;
