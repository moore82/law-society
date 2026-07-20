import TableLayout from '@/components/TableLayout';

export default function CaptainsPage() {
  return (
    <TableLayout 
      title="CAPTAINS" 
      section="Honours Board"
      headers={["Season", "First XV Captain", "Second XV Captain"]}
      rows={Array.from({ length: 8 }).map((_, i) => ({
        col1: `${2026 - i} / ${2027 - i}`,
        col2: i % 2 === 0 ? "Thomas Sterling" : "James Anderson",
        col3: i % 2 === 0 ? "Richard Fletcher" : "William Harrison"
      }))}
    />
  );
}
