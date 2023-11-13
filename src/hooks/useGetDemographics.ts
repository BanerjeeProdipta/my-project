import { PatientDemographics } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "@/services/axios.config";

const getDetails = (id: string) =>
  axios
    .get<PatientDemographics>(`/patients/${id}/evaluations`)
    .then((res) => {
      return res.data;
    })
    .catch((err: any) => Promise.reject(err.response));

export function useGetDemographics(id: string) {
  return useQuery({
    queryKey: ["details", id],
    queryFn: () => getDetails(id),
  });
}
