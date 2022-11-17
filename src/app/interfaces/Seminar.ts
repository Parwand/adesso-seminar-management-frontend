import { Seminarraum } from "./Seminarraum";

export interface Seminar {
    seminarnummer: number;
    seminarTitle?: string;
    beginn?: Date;
    ende?: Date;
    kursinhalt?: string;
    teilnehmeranzahl?: number;
    seminarleiter?: string;
    voraussetzung?: string;
    seminarraum?: Seminarraum;
}