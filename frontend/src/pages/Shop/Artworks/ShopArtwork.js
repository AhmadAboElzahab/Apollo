import { useParams } from 'react-router-dom';

export default function ShopArtwork() {
  const { category,product } = useParams();

  return <div>{category +" / "+ product}</div>;
}
