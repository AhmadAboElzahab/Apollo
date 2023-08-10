import { useDocumentTitle } from '../../../Hooks/useDocumentTitle';
export default function Telegram() {
  const [_documentTitle, _setDoucmentTitle] = useDocumentTitle('Telegram');

  return <div>Telegram</div>;
}
