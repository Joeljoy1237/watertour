import { useState } from "react";

interface Availability {
  dayCruiser: boolean;
  nightStay: boolean;
  dayCruiserBooked?: boolean;
  nightStayBooked?: boolean;
}

interface CalendarAvailabilityPickerProps {
  selectedDate: string;
  onSelectDate: (date: string) => void;
  availability: Record<string, Availability>;
}

const CalendarAvailabilityPicker: React.FC<CalendarAvailabilityPickerProps> = ({
  selectedDate,
  onSelectDate,
  availability,
}) => {
  const today = new Date();
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1); // 1-indexed

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  const formatDate = (d: Date) =>
    `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;

  const handleMonthChange = (direction: "prev" | "next") => {
    let newMonth = direction === "next" ? currentMonth + 1 : currentMonth - 1;
    let newYear = currentYear;
    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }
    setCurrentYear(newYear);
    setCurrentMonth(newMonth);
  };

  const cells = Array.from({ length: totalCells }, (_, index) => {
    let cellDate: Date;

    if (index < firstDay) {
      const day = new Date(currentYear, currentMonth - 1, 0).getDate() - (firstDay - index) + 1;
      cellDate = new Date(currentYear, currentMonth - 2, day);
    } else if (index < firstDay + daysInMonth) {
      const day = index - firstDay + 1;
      cellDate = new Date(currentYear, currentMonth - 1, day);
    } else {
      const day = index - (firstDay + daysInMonth) + 1;
      cellDate = new Date(currentYear, currentMonth, day);
    }

    const dateStr = formatDate(cellDate);
    const isPast = cellDate < todayMidnight;
    const avail = availability[dateStr] ?? { dayCruiser: false, nightStay: false };
    const isAvailable = avail.dayCruiser || avail.nightStay;
    const isSelected = selectedDate === dateStr;

    const isDayCruiserAvailable = avail.dayCruiser;
    const isNightStayAvailable = avail.nightStay;
    const isDayCruiserBooked = avail.dayCruiserBooked;
    const isNightStayBooked = avail.nightStayBooked;

    const statusColor = isDayCruiserBooked && isNightStayBooked 
        ? "bg-red-200 text-red-800" 
        : (isDayCruiserBooked || isNightStayBooked)
            ? "bg-orange-200 text-orange-800"
            : isDayCruiserAvailable && isNightStayAvailable 
                ? "bg-green-200 text-green-800" 
                : (isDayCruiserAvailable || isNightStayAvailable 
                    ? "bg-yellow-200 text-yellow-800" 
                    : "bg-gray-200 text-gray-800");

    const statusText = isDayCruiserBooked && isNightStayBooked 
        ? "Fully Booked" 
        : (isDayCruiserBooked || isNightStayBooked)
            ? "Partially Booked"
            : isDayCruiserAvailable && isNightStayAvailable
                ? "Available"
                : (isDayCruiserAvailable || isNightStayAvailable
                    ? "Partially Available"
                    : "Unavailable");

    return (
      <button
        key={dateStr}
        onClick={() => isAvailable && onSelectDate(dateStr)}
        disabled={!isAvailable || isPast}
        className={`p-2 border rounded-md h-16 flex flex-col items-center justify-center  transition ${
          isSelected ? "border-primary bg-primary text-white" : "border-gray-300 hover:bg-gray-50 hover:text-black"
        } ${!isAvailable || isPast ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="text-sm font-semibold">{cellDate.getDate()}</div>
        <div className={`text-xs mt-1 px-1 rounded ${statusColor}`}>
          {statusText}
        </div>
      </button>
    );
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => handleMonthChange("prev")}
          disabled={currentYear === today.getFullYear() && currentMonth === today.getMonth() + 1}
          className="px-2 py-1 border rounded disabled:opacity-50"
        >
          {"<"}
        </button>
        <h3 className="font-semibold">
          {new Date(currentYear, currentMonth - 1).toLocaleString("en", { month: "long", year: "numeric" })}
        </h3>
        <button onClick={() => handleMonthChange("next")} className="px-2 py-1 border rounded">
          {">"}
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2 text-center text-gray-700 font-medium">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{cells}</div>
    </div>
  );
};

export default CalendarAvailabilityPicker;
