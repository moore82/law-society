import TableLayout from '@/components/TableLayout';
import { client } from '@/sanity/lib/client';

export const revalidate = 60;

type FosWinner = {
  _id: string;
  year: string;
  cupWinner: string;
  shieldWinner?: string;
};

export default async function PreviousWinnersPage() {
  const winners = await client.fetch<FosWinner[]>(
    `*[_type == "fosWinner"] | order(year desc)`
  );

  return (
    <TableLayout
      title="WINNERS"
      section="Festival of Sport"
      headers={["Year", "Cup Winner", "Shield Winner"]}
      rows={winners.length > 0 ? winners.map(w => ({
        col1: w.year,
        col2: w.cupWinner,
        col3: w.shieldWinner || "-"
      })) : [{ col1: "No winners added yet.", col2: "", col3: "" }]}
    />
  );
}
