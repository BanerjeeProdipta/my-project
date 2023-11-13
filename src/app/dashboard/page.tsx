"use client";
import { useGetAll } from "@/hooks/useGetPatientList";
import { Patient, PatientList } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [filteredPatients, setFilteredPatients] = useState<PatientList>();
  const [filterType, setFilterType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: patients, isLoading } = useGetAll();

  useEffect(() => {
    const applyFilters = () => {
      if (!filterType && !searchTerm) {
        setFilteredPatients(patients);
        return;
      }

      const filteredList = patients?.filter((patient) => {
        if (filterType && searchTerm) {
          if (filterType === "userName")
            return patient.username
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          else
            return (patient.profile as any)[filterType]
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
        }
        return true;
      });

      setFilteredPatients(filteredList);
    };
    applyFilters();
  }, [filterType, patients, searchTerm]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4 bg-white/60 shadow-md rounded-md">
      <div>
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

        <div className="flex items-center space-x-2 my-4">
          <label htmlFor="filter">Filter by:</label>
          <select
            id="filter"
            onChange={handleFilterChange}
            className="border rounded p-1"
          >
            <option value="">Select...</option>
            <option value="userName">Username</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="phone">Phone</option>
          </select>
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
            className="border rounded p-1"
          />
        </div>
        {isLoading ? (
          <p className="text-sm italic text-gray-600">Loading...</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">Username</th>
                <th className="py-2 px-4 border-b text-left">First Name</th>
                <th className="py-2 px-4 border-b text-left">Last Name</th>
                <th className="py-2 px-4 border-b text-left">Phone</th>
                <th className="py-2 px-4 border-b text-left">Newly Added</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients &&
                filteredPatients.map((patient: Patient) => (
                  <tr key={patient.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b flex items-center">
                      <Image
                        src={patient.profile.image}
                        height={40}
                        width={40}
                        alt={`patient avatar ${patient.profile.firstName}`}
                        className="rounded-full mr-2"
                      />
                      <Link
                        href={`/dashboard/${patient.id}`}
                        className="text-blue-500"
                      >
                        {patient.username}
                      </Link>
                    </td>
                    <td className="py-2 px-4 border-b text-left">
                      {patient.profile.firstName}
                    </td>
                    <td className="py-2 px-4 border-b text-left">
                      {patient.profile.lastName}
                    </td>
                    <td className="py-2 px-4 border-b text-left">
                      {patient.profile.phone}
                    </td>
                    <td className="py-2 px-4 border-b text-left">
                      {patient.profile.newPatient ? (
                        <p className="rounded-full text-center bg-green-400/50 text-xs py-1 w-20">
                          Yes
                        </p>
                      ) : (
                        <p className="rounded-full text-center bg-red-400/50 text-xs py-1 w-20">
                          No
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
