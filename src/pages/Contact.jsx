import { Helmet } from "react-helmet-async";
import NoData from "../components/shared/NoData";

const Contact = () => {
  return (
    <div className="pt-20">
      <Helmet>
        <title>Contact | SwiftParcel</title>
      </Helmet>
      <NoData></NoData>
    </div>
  );
};

export default Contact;
