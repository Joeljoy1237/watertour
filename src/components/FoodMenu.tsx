"use client";
import React, { useState } from 'react';

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface FoodMenuProps {
  vegItems: [string];
  nonVegItems:  [string];
}

const FoodMenu: React.FC<FoodMenuProps> = ({ vegItems, nonVegItems }) => {
  const [activeTab, setActiveTab] = useState<'veg' | 'nonVeg'>('nonVeg');

  return (
    <div className="food-menu">
      <div className="menu-tabs pt-3 space-x-3">
        <button
          className={`tab-button ${activeTab === 'nonVeg' ? 'active bg-red-500 p-3 border border-red-400  rounded-md text-white' : 'border border-red-500 p-3 rounded-md'}`}
          onClick={() => setActiveTab('nonVeg')}
        >
          Non-Vegetarian
        </button>
        <button
          className={`tab-button ${activeTab === 'veg' ? 'active bg-primary-400 p-3 border border-primary-600  rounded-md text-white' : 'border border-primary-500 p-3 rounded-md'}`}
          onClick={() => setActiveTab('veg')}
        >
          Vegetarian
        </button>
      </div>

      <div className="menu-items flex ">
        {activeTab === 'veg' ? (
          <div className="veg-items">
            <h3 className='font-semibold mt-3 text-lg '>Vegetarian Options:</h3>
            <ul>
              {vegItems.map((_,item) => (
                
                  <h4 key={_}>🥦{item}</h4>
                  
  
              ))}
            </ul>
          </div>
        ) : (
          <div className="non-veg-items">
            <h3 className='font-semibold mt-3 text-lg'>Non-Vegetarian Options:</h3>
            <ul>
              {nonVegItems.map((item,_) => (
                
                  <h4 key={_}>🟥{item}</h4>
                  
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodMenu;