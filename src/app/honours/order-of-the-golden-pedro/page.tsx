import { PortableText } from '@portabletext/react';
import TableLayout from '@/components/TableLayout';
import { client } from '@/sanity/lib/client';

export const revalidate = 60;

type GoldenPedro = {
  _id: string;
  year: string;
  inductee: string;
  order?: number;
};

type PageData = {
  title: string;
  content: any;
};

export default async function OrderOfTheGoldenPedroPage() {
  const [pageData, fetchedInductees] = await Promise.all([
    client.fetch<PageData>(`*[_type == "goldenPedroPage"][0]`),
    client.fetch<GoldenPedro[]>(`*[_type == "goldenPedro"]`)
  ]);

  const inductees = [...fetchedInductees].sort((a, b) => {
    // If they have an explicit order, use that first
    if (a.order != null && b.order != null) return a.order - b.order;
    if (a.order != null) return -1;
    if (b.order != null) return 1;
    
    // Otherwise sort by badge number (stored in 'year' field) numerically
    return parseInt(a.year) - parseInt(b.year);
  });

  return (
    <TableLayout 
      title={pageData?.title || "ORDER OF THE GOLDEN PEDRO"} 
      section="Honours Board"
      intro={pageData?.content ? (
        <div className="portable-text" style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
          <PortableText value={pageData.content} />
        </div>
      ) : (
        <p style={{ fontStyle: 'italic', opacity: 0.8 }}>[Text to come]</p>
      )}
      headers={["Badge Number", "Inductee"]}
      rows={inductees.map(g => ({
        col1: g.year,
        col2: g.inductee
      }))}
    />
  );
}
