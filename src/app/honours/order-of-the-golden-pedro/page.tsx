import TableLayout from '@/components/TableLayout';

export default function OrderOfTheGoldenPedroPage() {
  return (
    <TableLayout 
      title="ORDER OF THE GOLDEN PEDRO" 
      section="Honours Board"
      headers={["Year", "Inductee", "Reason for Induction"]}
      rows={Array.from({ length: 6 }).map((_, i) => ({
        col1: `${2026 - i * 2}`,
        col2: i % 2 === 0 ? "Peter 'Pedro' O'Connor" : "Robert Miller",
        col3: i % 2 === 0 ? "Lifetime dedication to club tours and pitch maintenance" : "Exceptional playing record with 150 club caps"
      }))}
    />
  );
}
