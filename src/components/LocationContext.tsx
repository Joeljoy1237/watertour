import React, { createContext, useContext, useState, ReactNode } from "react";

interface LocationContextType {
  locations: string[];
  addLocation: (location: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locations, setLocations] = useState<string[]>([]);

  const addLocation = (location: string) => {
    // Only update state if the location is not already in the list
    setLocations((prev) => {
      if (!prev.includes(location)) {
        return [...prev, location];
      }
      return prev;
    });
  };

  return (
    <LocationContext.Provider value={{ locations, addLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocationContext must be used within a LocationProvider");
  }
  return context;
};
