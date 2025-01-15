/* eslint-disable react/prop-types */

const Headings = ({heading, subHeading}) => {
    return (
        <div className="text-center py-20">
          <h2 className="text-4xl font-bold  mb-4">
            {heading}
          </h2>
          <p className="text-xl text-gray-500">
            {subHeading}
          </p>
        </div>
    );
};

export default Headings;