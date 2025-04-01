import { useState, useEffect } from "react";
import { useSocket } from "../../hooks/useSocket";

interface Houseboat {
  _id: string;
  name: string;
  price: number;
  dates: string[];
}

interface PriceUpdate {
  houseboatId: string;
}

interface DateUpdate {
  houseboatId: string;
  newDates: string[];
}

export default function HouseboatDetails({ houseboat }: { houseboat: Houseboat }) {
  const { priceUpdate, dateUpdate } = useSocket() as {
    priceUpdate: PriceUpdate | null;
    dateUpdate: DateUpdate | null;
  };
  const [price, setPrice] = useState(houseboat.price);
  const [dates, setDates] = useState(houseboat.dates);

useEffect(() => {
  if (priceUpdate && priceUpdate.houseboatId === houseboat._id) {
    setPrice(houseboat.price); // Add logic to handle price updates
  }
}, [priceUpdate]);

  useEffect(() => {
    if (dateUpdate && dateUpdate.houseboatId === houseboat._id) {
      setDates(dateUpdate.newDates);
    }
  }, [dateUpdate]);

  return (
    <div>
      <h1>{houseboat.name}</h1>
      <p>Price: ₹{price}</p>
      <p>Available Dates: {dates.length} dates</p>
    </div>
  );
}

// Fetch data from the database
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch(`http://localhost:3001/api/houseboat/${context.params?.id ?? ''}`);
  const houseboat = await res.json();

  return {
    props: { houseboat },
  };
}
