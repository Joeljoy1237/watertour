"use client";
import { useState, useEffect } from "react";

import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Toaster, toast } from 'react-hot-toast';

{/*drinks */}
const DrinksSelector: React.FC<{ drinks: string[]; setDrinks: React.Dispatch<React.SetStateAction<string[]>> }> = ({ drinks, setDrinks }) => {

  const [newItem, setNewItem] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedItem, setEditedItem] = useState("");

  const addItem = () => {
    if (newItem.trim() && !drinks.includes(newItem)) {
      setDrinks([...drinks, newItem]);
      setNewItem("");
      toast.success(`${newItem} added to drinks!`); // Success toast for adding a drink
    } else if (!newItem.trim()) {
      toast.error("Drink name cannot be empty!"); // Error toast if the input is empty
    } else {
      toast.error("This drink already exists!"); // Error toast if the drink already exists
    }
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditedItem(drinks[index]);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditedItem("");
  };

  const saveEditedItem = () => {
    if (editedItem.trim()) {
      const updatedItems = [...drinks];
      updatedItems[editingIndex!] = editedItem;
      setDrinks(updatedItems);
      cancelEditing();
      toast.success("Drink updated successfully!"); // Success toast for editing a drink
    } else {
      toast.error("Edited drink name cannot be empty!"); // Error toast for empty edit input
    }
  };

  const deleteItem = (index: number) => {
    const itemToDelete = drinks[index];
    const updatedItems = drinks.filter((_, i) => i !== index);
    setDrinks(updatedItems);
    toast.success(`${itemToDelete} deleted from drinks!`); // Success toast for deleting a drink
  };

  return (
    <div className="border p-4 rounded-lg w-full">
      <details className="cursor-pointer">
        <summary className="font-light">Drinks</summary>
        <div className="mt-2">
          {drinks.map((drink, index) => (
            <div key={index} className="p-2 border rounded-md mb-2 flex justify-between">
              <span>{drink}</span>
              <div className="flex space-x-2">
                <button onClick={() => startEditing(index)} className="text-blue-500">
                  <FaEdit />
                </button>
                <button onClick={() => deleteItem(index)} className="text-red-500">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
          {editingIndex === null ? (
            <div className="flex items-center border rounded-md p-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add drink"
                className="flex-grow outline-none"
              />
              <button onClick={addItem} className="ml-2 text-gray-600">
                <FaPlus />
              </button>
            </div>
          ) : (
            <div className="flex items-center border rounded-md p-2">
              <input
                type="text"
                value={editedItem}
                onChange={(e) => setEditedItem(e.target.value)}
                placeholder="Edit drink"
                className="flex-grow outline-none"
              />
              <button onClick={saveEditedItem} className="ml-2 text-green-600">
                Save
              </button>
              <button onClick={cancelEditing} className="ml-2 text-gray-600">
                Cancel
              </button>
            </div>
          )}
        </div>
      </details>
      <Toaster /> {/* Toaster component to display toast notifications */}
    </div>
  );
};