import { useQuery } from "react-query";
import { remainingBudget } from "../../api";
import { RemainingBudgetResponse } from "../../types";
import { FaWallet } from "react-icons/fa";
import Graph from "../../assets/images/graph.svg";

const Balance = () => {
  const {
    data: remaining,
    isLoading,
    isError,
    error,
  } = useQuery<RemainingBudgetResponse, Error>("remaining", remainingBudget);

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-bold text-xl">Budget Restant</h2>
            <p className="text-neutral-light">Ce mois-ci</p>
          </div>
          <div className="p-4 bg-primary/15 rounded-lg text-primary">
            <FaWallet />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error: {error.message}</p>}
            {remaining && (
              <h2 className="font-bold text-3xl">
                {remaining.remainingBudget}€
              </h2>
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

export default Balance;
