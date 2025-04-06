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

    const getStatusInfo = () => {
      if (isDayCruiserBooked && isNightStayBooked) {
        return {
          color: "bg-red-100 border-red-400",
          textColor: "text-red-800",
          icon: "",
          text: "Booked"
        };
      }
      if (isDayCruiserBooked || isNightStayBooked) {
        const availableType = isDayCruiserBooked ? "Night Stay" : "Day Cruise";
        return {
          color: "bg-orange-100 border-orange-400",
          textColor: "text-orange-800",
          icon: isDayCruiserBooked ? "" : "",
          text: availableType
        };
      }
      if (isDayCruiserAvailable && isNightStayAvailable) {
        return {
          color: "bg-green-100 border-green-400",
          textColor: "text-green-800",
          text: "Open"
        };
      }
      if (isDayCruiserAvailable || isNightStayAvailable) {
        const availableType = isDayCruiserAvailable ? "Day Cruise" : "Night Stay";
        return {
          color: "bg-blue-100 border-blue-400",
          textColor: "text-blue-800",
          text: availableType
        };
      }
      return {
        color: "bg-gray-100 border-gray-400",
        textColor: "text-gray-800",
        text: "Closed"
      };
    };

    const statusInfo = getStatusInfo();

    return (
      <button
        key={dateStr}
        onClick={() => isAvailable && onSelectDate(dateStr)}
        disabled={!isAvailable || isPast}
        className={`relative p-2 border rounded-md h-16 flex flex-col items-center justify-center transition
          ${isSelected ? "border-primary bg-primary text-white" : `${statusInfo.color} hover:bg-opacity-75`}
          ${!isAvailable || isPast ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div className="text-sm font-semibold">{cellDate.getDate()}</div>
        <div className={`text-xs flex items-center gap-1 mt-1 ${statusInfo.textColor}`}>
          <span className="text-sm">{statusInfo.icon}</span>
          <span className="font-medium">{statusInfo.text}</span>
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
