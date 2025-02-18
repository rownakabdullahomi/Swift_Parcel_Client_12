import Headings from "../shared/Headings";


const availabilityData = [
  { name: "Offices", imgSrc: "https://cdn-icons-png.flaticon.com/128/1518/1518379.png" },
  { name: "Industrial", imgSrc: "https://cdn-icons-png.flaticon.com/128/2942/2942169.png" },
  { name: "Residential", imgSrc: "https://cdn-icons-png.flaticon.com/128/16437/16437807.png" },
  { name: "University", imgSrc: "https://cdn-icons-png.flaticon.com/128/8074/8074800.png" },
  { name: "Hospitals", imgSrc: "https://cdn-icons-png.flaticon.com/128/4521/4521422.png" },
  { name: "Railways", imgSrc: "https://cdn-icons-png.flaticon.com/128/2062/2062153.png" },
  { name: "Government", imgSrc: "https://cdn-icons-png.flaticon.com/128/6715/6715844.png" },
  { name: "Restaurants", imgSrc: "https://cdn-icons-png.flaticon.com/512/2921/2921822.png" },
];

const Availability = () => {
  return (
    <div className="px-4 lg:px-6">
      <Headings
        heading={"Bringing Convenience Everywhere!"}
        subHeading={"No matter where you are, our services are designed for you."}
      ></Headings>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 justify-center items-center">
        {availabilityData.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <img src={item.imgSrc} alt={item.name} className="w-20 h-20" />
            <p className="text-lg font-semibold mt-2">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Availability;
