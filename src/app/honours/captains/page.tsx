import TableLayout from '@/components/TableLayout';
import { client } from '@/sanity/lib/client';

export const revalidate = 60;

type Captain = {
  _id: string;
  season: string;
  firstXv?: string;
  secondXv?: string;
};

export default async function CaptainsPage() {
  const captains = await client.fetch<Captain[]>(
    `*[_type == "captain"] | order(order asc, season desc)`
  );

  return (
    <TableLayout 
      title="CAPTAINS" 
      section="Honours Board"
      headers={["Season", "First XV Captain", "Second XV Captain"]}
      rows={captains.map(c => ({
        col1: c.season,
        col2: c.firstXv || "-",
        col3: c.secondXv || "-"
      }))}
    />
  );
}
