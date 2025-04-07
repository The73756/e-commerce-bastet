'use client';
import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';

export function CustomSidebarTrigger() {
  const { toggleSidebar } = useSidebar();

  return (
    <Button size='icon-lg' onClick={toggleSidebar}>
      <Icon name='shared/menu' />
    </Button>
  );
}
