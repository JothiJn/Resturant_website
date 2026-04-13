import { RoyaltyHeader } from "@/components/dashboard/RoyaltyHeader";
import { ReservationList } from "@/components/dashboard/ReservationList";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { getUserReservations } from "@/app/actions/reservations";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const { data: reservations, error } = await getUserReservations();
  
  if (error) {
    redirect('/auth/login');
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Jane Foster";

  return (
    <main className="flex-1 bg-[#f4f3ed] pt-24 pb-20 px-4 md:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <RoyaltyHeader userName={userName} />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-4">
          {/* Main Content Area - Reservations */}
          <section className="md:col-span-8">
            <ReservationList initialReservations={reservations ?? []} />
          </section>

          {/* Sidebar Area - Quick Actions & Orders (Simplified for luxury feel) */}
          <QuickActions />
        </div>
      </div>
    </main>
  );
}
