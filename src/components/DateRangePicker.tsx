import React, { useState } from 'react';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ 
  startDate, 
  endDate, 
  setStartDate, 
  setEndDate 
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // Helper functions with proper typing
  const isSameDay = (a: Date, b: Date): boolean => (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );

  const isBefore = (a: Date, b: Date): boolean => a.getTime() < b.getTime();
  const isAfter = (a: Date, b: Date): boolean => a.getTime() > b.getTime();

  const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const handleDateClick = (date: Date): void => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (isBefore(date, startDate)) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  const isInRange = (date: Date): boolean => {
    if (!startDate || !endDate) return false;
    return isAfter(date, startDate) && isBefore(date, endDate);
  };

  const renderDays = (): React.JSX.Element[] => {
    const days: React.JSX.Element[] = [];
    const monthStart = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const monthEnd = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const startDay = monthStart.getDay();
    const daysInMonth = monthEnd.getDate();

    // Previous month days
    for (let i = 0; i < startDay; i++) {
      days.push(
        <div key={`prev-${i}`} className="h-10 p-2 text-gray-400">
          {addDays(monthStart, -startDay + i).getDate()}
        </div>
      );
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        i
      );
      const isRange = isInRange(date);
      const isStart = startDate && isSameDay(date, startDate);
      const isEnd = endDate && isSameDay(date, endDate);

      days.push(
        <button
          key={`day-${i}`}
          type="button"
          className={`h-10 w-10 p-2 rounded-full text-sm
            ${isStart || isEnd ? 'bg-blue-500 text-white' : ''}
            ${isRange ? 'bg-blue-100' : ''}
            hover:bg-blue-200 transition-colors`}
          onClick={() => handleDateClick(date)}
        >
          {i}
        </button>
      );
    }

    // Next month days
    const daysToAdd = 42 - days.length;
    for (let i = 1; i <= daysToAdd; i++) {
      days.push(
        <div key={`next-${i}`} className="h-10 p-2 text-gray-400">
          {i}
        </div>
      );
    }

    return days;
  };

  const goToPreviousMonth = (): void => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = (): void => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  return (
    <div className="relative">
      <div
        className="flex items-center justify-between p-2 border rounded-lg cursor-pointer w-64 hover:border-blue-400 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select date range"
      >
        <span className="text-sm">
          {startDate ? formatDate(startDate) : 'Start Date'}
        </span>
        <span className="mx-1 text-gray-400">-</span>
        <span className="text-sm">
          {endDate ? formatDate(endDate) : 'End Date'}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border rounded-lg shadow-lg p-4 w-80">
          <div className="flex justify-between items-center mb-4">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Previous month"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <h3 className="font-medium">
              {new Intl.DateTimeFormat('en-US', {
                month: 'long',
                year: 'numeric',
              }).format(currentMonth)}
            </h3>
            <button
              type="button"
              onClick={goToNextMonth}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Next month"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
              <div key={day} className="text-xs font-medium text-gray-500 py-1">
                {day}
              </div>
            ))}
            {renderDays()}
          </div>

          <div className="flex justify-between mt-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => {
                setStartDate(null);
                setEndDate(null);
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;