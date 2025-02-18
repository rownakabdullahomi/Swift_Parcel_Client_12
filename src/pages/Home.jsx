import { Helmet } from "react-helmet-async";
import Banner from "../components/home/Banner";
import Features from "../components/home/Features";
import HomeStatistics from "../components/home/HomeStatistics";
import TopDeliveryMan from "../components/home/TopDeliveryMan";
import Reviews from "../components/home/Reviews";
import Availability from "../components/home/Availability";
import Faq from "../components/home/Faq";
import ContactUs from "../components/home/ContactUs";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | SwiftParcel</title>
      </Helmet>
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
        <Availability />
      </section>
      <section>
        <TopDeliveryMan></TopDeliveryMan>
      </section>
      <section>
        <Reviews />
      </section>
      <section>
        <Faq />
      </section>
      <section>
        <ContactUs />
      </section>
    </div>
  );
};

export default Home;
