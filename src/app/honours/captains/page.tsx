import TableLayout from '@/components/TableLayout';
import { client } from '@/sanity/lib/client';

export const revalidate = 60;

type Captain = {
  _id: string;
  season: string;
  firstXv?: string;
  secondXv?: string;
  thirdXv?: string;
  fourthXv?: string;
};

export default async function CaptainsPage() {
  const captains = await client.fetch<Captain[]>(
    `*[_type == "captain"] | order(order asc, season desc)`
  );

  return (
    <TableLayout 
      title="CAPTAINS" 
      section="Honours Board"
      headers={["SEASON", "1ST XV", "2ND XV", "3RD XV", "4TH XV"]}
      rows={captains.map(c => ({
        col1: c.season,
        col2: c.firstXv || "-",
        col3: c.secondXv || "-",
        col4: c.thirdXv || "-",
        col5: c.fourthXv || "-"
      }))}
    />
  );
}
