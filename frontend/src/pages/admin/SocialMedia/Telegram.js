import { useDocumentTitle } from '../../../Hooks/useDocumentTitle';
import PageHeader from '../../../Components/PageHeader';
import TelegramLogs from '../../../Components/SocialMedia/TelegramLogs';
export default function Telegram() {
  const [documentTitle, setDoucmentTitle] = useDocumentTitle('Telegram');
  return (
    <>
      <div className='mb-[5vh]'>
        <PageHeader title='Telegram' />
      </div>
      <div>
        <TelegramLogs />
      </div>
    </>
  );
}
