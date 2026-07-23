import TableLayout from '@/components/TableLayout';
import { client } from '@/sanity/lib/client';

export const revalidate = 60;

type TimEdwardsTrophy = {
  _id: string;
  year: string;
  recipient: string;
  reason?: string;
};

export default async function TimEdwardsTrophyPage() {
  const winners = await client.fetch<TimEdwardsTrophy[]>(
    `*[_type == "timEdwardsTrophy"] | order(order asc, year desc)`
  );

  return (
    <TableLayout 
      title="TIM EDWARDS TROPHY" 
      section="Honours Board"
      intro={<p style={{ fontStyle: 'italic', opacity: 0.8 }}>[Flapper is providing background text]</p>}
      headers={["Year", "Recipient", "Reason for Award"]}
      rows={winners.map(w => ({
        col1: w.year,
        col2: w.recipient,
        col3: w.reason || "-"
      }))}
    />
  );
}
