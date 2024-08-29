import PageWrapper from "../layouts/PageWrapper";

const Account = () => {
  return (
    <PageWrapper
      title="Accounts"
      actions={[
        {
          label: "Add new account",
          link: "/dashboard/account/new",
        },
      ]}
    ></PageWrapper>
  );
};

export default Account;
