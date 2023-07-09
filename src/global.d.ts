interface User {
  "@odata.context": string;
  userPrincipalName: string;
  id: string;
  displayName: string;
  surname: string;
  givenName: string;
  preferredLanguage: string;
  mail: string;
  mobilePhone: string | null;
  jobTitle: string | null;
  officeLocation: string | null;
  businessPhones: string[];
}
