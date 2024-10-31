import Header from "@/components/dashboard-components/header/Header";
import RecordsHero from "@/components/record/RecordsHero";
import RecordsMenu from "@/components/record/RecordsMenu";

const RecordsPage = () => {

  

  return (
    <div>
      <Header />
      <div className="w-full bg-gray-100 h-screen">
        <div className="container m-auto max-w-[1260px] pt-[80px] flex gap-8">
          <RecordsMenu />
          <RecordsHero />
        </div>
      </div>
    </div>
  );
};
export default RecordsPage;
