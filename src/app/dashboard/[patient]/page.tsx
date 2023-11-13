"use client";
import { getDetails } from "@/hooks/useGetPatientData";
import { PatientDemographics } from "@/types";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Details = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const [patientDemographics, setPatientDemographics] =
    useState<PatientDemographics>();

  useEffect(() => {
    const getPatientDemographics = () => {
      if (id && typeof id === "string") {
        getDetails(id).then((res: any) => {
          setPatientDemographics(res.data);
        });
      }
    };
    getPatientDemographics();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-8">Demographics</h2>

      {patientDemographics &&
        patientDemographics.map((patientDetail) => (
          <div key={patientDetail.id} className="p-4 rounded-md mb-4">
            <div className="mb-2">
              <strong className="text-lg">ID:</strong> {patientDetail?.id}
            </div>
            <div className="mb-2">
              <strong className="text-lg">Patient ID:</strong>{" "}
              {patientDetail?.patientId}
            </div>
            <div className="mb-2">
              <strong className="text-lg">Assessment:</strong>{" "}
              {patientDetail?.assessment}
            </div>
            <div className="mb-2">
              <strong className="text-lg">Diagnosis:</strong>{" "}
              {patientDetail?.diagnosis.join(", ")}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Details;
