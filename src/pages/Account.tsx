import { useEffect, useState } from "react";
import SingleAccount from "../components/accounts/SingleAccount";
import useGetRequest from "../hooks/useGetRequest";
import PageWrapper from "../layouts/PageWrapper";
import { Account as AccountType } from "../types";

const Account = () => {
  const { getRequest, loading, error } =
    useGetRequest<AccountType[]>("accounts");
  const [accounts, setAccounts] = useState<AccountType[] | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const data = await getRequest();
        setAccounts(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAccounts();
  }, [getRequest]);
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
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
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
