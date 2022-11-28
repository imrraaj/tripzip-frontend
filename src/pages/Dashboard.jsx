import React, { useState, useEffect } from "react";
import Protected from "../components/Protected";

function Dashboard() {
  const [myBookings, setmyBookings] = useState([]);
  const [error, setError] = useState({
    isError: false,
    msg: "",
  });

  useEffect(() => {
    getAllBookings();
  }, []);

  const getAllBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/get-bookings", {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      if (response.status) {
        console.log(response.data);
        setmyBookings(response.data);
      } else {
        setError({ isError: true, msg: response.data });
      }
    } catch (e) {
      setError({ isError: true, msg: "Unknown error occured!!" });
    }
  };

  return (
    <Protected>
      <div className="max-w-[1080px] mx-auto py-6">
        {!myBookings && <span>You haven't made any bookings</span>}

        {myBookings && (
          <table className="table-auto border">
            <thead className="bg-teal-200 text-teal-700">
              <tr>
                <th className="font-bold py-4">Image</th>
                <th className="font-bold py-4">Hotel Name</th>
                <th className="font-bold py-4">No. of Rooms</th>
                <th className="font-bold py-4">Check-in</th>
                <th className="font-bold py-4">Check-out</th>
                <th className="font-bold py-4">Price</th>
              </tr>
            </thead>
            <tbody>
              {myBookings.map((b) => (
                <tr key={b.id} className="border">
                  <td className="w-48 border">
                    <img src={b.hotel.images} className="w-48 h-36" alt="" />
                  </td>
                  <td className="w-48 text-center font-bold border">
                    {b.hotel.name}
                  </td>
                  <td className="w-48 text-center border">
                    {b.number_of_rooms}
                  </td>
                  <td className="w-48 text-center border">
                    {new Date(b.checkIn).toLocaleString().split(", ")[0]}
                  </td>
                  <td className="w-48 text-center border">
                    {new Date(b.checkOut).toLocaleString().split(", ")[0]}
                  </td>
                  <td className="w-48 text-center border">{b.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Protected>
  );
}
export default Dashboard;
