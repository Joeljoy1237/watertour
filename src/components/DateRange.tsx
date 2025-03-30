"use client"
import React, { useState, useEffect } from 'react'
import { CiCalendar } from "react-icons/ci";
import "react-date-range/dist/styles.css"; // Correct path for styles
import "react-date-range/dist/theme/default.css"; // Correct path for theme
import { DateRange as ReactDateRange } from 'react-date-range';


const DateRange = () => {
    const [isShowDateRange, setIsShowDateRange] = useState(false);
    const [state, setState] = useState([
        { 
            startDate: new Date(), 
            endDate: new Date(), 
            key: 'selection' 
        },]);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth <= 1024);
      }

    handleResize()
    window.addEventListener ("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize)
    }, [])
    
    /* const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      ]); */

  return (
    <div className="flex items-center f-full mt-10">
      <div className="">
        <div className="flex items-center justify-center">
        <h2>Selected Range: {state[0].startDate.toDateString()} - {state[0].endDate.toDateString()}</h2>
        </div>
        <div className="relative">
        <div className="flex mt-4">
        <button 
        onClick={() => setIsShowDateRange(!isShowDateRange)} 
        className="flex items-center gap-x-1 text-sm rounded-lg border px-4 py-2 bg-[#2ca01c] text-white ">
            <CiCalendar className="text-lg"/>
            <span className="font-medium">Select Date</span>
        </button>
        </div>
        {isShowDateRange && (
            <div className="absolute">
                {""}
                <ReactDateRange
                    editableDateInputs={true}
                    onChange={item => setState([{
                        startDate: item.selection.startDate || new Date(),
                        endDate: item.selection.endDate || new Date(),
                        key: item.selection.key || 'selection'
                    }])}
                    moveRangeOnFirstSelection={false}
                    ranges={state}
                    showPreview={false}
                    showDateDisplay={false}
                    months={isMobile ? 1 : 2}
                    direction={isMobile ? "vertical" : "horizontal"}
                    rangeColors={["#2ca01c"]}
                    className="rounded-lg shadow-md"
                />{""}
            </div>
        )}  
        </div>
      </div>
    </div>
  )
}

export default DateRange