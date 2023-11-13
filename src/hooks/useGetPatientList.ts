import { PatientList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "@/services/axios.config";

export const getAll = () =>
  axios
    .get<PatientList>("/patients")
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((err: any) => Promise.reject(err.response));

export function useGetAll() {
  return useQuery({
    queryKey: ["list"],
    queryFn: () => getAll(),
  });
}
