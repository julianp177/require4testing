export interface TESTRUN{
  testrun_ID:number;
  bezeichnung:string;
  user_ID: number;

  requirement_ID: number;
  testcase_ID: TESTCASE[];
}
export interface REQUIREMENT{
  requirement_ID: number;
  bezeichnung: string;
  beschreibung: string;

  testcase_ID: TESTCASE[];
  testrun_ID: TESTRUN[];
}
export interface USER{
  user_ID: number;
  userName: string;
  passwort: string;
  vorname: string;
  nachname: string;
  email: string;
  roel: string;
}
export interface TESTCASE{
  testcase_ID: number;
  bezeichnung: string;
  beschreibung: string;
  ergebnis: string;
  testrun_ID: number;
  requirement_ID: number;
}
export interface Spool{

  id:string;

  createDate: string | null;

  type: string;

  docCounter: string;

  pageCounter: string;

  releasedBy?: string;

  releaseDate?: string  | null;

  pdf:string;

  printDate?: string | null;

  printedBy?: string;



}
