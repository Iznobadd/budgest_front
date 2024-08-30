import { Link } from "react-router-dom";
import { Account } from "../../types";

const SingleAccount = ({ name, budget }: Account) => {
  return (
    <div className="w-full p-4 border border-gray-200 bg-white rounded-lg shadow-sm flex flex-col">
      <div className=" font-bold">
        {name} {parseFloat(budget).toFixed(2)}€
      </div>
      <div>
        <Link to="">Add Transaction</Link>
      </div>
    </div>
  );
};

export default SingleAccount;
