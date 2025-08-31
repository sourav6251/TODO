import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { DashboardSidebar } from './DashboardSidebar';
import { Outlet } from 'react-router-dom';

export function DashboardLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-dashboard-content">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-dashboard-sidebar flex items-center px-4 lg:px-6">
            <SidebarTrigger className="lg:hidden" />
            <div className="ml-4 lg:ml-0">
              <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
            </div>
          </header>

          <main className="flex-1 p-4 lg:p-6">
            {/* Nested routes render here */}
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
