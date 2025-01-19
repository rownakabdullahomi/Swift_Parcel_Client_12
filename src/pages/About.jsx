import { Helmet } from "react-helmet-async";
import NoData from "../components/shared/NoData";

const About = () => {
  return (
    <div className="pt-20">
      <Helmet>
        <title>About | SwiftParcel</title>
      </Helmet>
      <NoData></NoData>
    </div>
  );
};

export default About;
