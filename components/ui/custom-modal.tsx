import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ReactNode } from 'react';

interface Props {
  trigger: string | ReactNode;
  title: string;
  content: ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export const CustomModal = ({
  trigger,
  title,
  content,
  open,
  setOpen,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={typeof trigger !== 'string'}>
        {trigger}
      </DialogTrigger>
      <DialogContent className='flex flex-col gap-5 bg-white p-4'>
        <DialogHeader>
          <DialogTitle className='text-lg font-semibold text-blue md:text-xl'>
            {title}
          </DialogTitle>
          <DialogDescription hidden></DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
};
