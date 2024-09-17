import { Button, ButtonType } from '@frontend/components/common/Button';
import { Container } from '@frontend/components/common/Container';
import { Tab } from '@type/tabs';
import { useState } from 'react';
import { CreateOrgModal } from './modals/CreateOrgModal';

interface Props {}

export function SettingsScreen({}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container activeTab={Tab.Settings} showSideBar>
      <h1>Settings</h1>
      <Button type={ButtonType.Primary} onClick={() => setIsModalOpen(true)} className="mt-4 p-3">
        Create project
      </Button>
      <CreateOrgModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Container>
  );
}