import { Tab } from '@type/tabs';
import React, { useState } from 'react';
import { Dropdown } from './Dropdown';
import { Organization } from '@type/organization';
import { useAuth } from '@frontend/context/AuthContext';
import { FaBars } from 'react-icons/fa';
import { CrossIcon } from '@frontend/svgs/CrossIcon';

interface ContainerProps {
  children: React.ReactNode;
  activeTab: Tab;
  showSideBar?: boolean;
  className?: string;
}

export function Container({
  children,
  activeTab,
  showSideBar,
  className = 'flex-1 p-4 md:p-6 overflow-auto',
}: ContainerProps) {
  const { organizations, activeOrg, setActiveOrg } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { tab: Tab.Logs, label: 'Logs', href: '/logs' },
    { tab: Tab.Settings, label: 'Settings', href: '/settings' },
  ];

  const onOrganizationChange = (newActiveOrg: Organization) => {
    // TODO: Fix onPageTransitionStart being called and uncomment
    // setActiveOrg(newActiveOrg);
    const href = navItems.find((item) => item.tab === activeTab)?.href;
    window.location.href = `${href}?org_id=${newActiveOrg.id}`;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderSidebarContent = () => (
    <>
      <Dropdown<Organization>
        options={organizations}
        selectedOption={activeOrg}
        setSelectedOption={onOrganizationChange}
        renderOption={(org) => <span>{org.name}</span>}
        placeholder="Select organization"
        label="Organization"
        className="w-full"
        bgColor="bg-tertiary-background"
      />
      <nav className="mt-8 gap-2">
        {navItems.map(({ tab, label, href }) => (
          <a
            key={tab}
            href={href}
            className={`block py-2 px-4 ${
              activeTab === tab ? 'bg-primary-accent text-white' : 'text-text-primary'
            } rounded`}
          >
            {label}
          </a>
        ))}
      </nav>
    </>
  );

  return (
    <div className="flex h-screen">
      {showSideBar && (
        <>
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-64 bg-secondary-background p-4">
            {renderSidebarContent()}
          </div>

          {/* Mobile Hamburger Icon */}
          {!isMobileMenuOpen && (
            <div className="md:hidden absolute top-4 left-4 z-20">
              <button onClick={toggleMobileMenu} className="text-text-primary">
                <FaBars size={24} />
              </button>
            </div>
          )}

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-90 z-10">
              <div className="w-[85%] h-full bg-secondary-background p-4 relative">
                <button
                  onClick={toggleMobileMenu}
                  className="absolute top-4 right-4 text-text-primary"
                >
                  <CrossIcon size={24} />
                </button>
                {renderSidebarContent()}
              </div>
            </div>
          )}
        </>
      )}
      <div className={className}>{children}</div>
    </div>
  );
}