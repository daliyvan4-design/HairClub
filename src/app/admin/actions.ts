"use server";

import { createReservation, updateStatus } from "@/lib/reservations";
import { revalidatePath } from "next/cache";

export async function submitReservation(formData: FormData) {
  const result = createReservation({
    nom: formData.get("nom") as string,
    prenom: formData.get("prenom") as string,
    telephone: formData.get("telephone") as string,
    email: formData.get("email") as string,
    prestation: (formData.getAll("prestation") as string[]).join(", "),
    date: formData.get("date") as string,
    heure: formData.get("heure") as string,
    message: (formData.get("message") as string) || "",
  });

  revalidatePath("/admin");
  revalidatePath("/reservation");
  return result;
}

export async function confirmReservation(id: string) {
  updateStatus(id, "confirmed");
  revalidatePath("/admin");
}

export async function refuseReservation(id: string) {
  updateStatus(id, "refused");
  revalidatePath("/admin");
}
