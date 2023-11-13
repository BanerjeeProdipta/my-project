"use client";
import { useGetDemographics } from "@/hooks/useGetDemographics";

const Details = ({ params }: { params: { patient: string } }) => {
  const id = params.patient;

  const { data: patientDemographics, isLoading } = useGetDemographics(id);

  return (
    <div className="max-w-6xl mx-auto mt-8 p-4 bg-white/60 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-8">Demographics of Patient {id}</h2>

      <div className="bg-white border border-gray-300">
        {isLoading ? (
          <p className="text-sm italic p-6 text-gray-600">Loading...</p>
        ) : (
          patientDemographics &&
          patientDemographics.map((patientDetail) => (
            <div key={patientDetail.id} className="p-4 rounded-md mb-4">
              <div className="mb-2">
                <strong className="text-lg">Demographics ID:</strong>{" "}
                {patientDetail?.id}
              </div>
              <div className="mb-2">
                <strong className="text-lg">Assessment:</strong>{" "}
                {patientDetail?.assessment}
              </div>
              <div className="mb-2">
                <strong className="text-lg">Diagnosis:</strong>{" "}
                <div className="flex mt-2 flex-wrap">
                  {patientDetail?.diagnosis.map((diagnosis) => (
                    <p
                      key={diagnosis}
                      className="border px-2 p-1 mb-2 text-white bg-blue-800/80 mr-2 rounded-full text-xs"
                    >
                      {diagnosis}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Details;
