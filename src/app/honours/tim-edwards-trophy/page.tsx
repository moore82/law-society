import { PortableText } from '@portabletext/react';
import TableLayout from '@/components/TableLayout';
import { client } from '@/sanity/lib/client';

export const revalidate = 60;

type TimEdwardsTrophy = {
  _id: string;
  year: string;
  recipient: string;
};

type PageData = {
  title: string;
  content: any;
};

export default async function TimEdwardsTrophyPage() {
  const [pageData, winners] = await Promise.all([
    client.fetch<PageData>(`*[_type == "timEdwardsTrophyPage"][0]`),
    client.fetch<TimEdwardsTrophy[]>(
      `*[_type == "timEdwardsTrophy"] | order(order asc, year desc)`
    )
  ]);

  return (
    <TableLayout 
      title={pageData?.title || "TIM EDWARDS MEMORIAL TROPHY"} 
      section="Honours Board"
      intro={pageData?.content ? (
        <div className="portable-text" style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
          <PortableText value={pageData.content} />
        </div>
      ) : (
        <p style={{ fontStyle: 'italic', opacity: 0.8 }}>[Flapper is providing background text]</p>
      )}
      headers={["Year", "Recipient"]}
      rows={winners.map(w => ({
        col1: w.year,
        col2: w.recipient
      }))}
    />
  );
}
