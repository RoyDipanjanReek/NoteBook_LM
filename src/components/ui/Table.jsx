import { cx } from "@/lib/cx";

export default function Table({
  columns,
  rows,
  rowKey = "id",
  emptyMessage = "No rows available.",
  className,
  tableClassName,
}) {
  return (
    <div className={cx("overflow-x-auto", className)}>
      <table
        className={cx(
          "min-w-full border-collapse text-left text-sm text-foreground",
          tableClassName
        )}
      >
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cx(
                  "border-b border-border pb-3 pr-6 text-xs font-semibold uppercase tracking-[0.24em] text-muted",
                  column.headerClassName
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.length ? (
            rows.map((row, index) => (
              <tr
                key={row[rowKey] ?? row.key ?? `${index}-${rowKey}`}
                className="transition duration-150 hover:bg-surface-strong/70"
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cx("py-4 pr-6 align-top text-foreground", column.cellClassName)}
                  >
                    {column.render ? column.render(row, index) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="py-10 text-center text-sm text-muted"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
