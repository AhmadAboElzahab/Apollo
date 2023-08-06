import { useDocumentTitle } from '../../../Hooks/useDocumentTitle';
import PageHeader from '../../../Components/PageHeader';
import LyricsComponent from '../../../Components/Lyrics/LyricsComponent';
import AddLyrics from '../../../Components/Lyrics/AddLyrics';

export default function Lyrics() {
  const [documentTitle, setDoucmentTitle] = useDocumentTitle('Lyrics');
  return (
    <>
      <div className='mb-[5vh]'>
        <PageHeader title='Lyrics' />
      </div>
      <div className=' my-5   '>
        <LyricsComponent />
      </div>
    </>
  );
}
