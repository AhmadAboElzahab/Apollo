import { useDocumentTitle } from '../../../Hooks/useDocumentTitle';
export default function Account() {
  const [documentTitle, setDoucmentTitle] = useDocumentTitle('Account');

  return <div>Account</div>;
}
