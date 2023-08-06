import { useDocumentTitle } from '../../../Hooks/useDocumentTitle';

export default function Prediction() {
  const [documentTitle, setDoucmentTitle] = useDocumentTitle('Prediction');

  return <div>Prediction</div>;
}
