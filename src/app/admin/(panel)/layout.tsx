import AdminSidebar from '@/components/admin/AdminSidebar';

/** Every admin page except sign-in: fixed sidebar on the left, content on the right. */
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="adm">
      <AdminSidebar />
      <main className="adm-main">{children}</main>
    </div>
  );
}
