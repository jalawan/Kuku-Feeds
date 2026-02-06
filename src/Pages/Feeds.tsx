import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { FeedsApi } from "../Features/api/FeedApi";
import { BookingApi } from "../Features/api/BookingApi";
import  type { Bookings } from "../types/Types";
import { toast, Toaster } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { ArrowBigRightDash } from "lucide-react";




const Feeds: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.authSlice);
  const navigate = useNavigate();


   // ✅ Filter States
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(60000);
  const [feedType, setFeedType] = useState("");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [sort, setSort] = useState("");

  
  const { data: feeds, error, isLoading } = FeedsApi.useGetAllfeedsQuery();
  const [createBooking, { isLoading: isBookingLoading }] = BookingApi.useAddNewBookingStatusMutation();


  // ✅ FRONTEND FILTERING (DO NOT REMOVE ANY EXISTING CODE)
const filteredFeeds = useMemo(() => {
  if (!feeds) return [];

  return feeds
    .filter((v: any) => {
      const priceMatch =
        v.price >= minPrice && v.price <= maxPrice;

      const feedMatch =
        !feedType || v.feed_type === feedType;

      const is_activeMatch =
        !availableOnly || v.is_active === true;

      return (
        priceMatch &&
        feedMatch &&
        is_activeMatch
      );
    })
    .sort((a: any, b: any) => {
      if (sort === "asc") return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
      return 0;
    });
}, [feeds, minPrice, maxPrice, feedType,  availableOnly, sort]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState<any>(null);

  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [driverType, setDriverType] = useState<"self_drive" | "chauffeur">("self_drive");
  const [serviceType, setServiceType] = useState<"standard_rental" | "hotel_transport">("standard_rental");

  const openModal = (feed: any) => {
    if (!isAuthenticated) {
      toast.error("Please login to book a feed");
      return;
    }
    if (!feed.is_active) {
      toast.error("Feed not available");
      return;
    }

    setSelectedFeed(feed);
    setIsModalOpen(true);
  };

  
  const numberOfFeeds = useMemo(() => {
    if (!pickupDate || !returnDate) return 1;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  }, [pickupDate, returnDate]);


  const totalPrice = useMemo(() => {
    if (!selectedFeed) return 0;
    let total = selectedFeed.price * numberOfFeeds;
    if (driverType === "chauffeur") total += 3500;
    if (serviceType === "hotel_transport") total += 2500;
    return total;
  }, [selectedFeed, driverType, serviceType, numberOfFeeds]);

  const handleBooking = async () => {
    if (!selectedFeed || !pickupDate) {
      toast.error("Please select pickup date");
      return;
    }

    const toastId = toast.loading("Processing booking...");

    try {
      const bookingPayload: Partial<Bookings> = {
        user_id: user!.user_id,
        feed_id: selectedFeed.feed_id,
        total_amount: totalPrice,
        status: "CONFIRMED",
      };

      const res = await createBooking(bookingPayload).unwrap();
      toast.success(res.message, { id: toastId });

      // ✅ Mark feed as unavailable (optional: call backend API)
      // await FeedApi.useUpdateFeedAvailability(selectedFeed.feed_id);

      setIsModalOpen(false);
      setSelectedFeed(null);
      setPickupDate("");
      setReturnDate("");
      setDriverType("self_drive");
      setServiceType("standard_rental");

      navigate("/dashboard/my-bookings");
    } catch (err) {
      console.error(err);
      toast.error("Booking failed", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      <Toaster richColors position="top-right" />

{/* Hero
      <div className="bg-black text-white py-16 text-center">
        <h1 className="text-5xl font-bold mb-4">🚘 Trinity Feed Booking</h1>
        <p className="opacity-90">Great Feeds <ArrowBigRightDash/> Healthy Animals</p>
      </div> */}

      {/* ✅ FILTER BAR */}
<div className="bg-white shadow p-4 mx-10 mt-6 rounded-xl grid grid-cols-1 md:grid-cols-6 gap-4">

 
          {/* ✅ Min Price */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Minimum Price</label>
            <input
              type="number"
              placeholder="Enter min price"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="input input-bordered"
            />
          </div>

          {/* ✅ Max Price */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Maximum Price</label>
            <input
              type="number"
              placeholder="Enter max price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="input input-bordered"
            />
          </div>


          {/* Feed Type */}
          <div className=" mt-6">
          <select
            value={feedType}
            onChange={(e) => setFeedType(e.target.value)}
            className="select select-bordered"
          >
            <option value="">All Feed types</option>
            <option value="Petrol">STARTER</option>
            <option value="Diesel">GROWER</option>
            <option value="Hybrid">LAYER</option>
          </select>
         </div>
          
          {/* Sort */}

          <div className=" mt-6">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="select select-bordered"
          >
            <option value="">Sort By</option>
            <option value="asc">Price Low → High</option>
            <option value="desc">Price High → Low</option>
          </select>
          </div>

          {/* Availability */}
          {isAuthenticated &&(
          <label className="flex items-center gap-2 text-sm font-semibold">
            <input
              type="checkbox"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
              className="checkbox checkbox-primary"
            />
            Available Only
          </label>
          )}
        </div>

      {/* Feed Grid */}
      <div className="flex-1 p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <p>Loading feeds...</p>
        ) : error ? (
          <p className="text-red-500">Error loading feeds</p>
        ) : (
          filteredFeeds?.map((feed: any) => (
            <div
              key={feed.feed_id}
              className="relative bg-white rounded-2xl shadow-xl hover:-translate-y-2 transition-all overflow-hidden"
            >
               <img
                src={feed.imageURL}
                alt={feed.model}
                className="w-full h-48 object-cover"
                                />

              {/* Luxury price badge */}
              <div className="absolute ml-35 mt-15 px-4 py-1 rounded-full text-white
                bg-linear-to-r from-yellow-500 to-yellow-300 animate-pulse font-bold shadow-lg">
                Ksh 
                  {feed?.price != null
                    ? feed.price.toLocaleString()
                    : "N/A"} /day
              </div>

              <div className="p-6">
              <h3 className="text-xl font-bold mb-2">
                {feed.feed_name} {feed.feed_type}
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                 {feed.feed_type}
              </p>
              {user && (
                <button
                  onClick={() => openModal(feed)}
                  disabled={!feed.is_active}
                  className={`w-full py-3 mb-3 rounded-full font-bold transition
                    ${feed.is_active
                      ? "bg-black text-white hover:bg-gray-900"
                      : "bg-gray-400 cursor-not-allowed"}`}
                >
                  {feed.is_active ? "Book Now" : "Unavailable"}
                </button>
              )}
              <button
                onClick={() => navigate(`/feedDesc/${feed.feed_id}`)}
                className="w-full py-3 rounded-full font-bold transition bg-black text-white hover:bg-gray-900"
              >
                More Details
              </button>
            </div>

            </div>
          ))
        )}
      </div>

      {/* Booking Modal */}
      {isModalOpen && selectedFeed && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-xl font-bold mb-4">Complete Booking</h3>

            {/* Service Type */}
            <select
              className="select select-bordered w-full mb-3"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value as any)}
            >
              <option value="standard_rental">Standard Rental</option>
              <option value="hotel_transport">Hotel Transportation</option>
            </select>

            {/* Driver Type */}
            <select
              className="select select-bordered w-full mb-3"
              value={driverType}
              onChange={(e) => setDriverType(e.target.value as any)}
            >
              <option value="self_drive">Self Drive</option>
              <option value="chauffeur">With Driver</option>
            </select>

            {/* Pickup & Return Dates */}
            <input
              type="date"
              className="input input-bordered w-full mb-3"
              onChange={(e) => setPickupDate(e.target.value)}
            />
            <input
              type="date"
              className="input input-bordered w-full mb-4"
              onChange={(e) => setReturnDate(e.target.value)}
            />

            {/* Total Price */}
            <div className="flex justify-between mb-4">
              <span>Total:</span>
              <span className="font-bold text-green-700">Ksh {totalPrice.toLocaleString() ?? "N/A"}</span>
            </div>

            <div className="modal-action">
              <button className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn bg-black text-white" onClick={handleBooking} disabled={isBookingLoading}>
                {isBookingLoading ? "Processing..." : "Confirm Booking"}
              </button>
            </div>
          </div>
        </div>
      )}

     
    </div>
  );
};

export default Feeds;
