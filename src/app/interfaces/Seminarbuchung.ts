import { Seminar } from "./Seminar";

export interface Seminarbuchung {
    buchungsnummer: string,
    buchungsdatum: Date,
    seminar: Seminar;
}