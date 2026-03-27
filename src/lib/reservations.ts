import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "src/data/reservations.json");
const MAX_PER_DAY = 5;

export type ReservationStatus = "pending" | "confirmed" | "refused";

export interface Reservation {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  prestation: string;
  date: string; // YYYY-MM-DD
  heure: string; // HH:MM
  message: string;
  status: ReservationStatus;
  createdAt: string;
}

function read(): Reservation[] {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
}

function write(data: Reservation[]) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export function getAll(): Reservation[] {
  return read().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getPending(): Reservation[] {
  return getAll().filter((r) => r.status === "pending");
}

export function getConfirmed(): Reservation[] {
  return getAll().filter((r) => r.status === "confirmed");
}

export function countConfirmedOnDay(date: string): number {
  return read().filter((r) => r.date === date && r.status === "confirmed").length;
}

export function createReservation(
  data: Omit<Reservation, "id" | "status" | "createdAt">
): { success: boolean; status: ReservationStatus; message: string } {
  const all = read();
  const confirmedToday = all.filter(
    (r) => r.date === data.date && r.status === "confirmed"
  ).length;

  const status: ReservationStatus =
    confirmedToday >= MAX_PER_DAY ? "refused" : "pending";

  const reservation: Reservation = {
    ...data,
    id: crypto.randomUUID(),
    status,
    createdAt: new Date().toISOString(),
  };

  write([...all, reservation]);

  if (status === "refused") {
    return {
      success: false,
      status: "refused",
      message: `Le créneau du ${data.date} est complet (${MAX_PER_DAY} réservations max). Veuillez choisir une autre date.`,
    };
  }

  return {
    success: true,
    status: "pending",
    message: "Votre demande a bien été envoyée. Nous vous contacterons pour confirmer.",
  };
}

export function updateStatus(id: string, status: "confirmed" | "refused") {
  const all = read();
  const updated = all.map((r) => (r.id === id ? { ...r, status } : r));
  write(updated);
}
