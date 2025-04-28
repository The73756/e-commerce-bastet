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
}

export const CustomModal = ({ trigger, title, content }: Props) => {
  return (
    <Dialog>
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
