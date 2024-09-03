import { BsGraphDownArrow } from "react-icons/bs";
import Graph from "../../assets/images/graph.svg";
import { RemainingBudgetResponse } from "../../types";
import { useQuery } from "react-query";
import { remainingBudget } from "../../api";

const ExpenseByMonth = () => {
  const {
    data: remaining,
    isLoading,
    isError,
    error,
  } = useQuery<RemainingBudgetResponse, Error>("remaining", remainingBudget);
  console.log(remaining);

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-xl">Dépenses total</h2>
            <p className="text-neutral-light">Ce mois-ci</p>
          </div>
          <div className="p-4 bg-tertiary/15 rounded-lg text-tertiary">
            <BsGraphDownArrow />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error: {error.message}</p>}
            {remaining && (
              <h2 className="font-bold text-3xl">{remaining.totalExpense}€</h2>
            )}
          </div>
          <div>
            <img src={Graph} className="w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseByMonth;
