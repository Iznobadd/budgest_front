import { BsGraphUpArrow } from "react-icons/bs";
import Graph from "../../assets/images/graph.svg";
import { RemainingBudgetResponse } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { remainingBudget } from "../../api";

const IncomeByMonth = () => {
  const {
    data: remaining,
    isLoading,
    isError,
    error,
  } = useQuery<RemainingBudgetResponse, Error>({
    queryKey: ["remaining"],
    queryFn: remainingBudget,
  });
  console.log(remaining);

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-xl">Revenus total</h2>
            <p className="text-neutral-light">Ce mois-ci</p>
          </div>
          <div className="p-4 bg-secondary/15 rounded-lg text-secondary">
            <BsGraphUpArrow />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error: {error.message}</p>}
            {remaining && (
              <h2 className="font-bold text-3xl">{remaining.totalIncome}€</h2>
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

export default IncomeByMonth;
