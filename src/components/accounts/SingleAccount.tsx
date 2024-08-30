import { Account } from "../../types";

const SingleAccount = ({ name }: Account) => {
  return (
    <div className="w-full p-12 border border-gray-200 bg-white rounded-lg shadow-sm font-bold">
      {name}
    </div>
  );
};

export default SingleAccount;
