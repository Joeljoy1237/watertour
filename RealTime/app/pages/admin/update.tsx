import { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function UpdateHouseboat() {
  const [houseboatId, setHouseboatId] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDates, setNewDates] = useState("");

  const updatePrice = () => {
    socket.emit("updatePrice", { houseboatId, newPrice });
  };

  const updateDates = () => {
    socket.emit("updateDates", { houseboatId, newDates: JSON.parse(newDates) });
  };

  return (
    <div>
      <h1>Update Houseboat Details</h1>
      
      <input type="text" placeholder="Houseboat ID" onChange={(e) => setHouseboatId(e.target.value)} />
      
      <input type="number" placeholder="New Price" onChange={(e) => setNewPrice(e.target.value)} />
      <button onClick={updatePrice}>Update Price</button>

      <textarea placeholder='New Dates JSON' onChange={(e) => setNewDates(e.target.value)} />
      <button onClick={updateDates}>Update Dates</button>
    </div>
  );
}
