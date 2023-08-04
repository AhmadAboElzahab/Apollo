export default function PageHeader(props) {
  return (
    <div className="bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20">
      <div className="rounded-lg bg-black p-6">
        <h1 className="text-white text-3xl">{props.title}</h1>
      </div>
    </div>
  );
}
