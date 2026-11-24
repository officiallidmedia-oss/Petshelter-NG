const ICONS: Record<string, string> = {
  overview: 'M5 5h8v8H5zM19 5h8v8h-8zM5 19h8v8H5zM19 19h8v8h-8z',
  animals: 'M16 27s-10-6.2-10-13a5.5 5.5 0 0 1 10-3.2A5.5 5.5 0 0 1 26 14c0 6.8-10 13-10 13z',
  applications: 'M5 8h22v16H5zM5 8l11 9 11-9',
  followups: 'M5 9h22v18H5zM5 15h22M11 5v6M21 5v6',
  medical: 'M12 5h8v7h7v8h-7v7h-8v-7H5v-8h7z',
  volunteers: 'M10 21a5 5 0 1 1 0-10M22 21a5 5 0 1 0 0-10M10 16h12',
  donations: 'M5 17h22l-2.2 8.2a2 2 0 0 1-2 1.5H9.2a2 2 0 0 1-2-1.5zM10 13.5c0-1.6 2.7-2.8 6-2.8s6 1.2 6 2.8c0 1.2-2.7 2-6 2s-6-.8-6-2z',
  petfest: 'M16 4l3.5 7.3 8 1.1-5.8 5.6 1.4 8L16 22.2 8.9 26l1.4-8L4.5 12.4l8-1.1z',
  reports: 'M16 4.5 29 27H3zM16 12.5v6.5',
  site: 'M5 14.5 16 5l11 9.5M8 12.5V26h16V12.5',
  logout: 'M13 6H6v20h7M20 11l5 5-5 5M25 16H12',
};

export default function Icon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICONS[name]} />
    </svg>
  );
}
