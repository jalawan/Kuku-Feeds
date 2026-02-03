// src/pages/FeedDescription.tsx
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { FeedsApi } from "../Features/api/FeedApi";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import type { FeedDescriptions  , Feeds} from "../types/Types";



const FeedDescription: React.FC = () => {
  const params = useParams<{ feed_id: string }>();

  // ✅ convert param to number
  const feed_id = Number(params.feed_id);

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.authSlice);

  //scrollup
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // protect if there is invalid id
  const shouldFetch = !Number.isNaN(feed_id) && feed_id > 0;

  const { data: feed, isLoading, error } =
    FeedsApi.useGetfeedByIdQuery(feed_id, { skip: !shouldFetch });

  // const handleBookingRedirect = () => {
  //   if (!isAuthenticated) {
  //     toast.error("Please login to continue");
  //     navigate(`/login?redirect=/booking/${feed_id}`);
  //     return;
  //   }

  //   navigate(`/booking/${feed_id}`);
  // };

  // ✅ back button handler
  const handleBack = () => {
    navigate("/feeds"); // change this if your feeds route is different
  };

  if (!shouldFetch) return <p className="p-10 text-red-500">Invalid feed ID</p>;
  if (isLoading) return <p className="p-10">Loading feed details...</p>;
  if (error || !feed)
    return <p className="text-red-500 p-10">Feed not found</p>;

const f = feed;

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-10 py-22">

        {/* ✅ BACK BUTTON */}
        <button
          onClick={handleBack}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text--700 hover:text-white transition"
        >
          ← Back to Feeds
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          {/* LEFT - image */}
          <div>
            <img
              src={f.imageURL ?? "/images/placeholder.png"}
              className="rounded-3xl shadow-2xl object-cover w-full h-96"
              alt={`${f.feed_name} ${f.feed_type}`}
              loading="lazy"
            />
          </div>

          {/* RIGHT - details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">
              {f.feed_name} {f.feed_type}
            </h1>

            <p className="text-gray-500 mb-6">Animal Feed Descriptions</p>

           

            <div className="mb-6">
              <h3 className="font-bold mb-2">Description</h3>
              <p className="text-gray-700 whitespace-pre-line">{f.description}</p>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-green-700">
                Ksh {f?.price != null
                ? f.price.toLocaleString()
                : "N/A"}/day
              </span>

              <span
                className={`px-4 py-1 rounded-full text-white text-sm ${
                  f.is_active ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {f.is_active ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* <button
              onClick={handleBookingRedirect}
              disabled={!v.availability}
              className="bg-black text-white w-full py-4 rounded-xl font-bold hover:bg-gray-900 transition disabled:opacity-60"
            >
              Book Now
            </button> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default FeedDescription;