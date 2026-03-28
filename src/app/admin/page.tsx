import { getPending, getConfirmed } from "@/lib/reservations";
import { confirmReservation, refuseReservation, deleteReservation } from "@/app/admin/actions";
import { Check, X, Clock, CalendarCheck, Phone, Mail, Scissors, Trash2 } from "lucide-react";

function formatDate(date: string) {
  return new Date(date + "T00:00:00").toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

export default function AdminPage() {
  const pending = getPending();
  const confirmed = getConfirmed();

  return (
    <div className="min-h-screen bg-luxury-secondary/30 pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.4em] text-luxury-gold mb-2">Back Office</p>
          <h1 className="text-4xl font-display font-bold text-black">Administration</h1>
          <div className="flex gap-6 mt-4">
            <Stat label="En attente" value={pending.length} color="text-amber-600" />
            <Stat label="Confirmées" value={confirmed.length} color="text-green-600" />
          </div>
        </div>

        {/* Pending */}
        <section className="mb-16">
          <h2 className="flex items-center gap-2 text-lg font-display font-semibold text-black mb-6 uppercase tracking-wide">
            <Clock size={18} className="text-amber-500" />
            Réservations en attente
            {pending.length > 0 && (
              <span className="bg-amber-500 text-white text-xs px-2 py-0.5 rounded-full font-normal">
                {pending.length}
              </span>
            )}
          </h2>

          {pending.length === 0 ? (
            <p className="text-luxury-gray text-sm font-light py-8 text-center border border-dashed border-luxury-gray/20">
              Aucune réservation en attente.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {pending.map((r) => (
                <div key={r.id} className="bg-white border border-luxury-gold/10 p-6 flex flex-col md:flex-row md:items-center gap-6">
                  {/* Infos client */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <p className="text-lg font-display font-semibold text-black">
                        {r.prenom} {r.nom.toUpperCase()}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-luxury-gray mt-1">
                        <Phone size={13} />
                        <span>{r.telephone}</span>
                      </div>
                      {r.email && (
                        <div className="flex items-center gap-2 text-sm text-luxury-gray mt-1">
                          <Mail size={13} />
                          <span>{r.email}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm text-black font-medium">
                        <Scissors size={13} className="text-luxury-gold" />
                        <span>{r.prestation}</span>
                      </div>
                      <p className="text-sm text-luxury-gray mt-1">
                        📅 {formatDate(r.date)} à {r.heure}
                      </p>
                      {r.message && (
                        <p className="text-xs text-luxury-gray mt-2 italic">"{r.message}"</p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 shrink-0">
                    <form action={confirmReservation.bind(null, r.id)}>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white text-xs uppercase tracking-widest font-semibold transition-colors"
                      >
                        <Check size={14} /> Confirmer
                      </button>
                    </form>
                    <form action={refuseReservation.bind(null, r.id)}>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white text-xs uppercase tracking-widest font-semibold transition-colors"
                      >
                        <X size={14} /> Refuser
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Confirmed */}
        <section>
          <h2 className="flex items-center gap-2 text-lg font-display font-semibold text-black mb-6 uppercase tracking-wide">
            <CalendarCheck size={18} className="text-green-600" />
            Réservations confirmées
          </h2>

          {confirmed.length === 0 ? (
            <p className="text-luxury-gray text-sm font-light py-8 text-center border border-dashed border-luxury-gray/20">
              Aucune réservation confirmée.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-luxury-gold/10 text-left">
                    <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-luxury-gray font-medium">Client</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-luxury-gray font-medium">Téléphone</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-luxury-gray font-medium">Prestation</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-luxury-gray font-medium">Date</th>
                    <th className="px-4 py-3 text-[11px] uppercase tracking-widest text-luxury-gray font-medium">Heure</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {confirmed.map((r, i) => (
                    <tr key={r.id} className={i % 2 === 0 ? "bg-white" : "bg-luxury-secondary/30"}>
                      <td className="px-4 py-3 font-medium text-black">{r.prenom} {r.nom.toUpperCase()}</td>
                      <td className="px-4 py-3 text-luxury-gray">{r.telephone}</td>
                      <td className="px-4 py-3 text-luxury-gray">{r.prestation}</td>
                      <td className="px-4 py-3 text-luxury-gray">{formatDate(r.date)}</td>
                      <td className="px-4 py-3 text-luxury-gold font-semibold">{r.heure}</td>
                      <td className="px-4 py-3">
                        <form action={deleteReservation.bind(null, r.id)}>
                          <button
                            type="submit"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white border border-red-200 hover:border-red-500 text-xs uppercase tracking-widest font-semibold transition-all duration-200"
                            title="Supprimer"
                          >
                            <Trash2 size={12} /> Supprimer
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`text-2xl font-display font-bold ${color}`}>{value}</span>
      <span className="text-sm text-luxury-gray">{label}</span>
    </div>
  );
}
