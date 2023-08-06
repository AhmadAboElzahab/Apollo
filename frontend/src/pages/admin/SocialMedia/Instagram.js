import { useDocumentTitle } from '../../../Hooks/useDocumentTitle';
export default function Instagram() {
  const [documentTitle, setDoucmentTitle] = useDocumentTitle('Instagram');

  return <div>Instagram</div>;
}
