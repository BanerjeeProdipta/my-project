export type Patient = {
  username: string;
  profile: {
    firstName: string;
    lastName: string;
    image: string;
    phone: string;
    newPatient: true;
  };
  id: string;
};

export type PatientList = Patient[];

export type PatientDemographics = {
  diagnosis: string[];
  assessment: string;
  id: string;
  patientId: string;
}[];
