import { Adresse } from "./Adresse";
import { Seminar } from "./Seminar";
import { Seminarbuchung } from "./Seminarbuchung";

export interface Person{
    id?: number;
    username?: string;
    vorname?: string;
    nachname?: string;
    geburtsdatum?: Date;
    adresse?: Adresse;
    seminarList?: Seminar[];
    seminarbuchungen?: Seminarbuchung[];
}