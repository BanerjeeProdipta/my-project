import { PatientDemographics, PatientList } from "@/types";
import axios from "axios";

export const getAll = () =>
  axios
    .get<PatientList>("https://62ed1f1ba785760e6764cb98.mockapi.io/patients")
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err: any) => Promise.reject(err.response));

export const getDetails = (id: string) =>
  axios
    .get<PatientDemographics>(
      `https://62ed1f1ba785760e6764cb98.mockapi.io/patients/${id}/evaluations`
    )
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err: any) => Promise.reject(err.response));
