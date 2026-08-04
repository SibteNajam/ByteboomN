import StationsInit from '@/components/home/StationsInit';
import '../styles/stations.css';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StationsInit />
      {children}
    </>
  );
}
