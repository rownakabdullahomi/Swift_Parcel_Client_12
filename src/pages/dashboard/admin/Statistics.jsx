import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Chart from "react-apexcharts";
import moment from "moment";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const Statistics = () => {
  const [barChartData, setBarChartData] = useState({});
  const [lineChartData, setLineChartData] = useState({});
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcelStatistics"],
    queryFn: async () => {
      const { data } = await axiosSecure("/parcels/statistics");
      return data;
    },
  });

  useEffect(() => {
    if (parcels.length > 0) {
      console.log("Fetched Parcels:", parcels); // Debugging log
      prepareChartData(parcels);
    }
  }, [parcels]);

  const prepareChartData = (parcels) => {
    const bookingsByDate = {};
    const bookedVsDelivered = {};

    parcels.forEach((parcel) => {
      const bookingDate = moment(parcel.bookingDate).format("DD/MM/YYYY");

      // Count bookings by date
      bookingsByDate[bookingDate] = (bookingsByDate[bookingDate] || 0) + 1;

      // Count booked vs delivered parcels
      bookedVsDelivered[bookingDate] = bookedVsDelivered[bookingDate] || {
        booked: 0,
        delivered: 0,
      };
      bookedVsDelivered[bookingDate].booked += 1;
      if (parcel.status === "delivered") {
        bookedVsDelivered[bookingDate].delivered += 1;
      }
    });

    // Bar chart data
    setBarChartData({
      series: [
        {
          name: "Bookings",
          data: Object.values(bookingsByDate),
        },
      ],
      options: {
        chart: { type: "bar" },
        xaxis: { categories: Object.keys(bookingsByDate) },
        title: { text: "Bookings by Date", align: "center" },
        yaxis: { min: 0 }, // Y-axis starts at 0
      },
    });

    // Line chart data
    const dates = Object.keys(bookedVsDelivered);
    const bookedData = dates.map((date) => bookedVsDelivered[date].booked);
    const deliveredData = dates.map((date) => bookedVsDelivered[date].delivered);

    setLineChartData({
      series: [
        { name: "Booked Parcels", data: bookedData },
        { name: "Delivered Parcels", data: deliveredData },
      ],
      options: {
        chart: { type: "line" },
        xaxis: { categories: dates },
        title: { text: "Comparison: Booked vs Delivered Parcels", align: "center" },
        yaxis: { min: 0 }, // Y-axis starts at 0
        stroke: { curve: "smooth" },
        dataLabels: { enabled: true },
      },
    });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Statistics</h1>

      {/* Bar Chart */}
      <div className="mb-6">
        {barChartData.series?.length > 0 && (
          <Chart
            options={barChartData.options}
            series={barChartData.series}
            type="bar"
            height={350}
          />
        )}
      </div>

      {/* Line Chart */}
      <div>
        {lineChartData.series?.length > 0 && (
          <Chart
            options={lineChartData.options}
            series={lineChartData.series}
            type="line"
            height={350}
          />
        )}
      </div>
    </div>
  );
};

export default Statistics;
