import Balance from "../components/overview/Balance";
import ExpenseByMonth from "../components/overview/ExpenseByMonth";
import IncomeByMonth from "../components/overview/IncomeByMonth";
import TargetCategoriesCard from "../components/overview/TargetCategoriesCard";
import PageWrapper from "../layouts/PageWrapper";

const Dashboard = () => {
  return (
    <PageWrapper title="Overview">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="w-full p-4 bg-white rounded-lg shadow-sm flex flex-col">
          <Balance />
        </div>
        <div className="w-full p-4 bg-white rounded-lg shadow-sm flex flex-col">
          <IncomeByMonth />
        </div>
        <div className="w-full p-4 bg-white rounded-lg shadow-sm flex flex-col">
          <ExpenseByMonth />
        </div>
      </div>
      <div className="grid grid-cols-1 text-center gap-4">
        <div className="w-full p-4 bg-white rounded-lg shadow-sm flex flex-col">
          <TargetCategoriesCard />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
