import React, { useState, useEffect } from "react";
import { Button, Container } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { DateRangePicker } from "@mantine/dates";
import { NumberInput } from "@mantine/core";
import { useUser } from "../context/AuthContext";

export default function Hotel() {
  const { id } = useParams();
  const { user } = useUser();
  const navig = useNavigate();

  const [hotel, sethotel] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({
    no_of_persons: 2,
    duration: [],
    total_price: 100,
  });
  const [error, setError] = useState({
    isError: false,
    msg: "",
  });

  const fetchHotel = async () => {
    try {
      const re = await fetch("http://localhost:5000/single-hotel", {
        headers: {
          id,
        },
      });
      const response = await re.json();
      if (response.status) {
        sethotel(response.data);
        setBookingDetails({
          ...bookingDetails,
          total_price: bookingDetails.no_of_persons * hotel.price,
        });
      }
    } catch (e) {
      console.log(e);
      setError({ isError: true, msg: e });
    }
  };

  const bookHotel = async () => {
    if (user.isLoggedin) {
      const re = await fetch("http://localhost:5000/book-hotel", {
        method: "POST",
        body: JSON.stringify({
          hotelId: id,
          name: hotel.name,
          checkIn: bookingDetails.duration[0],
          checkOut: bookingDetails.duration[1],
          price: bookingDetails.total_price,
          no_of_rooms: bookingDetails.no_of_persons,
        }),
        headers: {
          token: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });

      const response = await re.json();
      if (response.status) {
        alert("Your booking is successfully completed!");
      } else {
        alert("Unknown Error occured");
      }
    } else {
      navig("/login");
    }
  };

  useEffect(() => {
    fetchHotel();
  }, []);

  return (
    <div
      className="w-full h-screen text-white py-6"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(0 0 0 / 0.7), rgba(0 0 0 / 0.7)), url(${hotel.images})`,
      }}
    >
      <Container>
        <div className="mx-auto max-w-[720px] w-3/4">
          {!hotel && <span>No data to display</span>}
          <h1 className="font-black text-5xl underline mb-2">{hotel.name}</h1>
          <p>Amenities: {hotel.amenities}</p>

          <p className="my-4">
            Book an amazing experience with{" "}
            <span className="uppercase">{hotel.name}</span> at just{" "}
            <span className="font-bold underline">${hotel.price}</span> per
            night.
          </p>
          <div className="w-3/4 flex flex-col gap-4">
            <label htmlFor="">Choose your stay</label>
            <DateRangePicker
              placeholder="Pick dates range"
              onChange={(e) => {
                setBookingDetails({
                  ...bookingDetails,
                  duration: e,
                });
              }}
            />
            <label htmlFor="">No. of rooms</label>
            <NumberInput
              width={100}
              defaultValue={2}
              placeholder="No. of rooms"
              withAsterisk
              onChange={(e) => {
                if (e) {
                  setBookingDetails({
                    ...bookingDetails,
                    total_price: e * hotel.price,
                  });
                }
              }}
            />
            <hr className="my-4" />
            <div className="flex gap-4 justify-end">
              <div>Total:</div>
              <span className="font-black">
                {" "}
                ${bookingDetails.total_price || hotel.price}
              </span>
            </div>
            <button
              className="w-full bg-teal-200 px-6 py-2 my-4 rounded text-teal-900 hover:bg-teal-400 trasnition font-bold"
              style={{ fontFamily: "Inter" }}
              onClick={bookHotel}
            >
              Book
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
