import React, { useState, useEffect } from "react";
import { FooterSocial } from "../components/FooterBottom";
import { Container } from "@mantine/core";
import { Link } from "react-router-dom";
import Card from "../components/Cards";
export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState({
    isError: false,
    msg: "",
  });

  const fetchAllHotels = async () => {
    try {
      const re = await fetch("http://localhost:5000/all-hotels");
      const response = await re.json();
      setHotels(response.data);
    } catch (e) {
      console.log(e);
      setError({ isError: true, msg: e });
    }
  };
  useEffect(() => {
    fetchAllHotels();
  }, []);

  return (
    <Container size={1080} my={40}>
      {error.isError && <span>{error.msg}</span>}
      <div className="mx-auto grid grid-cols-3 gap-4">
        {hotels.length === 0 && <span>No data to display</span>}
        {hotels &&
          hotels.map((hotel) => (
            <Card
              key={hotel.id}
              link={hotel.id}
              rating={hotel.rating}
              url={hotel.images}
              name={hotel.name}
              amenities={hotel.amenities}
              price={hotel.price}
            />
          ))}
      </div>
    </Container>
  );
}
