import React from 'react';
import { AdminDashboard } from '../components/AdminPortalModal';

interface AdminPageProps {
  setCurrentPage: (page: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ setCurrentPage }) => {
  return (
    <AdminDashboard
      isFullPage={true}
      onBackToSite={() => setCurrentPage('home')}
    />
  );
};
