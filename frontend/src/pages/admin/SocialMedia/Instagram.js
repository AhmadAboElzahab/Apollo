import { useDocumentTitle } from '../../../Hooks/useDocumentTitle';
export default function Instagram() {
  const [_documentTitle, _setDoucmentTitle] = useDocumentTitle('Instagram');

  return <div>Instagram</div>;
}
