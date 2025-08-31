import { NavLink, useLocation } from 'react-router-dom';
import { CheckSquare, Lightbulb, Key, Users } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { ModeToggle } from '@/components/theme/ModeToggle';
import { SignedIn,   UserButton } from '@clerk/clerk-react';
const menuItems = [
  {
    title: 'Todos',
    url: '/',
    icon: CheckSquare,
  },
  {
    title: 'Ideas',
    url: '/ideas',
    icon: Lightbulb,
  },
  {
    title: 'Sign In',
    url: '/signin',
    icon: Key,
  },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  const getNavClass = (path: string) => {
    const active = isActive(path);
    return active 
      ? 'bg-primary text-primary-foreground font-medium' 
      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground';
  };

  return (
    <Sidebar 
      className="bg-dashboard-sidebar border-r border-border"
      collapsible="icon"
    >
      <SidebarContent>
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <SignedIn>
                <UserButton />
                {/* Login In */}
              </SignedIn>
            </div>
            {state !== 'collapsed' && (
              <span className="font-semibold text-lg text-dashboard-sidebar-foreground">
                UserSystem
              </span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={getNavClass(item.url)}
                      end={item.url === '/'}
                    >
                      <item.icon className="h-4 w-4" />
                      {state !== 'collapsed' && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        
        {/* Theme Toggle Section */}
        <div className="mt-auto p-4 border-t border-border">
          <div className="flex items-center justify-between">
            {state !== 'collapsed' && <span className="text-sm font-medium">Theme</span>}
            <ModeToggle />
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}