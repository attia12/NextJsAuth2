"use client"; 

import axios from "axios";
import React, { useState } from "react";

const UserProfileForm = ({ user }) => {
  const [firstName, setFirstName] = useState(user.name.split(" ").slice(0, -1).join(" "));
  const [lastName, setLastName] = useState(user.name.split(" ").slice(-1)[0]);
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    // alert(`First Name: ${firstName}\nLast Name: ${lastName}\nBirthdate: ${birthdate}\nAddress: ${address}\nPhone Number: ${phoneNumber}`);
    const addressCheck = await axios.get(`https://api-adresse.data.gouv.fr/search/?q=${address}`);
    const location = addressCheck.data.features[0]?.geometry.coordinates;
    console.log(location)

    if (!location) {
      alert("Address not found");
      return;
    }

    const distanceToParis = getDistanceFromLatLonInKm(48.8566, 2.3522, location[1], location[0]);
    
    if (distanceToParis > 50) {
      alert("Address is more than 50km from Paris");
      return;
    }

    
    try {
      const response = await axios.post("/api/user", {
        firstName,
        lastName,
        birthDate: birthdate,
        address,
        phoneNumber,
      });

      if (response.status === 200) {
        alert("User info saved successfully!");
      } else {
        alert("Failed to save user info.");
      }
    } catch (error) {
      console.error("Error saving user info:", error);
      alert("An error occurred while saving your information.");
    }
  };
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Birthdate</label>
        <input
          type="date"
          name="birthdate"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Save
      </button>
    </form>
  );
};

export default UserProfileForm;
