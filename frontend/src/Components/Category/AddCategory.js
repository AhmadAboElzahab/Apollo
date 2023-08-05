import { Boundary } from "../boundary";

export default function AddCategory() {
  return (
    <div className="bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20">
      <div className="rounded-lg bg-black p-3.5 lg:p-6">
        <Boundary labels={["Add Category"]} size="small">
          <div className="prose prose-sm prose-invert max-w-none">
            <label class="text-sm text-gray-100" for="username">
              Username
            </label>

            <input
              class="bg-gray-1100  appearance-none border-2 border-zinc-900 rounded w-full py-1 px-1 text-gray-700 leading-tight focus:outline-none focus:bg-zinc-800 focus:border-zinc-800    "
              type="txt"
              placeholder="******************"
            />
            <label class="text-sm text-gray-100" for="username">
              Username
            </label>

            <input
              class="bg-zinc-900  appearance-none border-2 border-zinc-900 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-zinc-800 focus:border-zinc-800    "
              type="txt"
              placeholder="******************"
            />
          </div>
        </Boundary>
      </div>
    </div>
  );
}
