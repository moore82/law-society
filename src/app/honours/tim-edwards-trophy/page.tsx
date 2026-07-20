import TableLayout from '@/components/TableLayout';

export default function TimEdwardsTrophyPage() {
  return (
    <TableLayout 
      title="TIM EDWARDS TROPHY" 
      section="Honours Board"
      rows={Array.from({ length: 8 }).map((_, i) => ({
        col1: `${2026 - i}`,
        col2: i % 2 === 0 ? "Alexander Campbell" : "Michael Brookes",
        col3: "Outstanding contribution and leadership award winner"
      }))}
    />
  );
}
