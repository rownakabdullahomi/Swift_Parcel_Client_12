import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import moment from "moment";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/shared/LoadingSpinner";

const UpdateParcel = () => {
  const { id: parcelId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [calculatedPrice, setCalculatedPrice] = useState(0.0);
  const navigate = useNavigate();

  // Get today's date using moment.js
  const today = moment();

  // Format date for the 'min' attribute in YYYY-MM-DD
  const minDate = today.format("YYYY-MM-DD");

  //   Get the parcel data
  const {
    data: parcel = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/parcel/${parcelId}`);
      return data;
    },
  });

//   console.log(parcel);

  // Initialize the calculated price with the existing parcel price
  useEffect(() => {
    if (parcel?.price) {
      setCalculatedPrice(parcel.price);
    }
  }, [parcel]);

  if(isLoading) return <LoadingSpinner></LoadingSpinner>

  const handleWeightChange = (event) => {
    const inputValue = event.target.value;
    const parcelWeight = parseFloat(inputValue);

    if (!inputValue || isNaN(parcelWeight)) {
      setCalculatedPrice(parcel.price || 0); // Revert to existing price if invalid input
      return;
    }

    // Calculate price based on weight
    const price = parcelWeight <= 1 ? 50 : parcelWeight <= 2 ? 100 : 150;
    setCalculatedPrice(price);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const parcelType = form.parcelType.value;
    const parcelWeight = parseFloat(form.parcelWeight.value);
    const receiverName = form.receiverName.value;
    const receiverPhone = form.receiverPhone.value;
    const deliveryAddress = form.deliveryAddress.value;
    const rawRequestedDeliveryDate = form.deliveryDate.value;
    const latitude = parseFloat(form.latitude.value);
    const longitude = parseFloat(form.longitude.value);
    const price = calculatedPrice;

    // Format the date using moment.js
    const requestedDeliveryDate = moment(
      rawRequestedDeliveryDate,
      "YYYY-MM-DD"
    ).format("DD/MM/YYYY");

    // Create data object
    const parcelData = {
      name,
      email,
      phone,
      parcelType,
      parcelWeight,
      receiverName,
      receiverPhone,
      deliveryAddress,
      requestedDeliveryDate,
      latitude,
      longitude,
      price,
    };

    console.log("Parcel Data:", parcelData);

    try {
      const res = await axiosSecure.patch(`/user/update/parcel/${parcelId}`, parcelData);
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("Parcel updated successfully!");
        navigate("/dashboard/myParcels")
      }
    } catch (error) {
      toast.error("Failed to update parcel. Please try again.", error);
    }
  };

  return (
    <div className="container mx-auto ">
      <h1 className="text-3xl font-bold mb-8 text-center">Update a Parcel</h1>
      <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={user?.displayName}
            readOnly
            className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={user?.email}
            readOnly
            className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            defaultValue={parcel.phone}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Parcel Type
          </label>
          <input
            type="text"
            name="parcelType"
            defaultValue={parcel.parcelType}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Parcel Weight (kg)
          </label>
          <input
            type="number"
            name="parcelWeight"
            defaultValue={parcel.parcelWeight}
            onChange={handleWeightChange}
            className="w-full px-4 py-2 border rounded-md"
            min="0.1"
            step="0.1"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Receiver&apos;s Name
          </label>
          <input
            type="text"
            name="receiverName"
            defaultValue={parcel?.receiverName}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Receiver&apos;s Phone Number
          </label>
          <input
            type="tel"
            name="receiverPhone"
            defaultValue={parcel.receiverPhone}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Parcel Delivery Address
          </label>
          <input
            type="text"
            name="deliveryAddress"
            defaultValue={parcel.deliveryAddress}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Requested Delivery Date
          </label>
          <input
            type="date"
            name="deliveryDate"
            defaultValue={
              parcel.requestedDeliveryDate
                ? moment(parcel.requestedDeliveryDate, "DD/MM/YYYY").format(
                    "YYYY-MM-DD"
                  )
                : ""
            }
            min={minDate} // Set the minimum date to today
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Delivery Address Latitude
          </label>
          <input
            type="number"
            name="latitude"
            defaultValue={parcel.latitude}
            className="w-full px-4 py-2 border rounded-md"
            step="any"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Delivery Address Longitude
          </label>
          <input
            type="number"
            name="longitude"
            defaultValue={parcel?.longitude}
            className="w-full px-4 py-2 border rounded-md"
            step="any"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Price (Tk)
          </label>
          <input
            type="text"
            name="price"
            value={calculatedPrice || parcel?.price || ""}
            readOnly
            className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
          />
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="btn btn-outline btn-primary  w-full">
            Update Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateParcel;
