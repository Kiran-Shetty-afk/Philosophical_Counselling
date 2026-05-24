type AdminTableProps = {
  columns: string[];
  rows: string[][];
};

export function AdminTable({ columns, rows }: AdminTableProps) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[var(--color-border)]">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white">
          <thead className="bg-[var(--color-surface-muted)]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="px-5 py-4 text-left text-sm font-semibold text-[var(--color-text-primary)]"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={`${row[0]}-${rowIndex}`}
                className="border-t border-[var(--color-border)]"
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${cell}-${cellIndex}`}
                    className="px-5 py-4 text-sm leading-7 text-[var(--color-text-secondary)]"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
