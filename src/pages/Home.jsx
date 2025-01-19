import Banner from "../components/home/Banner";
import Features from "../components/home/Features";
import HomeStatistics from "../components/home/HomeStatistics";
import TopDeliveryMan from "../components/home/TopDeliveryMan";

const Home = () => {
  return (
    <div>
      <section>
        <Banner></Banner>
      </section>
      <section>
        <Features></Features>
      </section>
      <section>
        <HomeStatistics></HomeStatistics>
      </section>
      <section>
        <TopDeliveryMan></TopDeliveryMan>
      </section>
    </div>
  );
};

export default Home;
