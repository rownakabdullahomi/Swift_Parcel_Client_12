import { Helmet } from "react-helmet-async";
import NoData from "../components/shared/NoData";

const Blogs = () => {
  return (
    <div className="pt-20">
      <Helmet>
        <title>Blogs | SwiftParcel</title>
      </Helmet>
      <NoData></NoData>
    </div>
  );
};

export default Blogs;
