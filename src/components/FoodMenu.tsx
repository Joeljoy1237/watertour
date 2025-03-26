"use client";
import React, { useState } from 'react';

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface FoodMenuProps {
  vegItems: FoodItem[];
  nonVegItems: FoodItem[];
}

const FoodMenu: React.FC<FoodMenuProps> = ({ vegItems, nonVegItems }) => {
  const [activeTab, setActiveTab] = useState<'veg' | 'nonVeg'>('veg');

  return (
    <div className="food-menu">
      <div className="menu-tabs">
        <button
          className={`tab-button ${activeTab === 'veg' ? 'active' : ''}`}
          onClick={() => setActiveTab('veg')}
        >
          Vegetarian
        </button>
        <button
          className={`tab-button ${activeTab === 'nonVeg' ? 'active' : ''}`}
          onClick={() => setActiveTab('nonVeg')}
        >
          Non-Vegetarian
        </button>
      </div>

      <div className="menu-items">
        {activeTab === 'veg' ? (
          <div className="veg-items">
            <h3>Vegetarian Options</h3>
            <ul>
              {vegItems.map((item) => (
                <li key={item.id} className="menu-item">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="non-veg-items">
            <h3>Non-Vegetarian Options</h3>
            <ul>
              {nonVegItems.map((item) => (
                <li key={item.id} className="menu-item">
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodMenu;