import { useDocumentTitle } from '../../../Hooks/useDocumentTitle';

export default function History() {
  const [documentTitle, setDoucmentTitle] = useDocumentTitle('History');

  return <div>History</div>;
}
