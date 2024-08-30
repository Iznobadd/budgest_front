import { useQuery } from "react-query";
import SingleAccount from "../components/accounts/SingleAccount";
import PageWrapper from "../layouts/PageWrapper";
import { Account as AccountType } from "../types";
import { fetchAccounts } from "../api";

const Account = () => {
  const {
    data: accounts,
    isLoading,
    isError,
    error,
  } = useQuery<AccountType[], Error>("accounts", fetchAccounts);
  return (
    <PageWrapper
      title="Accounts"
      actions={[
        {
          label: "Add new account",
          link: "/dashboard/account/new",
        },
      ]}
    >
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      <div className="grid grid-cols-3 text-center gap-4">
        {accounts &&
          accounts.map((account) => (
            <SingleAccount
              name={account.name}
              id={account.id}
              key={account.id}
            />
          ))}
      </div>
    </PageWrapper>
  );
};

export default Account;
