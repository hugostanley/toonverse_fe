import { InvitationForm } from '@pages';

function Invitation() {
  return (
    <main className='w-full h-full bg-ivory flex flex-col gap-3 p-4'>
      <h1>Accept Invite</h1>
      <InvitationForm btnColor='pink' />
    </main>
  )
}

export default Invitation
