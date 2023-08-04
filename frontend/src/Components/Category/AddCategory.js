import { Boundary } from "../boundary";

export default function AddCategory() {
  return (
    <div className="bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20">
      <div className="rounded-lg bg-black p-3.5 lg:p-6">
        <Boundary labels={["Add Category"]} size="small">
          <div className="prose prose-sm prose-invert max-w-none">
            <h2 className="text-lg font-bold">Parallel Routes</h2>
          </div>
        </Boundary>
      </div>
    </div>
  );
}
