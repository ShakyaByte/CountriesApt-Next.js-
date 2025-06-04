// Import type for metadata from Next.js (used for SEO and page info)
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Countries Explorer',
  description: 'Explore countries around the world',
};

export default function CountryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-200">
      {children}
    </div>
  );
}