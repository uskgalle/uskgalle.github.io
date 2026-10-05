import AdminLayoutClient from './AdminLayoutClient';

export const metadata = {
  title: 'Admin Studio — USK Galle',
  description: 'Internal content generator and publishing workstation for Urban Sketchers Galle.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return (
    <AdminLayoutClient>
      {children}
    </AdminLayoutClient>
  );
}
