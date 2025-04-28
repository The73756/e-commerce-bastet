import { ProfileInfo } from '@/components/profile-info';
import { ProfileTabs } from '@/components/profile-tabs';

export default function Page() {
  return (
    <div className='flex flex-col gap-10'>
      <ProfileInfo />
      <ProfileTabs />
    </div>
  );
}
