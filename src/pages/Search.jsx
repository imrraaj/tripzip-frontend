import React, { useState } from "react";
import { Container } from "@mantine/core";
import Card from "../components/Cards";
export default function Search() {
  const [searchedHotel, setsearchedHotel] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState({
    isError: false,
    msg: "",
  });

  const fetchSearch = async () => {
    if (!query) return;
    try {
      const re = await fetch("http://localhost:5000/search", {
        headers: {
          search_param: query,
        },
      });
      const response = await re.json();
      setsearchedHotel(response.data);
    } catch (e) {
      console.log(e);
      setError({ isError: true, msg: e });
    }
  };

  return (
    <Container size={1080} my={40}>
      <input
        type="text"
        className="border w-3/4 mx-auto p-2 "
        style={{ fontFamily: "Inter" }}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="ml-4 bg-teal-200 px-6 py-2 rounded text-teal-900 hover:bg-teal-400 trasnition font-bold"
        style={{ fontFamily: "Inter" }}
        onClick={fetchSearch}
      >
        Search
      </button>

      <div className="mx-auto mb-4 grid grid-cols-3 gap-4">
        {searchedHotel.length === 0 && (
          <span className="font-bold my-4">
            Nothing matches with your description
          </span>
        )}
        {searchedHotel.map((hotel) => (
          <Card
            key={hotel.id}
            url={hotel.images}
            name={hotel.name}
            {...hotel}
          />
        ))}
      </div>
    </Container>
  );
}
