"use client";
import { getAll } from "@/hooks/useGetPatientData";
import { Patient, PatientList } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [patients, setPatients] = useState<PatientList>();
  const [filteredPatients, setFilteredPatients] = useState<PatientList>();
  const [filterType, setFilterType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getAllPatient = () => {
    getAll().then((res) => {
      setPatients(res.data);
      setFilteredPatients(res.data);
    });
  };

  useEffect(() => {
    getAllPatient();
  }, []);

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
  }, [filterType, searchTerm, patients]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4 bg-white/60 shadow-md rounded-md">
      <div>
        <h2 className="text-3xl font-bold">Dashboard</h2>
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
      </div>
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
              <tr key={patient.id} className="hover:bg-gray-50">
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
                    <p className="text-green-400">Yes</p>
                  ) : (
                    <p className="text-red-400">No</p>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
