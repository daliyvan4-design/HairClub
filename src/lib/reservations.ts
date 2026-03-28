import fs from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "src/data");
const FILE = path.join(DIR, "reservations.json");
const MAX_PER_DAY = 5;

export type ReservationStatus = "pending" | "confirmed" | "refused";

export interface Reservation {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  prestation: string;
  date: string;
  heure: string;
  message: string;
  status: ReservationStatus;
  createdAt: string;
}

function read(): Reservation[] {
  try {
    if (!fs.existsSync(FILE)) return [];
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
  } catch {
    return [];
  }
}

function write(data: Reservation[]) {
  if (!fs.existsSync(DIR)) fs.mkdirSync(DIR, { recursive: true });
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

  const pendingToday = all.filter(
    (r) => r.date === data.date && r.status === "pending"
  ).length;

  // Refus automatique si déjà 5 réservations confirmées ou en attente
  const status: ReservationStatus =
    confirmedToday + pendingToday >= MAX_PER_DAY ? "refused" : "pending";

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
      message: `Le créneau du ${new Date(data.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })} est complet (${MAX_PER_DAY} réservations max). Veuillez choisir une autre date.`,
    };
  }

  return {
    success: true,
    status: "pending",
    message: "Votre demande a bien été envoyée ! Nous vous contacterons rapidement pour confirmer votre rendez-vous.",
  };
}

export function updateStatus(id: string, status: "confirmed" | "refused") {
  const all = read();
  const updated = all.map((r) => (r.id === id ? { ...r, status } : r));
  write(updated);
}
