'use client';
import { useSidebar } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';

export function CustomSidebarTrigger({ className }: { className?: string }) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      size='icon'
      variant='ghost'
      className={className ? className : ''}
      onClick={toggleSidebar}
    >
      <Icon name='shared/menu' />
    </Button>
  );
}
