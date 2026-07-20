import TableLayout from '@/components/TableLayout';

export default function PreviousWinnersPage() {
  return (
    <TableLayout 
      title="PREVIOUS FESTIVAL WINNERS" 
      section="Festival of Sport"
      headers={["Year", "Cup Winner", "Shield Winner"]}
      rows={Array.from({ length: 8 }).map((_, i) => ({
        col1: `${2025 - i}`,
        col2: i % 2 === 0 ? "Wimbledon RFC" : "Richmond FC",
        col3: i % 2 === 0 ? "Teddington Antlers" : "Barnes RFC"
      }))}
    />
  );
}
