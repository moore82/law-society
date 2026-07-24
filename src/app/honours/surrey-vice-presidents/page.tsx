import { PortableText } from '@portabletext/react';
import { client } from '@/sanity/lib/client';
import TableLayout from '@/components/TableLayout';

export const revalidate = 60;

type VicePresident = {
  _id: string;
  yearAwarded: number;
  lawman: string;
};

type PageData = {
  title: string;
  content: any;
};

export default async function SurreyVicePresidentsPage() {
  const [pageData, vps] = await Promise.all([
    client.fetch<PageData>(`*[_type == "surreyVicePresidentsPage"][0]`),
    client.fetch<VicePresident[]>(`*[_type == "surreyVicePresident"] | order(yearAwarded desc, lawman asc)`)
  ]);

  return (
    <TableLayout 
      title={pageData?.title || 'VICE PRESIDENTS OF SURREY RUGBY'} 
      section="Honours Board"
      intro={pageData?.content ? <PortableText value={pageData.content} /> : <p style={{ fontStyle: 'italic', opacity: 0.8 }}>Placeholder text for the Vice Presidents of Surrey Rugby.</p>}
      headers={["Year Awarded", "Vice President"]}
      rows={vps.map(vp => ({
        col1: String(vp.yearAwarded),
        col2: vp.lawman
      }))}
    />
  );
}
