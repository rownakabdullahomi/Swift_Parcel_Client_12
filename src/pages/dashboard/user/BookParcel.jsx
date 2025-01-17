import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import moment from 'moment';
import usePhone from "../../../hooks/usePhone";

const BookParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [calculatedPrice, setCalculatedPrice] = useState(0.0);
  const [userPhone] = usePhone();

//  console.log(userPhone);

   // Get today's date using moment.js
   const today = moment();

    // Format date for the 'min' attribute in YYYY-MM-DD
  const minDate = today.format("YYYY-MM-DD");

  const handleWeightChange = (event) => {
    const inputValue = event.target.value;
    const parcelWeight = parseFloat(inputValue);

    if (!inputValue || isNaN(parcelWeight)) {
      setCalculatedPrice(0); // Reset the price when input is empty or invalid
      return;
    }

    // Calculate price
    // let price;

    // if (parcelWeight <= 1) {
    //   price = 50;
    // } else if (parcelWeight <= 2) {
    //   price = 100;
    // } else {
    //   price = 150;
    // }

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
    const status = "pending";

      // Format the date using moment.js
  const requestedDeliveryDate = moment(rawRequestedDeliveryDate, "YYYY-MM-DD").format("DD/MM/YYYY");

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
      status,
    };

    // console.log("Parcel Data:", parcelData);

    try {
      const res = await axiosSecure.post("/book/parcel", parcelData);
      if (res.data.insertedId) {
        toast.success("Parcel booked successfully!");
        setCalculatedPrice(0.0);
        form.reset();
      } 
    } catch (error) {
      toast.error("Failed to book parcel. Please try again.", error);
    }
  };

  return (
    <div className="container mx-auto ">
      <h1 className="text-3xl font-bold mb-8 text-center">Book a Parcel</h1>
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
            defaultValue={userPhone}
            className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
            readOnly
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Parcel Type
          </label>
          <input
            type="text"
            name="parcelType"
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
            onChange={handleWeightChange}
            className="w-full px-4 py-2 border rounded-md"
            min="0"
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
            value={calculatedPrice}
            readOnly
            className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
          />
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="btn btn-outline btn-primary  w-full">
            Book Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookParcel;
