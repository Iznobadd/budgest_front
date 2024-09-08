import { useQuery } from "@tanstack/react-query";
import { lastTransactions } from "../../api/transactions";
import { Transaction, Transactions } from "../../types";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { formatDate } from "../../utils/formatDate";

const TransactionCard = () => {
  const {
    data: transactions = [],
    isLoading,
    isError,
    error,
  } = useQuery<Transactions, Error>({
    queryKey: ["lastTransactions"],
    queryFn: lastTransactions,
  });

  const columnHelper = createColumnHelper<Transaction>();

  const columns = [
    columnHelper.accessor("category.name", {
      header: "Catégorie",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("amount", {
      header: "Montant",
      cell: (info) => info.getValue() + "€",
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("transactionType", {
      header: "Type de transaction",
      cell: (info) => {
        const type = info.getValue();
        return type === "INCOME" ? (
          <div className="p-4 bg-secondary/15 rounded-lg text-secondary inline-block">
            <BsGraphUpArrow />
          </div>
        ) : (
          <div className="p-4 bg-tertiary/15 rounded-lg text-tertiary inline-block">
            <BsGraphDownArrow />
          </div>
        );
      },
    }),
    columnHelper.accessor("createdAt", {
      header: "Date de création",
      cell: (info) => formatDate(info.getValue()),
    }),
  ];

  const table = useReactTable({
    columns,
    data: transactions,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message}</p>}
      {!isLoading && !isError && (
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="rounded-t-lg">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-gray-100 p-10">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="p-4 text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="rounded-b-lg">
              {table.getRowModel().rows.map((row, index, array) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-300 ${
                    index === array.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className=" p-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionCard;
