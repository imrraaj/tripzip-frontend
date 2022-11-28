import { Link } from "react-router-dom";

export default function Card({ link, url, name, amenities, rating, price }) {
  return (
    <Link
      to={`/hotel/${link}`}
      className="flex flex-col items-center justify-center my-4"
    >
      <div className="text-gray-900">
        <div>
          <img
            src={url}
            alt=" random imgee"
            className="w-[350px] h-[250px] object-cover object-center rounded-lg shadow-md"
          />

          <div className="relative px-4 -mt-16">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-baseline">
                <span className="bg-teal-200 text-teal-800 text-xs px-3 inline-block rounded-full  uppercase font-semibold tracking-wide">
                  New
                </span>
              </div>

              <h4 className="mt-4 text-2xl font-semibold  truncate">{name}</h4>

              <div className="mt-1 font-bold">
                ${price}
                <span className="text-gray-600 text-sm"> /wk</span>
              </div>
              <div className="mt-4">
                <span className="text-teal-600 text-md font-semibold">
                  {rating}/5 ratings{" "}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
