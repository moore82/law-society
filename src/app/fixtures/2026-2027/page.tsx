import TableLayout from '@/components/TableLayout';

export default function Season2026Page() {
  return (
    <TableLayout
      title="2026 / 2027"
      section="Fixtures & Results"
      headers={["Date", "Opponent", "Venue / Result"]}
      rows={[
        { col1: "Sep 12, 2026", col2: "BATTERSEA IRONSIDES", col3: "W 24 - 12 (Away)" },
        { col1: "Sep 26, 2026", col2: "HAMPSTEAD RFC", col3: "W 18 - 15 (Home)" },
        { col1: "Oct 10, 2026", col2: "KINGS COLLEGE HOSPITAL", col3: "L 10 - 22 (Away)" },
        { col1: "--- CURRENT DATE / MID-SEASON ---", col2: "", col3: "", isDivider: true },
        { col1: "Oct 24, 2026", col2: "OLD RUTLISHIANS", col3: "Home - 15:00 Kick Off" },
        { col1: "Nov 07, 2026", col2: "CITY LIONS", col3: "Away - 14:30 Kick Off" },
        { col1: "Nov 21, 2026", col2: "BATTERSEA IRONSIDES", col3: "Home - 15:00 Kick Off" }
      ]}
    />
  );
}
