import { useDocumentTitle } from '../../../Hooks/useDocumentTitle';

export default function Artwok() {
  const [documentTitle, setDoucmentTitle] = useDocumentTitle('Artwork');

  return <div>Artwok</div>;
}
