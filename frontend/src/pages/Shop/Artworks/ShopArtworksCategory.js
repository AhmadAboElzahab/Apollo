import { useParams } from 'react-router-dom';
export default function ShopArtworksCategory() {
  const { category } = useParams();

  return (
    <div>{category}</div>
  )
}