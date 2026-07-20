import TableLayout from '@/components/TableLayout';
import { client } from '@/sanity/lib/client';

export const revalidate = 60;

type GoldenPedro = {
  _id: string;
  year: string;
  inductee: string;
  reason?: string;
};

export default async function OrderOfTheGoldenPedroPage() {
  const inductees = await client.fetch<GoldenPedro[]>(
    `*[_type == "goldenPedro"] | order(order asc, year desc)`
  );

  return (
    <TableLayout 
      title="ORDER OF THE GOLDEN PEDRO" 
      section="Honours Board"
      headers={["Year", "Inductee", "Reason for Induction"]}
      rows={inductees.map(g => ({
        col1: g.year,
        col2: g.inductee,
        col3: g.reason || "-"
      }))}
    />
  );
}
