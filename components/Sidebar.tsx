'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import {
  Briefcase,
  LayoutDashboard,
  Bell,
  MoreVertical,
  User,
  Moon,
  Sun,
  LogOut,
  Settings,
  Users,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  UserCog,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAuth } from '@/lib/auth';
import { UserRole } from '@/types/user';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const getNavItems = (role: UserRole) => {
  const baseItems = [
    { href: '/dashboard', label: 'navigation.dashboard', icon: LayoutDashboard },
    { href: '/jobs', label: 'navigation.jobs', icon: Briefcase },
    { href: '/notifications', label: 'navigation.notifications', icon: Bell },
  ];

  if (role === 'recruiter') {
    baseItems.splice(2, 0, { href: '/candidates', label: 'navigation.candidates', icon: Users });
  }

  return baseItems;
};

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const { user, logout, role, setRole } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const toggleRole = () => {
    setRole(role === 'recruiter' ? 'candidate' : 'recruiter');
  };

  const navItems = getNavItems(role);

  const SidebarContent = () => (
    <>
      <div className={cn(
        "p-4 flex flex-col items-center justify-center",
        isOpen ? "space-y-3" : "space-y-4"
      )}>
        <div className="flex items-center justify-between w-full">
          <Link href="/dashboard" className="flex items-center justify-center">
            {isOpen ? (
              <h1 className="font-bold text-xl">JobConnect</h1>
            ) : (
              <h1 className="font-bold text-lg">JC</h1>
            )}
          </Link>
          
          {isOpen && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(!isOpen)}
              className="hidden md:flex"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        {isOpen ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleRole}
            className="flex items-center gap-2 w-full justify-center transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
          >
            {role === 'recruiter' ? (
              <Users className="h-4 w-4" />
            ) : (
              <User className="h-4 w-4" />
            )}
            <span className="capitalize">
              {t(`common.${role}`)}
            </span>
          </Button>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={toggleRole}
                    className="transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
                  >
                    {role === 'recruiter' ? (
                      <Users className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Switch to {role === 'recruiter' ? 'Candidate' : 'Recruiter'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsOpen(!isOpen)}
                    className="hidden md:flex"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Expand sidebar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>

      <nav className="flex-1 px-2">
        {navItems.map((item) => (
          <TooltipProvider key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-md mb-2 transition-colors',
                    pathname === item.href
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted',
                    !isOpen && "justify-center"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {isOpen && (
                    <span className="text-sm">
                      {t(item.label)}
                    </span>
                  )}
                </Link>
              </TooltipTrigger>
              {!isOpen && (
                <TooltipContent side="right">
                  {t(item.label)}
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>

      <div className="p-4 border-t">
        <div className={cn(
          "flex items-center",
          isOpen ? "justify-between" : "flex-col justify-center space-y-4"
        )}>
          {isOpen ? (
            <>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-medium">{user?.name || 'John Doe'}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || 'john@example.com'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical className="h-5 w-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        {t('profile.editProfile')}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                      {theme === 'dark' ? (
                        <Sun className="mr-2 h-4 w-4" />
                      ) : (
                        <Moon className="mr-2 h-4 w-4" />
                      )}
                      {theme === 'dark' ? t('profile.lightMode') : t('profile.darkMode')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        {t('profile.settings')}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      {t('profile.logout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center cursor-pointer">
                      <User className="h-4 w-4" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{user?.name || 'John Doe'}</p>
                    <p className="text-xs text-muted-foreground">{user?.email || 'john@example.com'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <DropdownMenu>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Settings & Options</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      {t('profile.editProfile')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                    {theme === 'dark' ? (
                      <Sun className="mr-2 h-4 w-4" />
                    ) : (
                      <Moon className="mr-2 h-4 w-4" />
                    )}
                    {theme === 'dark' ? t('profile.lightMode') : t('profile.darkMode')}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LanguageSwitcher />
                    <span className="ml-2">Language</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      {t('profile.settings')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('profile.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden md:flex h-screen bg-card border-r flex-col transition-all duration-300 fixed left-0 top-0 z-50',
          isOpen ? 'w-64' : 'w-20'
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b px-4 flex items-center justify-between z-50">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
        <h1 className="font-bold text-xl">JobConnect</h1>
        <LanguageSwitcher />
      </div>
    </>
  );
}