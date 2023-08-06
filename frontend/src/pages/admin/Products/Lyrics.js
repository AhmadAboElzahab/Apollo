import { useDocumentTitle } from '../../../Hooks/useDocumentTitle';

export default function Lyrics() {
  const [documentTitle, setDoucmentTitle] = useDocumentTitle('History');
  return <div>Lyrics</div>;
}
