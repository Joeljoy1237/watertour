import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001"); // Change the URL to your backend

export function useSocket() {
  const [priceUpdate, setPriceUpdate] = useState(null);
  const [dateUpdate, setDateUpdate] = useState(null);

  useEffect(() => {
    // Listen for price updates
    socket.on("priceUpdated", (data) => {
      setPriceUpdate(data);
    });

    // Listen for date updates
    socket.on("datesUpdated", (data) => {
      setDateUpdate(data);
    });

    return () => {
      socket.off("priceUpdated");
      socket.off("datesUpdated");
    };
  }, []);

  return { socket, priceUpdate, dateUpdate };
}
