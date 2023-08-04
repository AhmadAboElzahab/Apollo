import PageHeader from "../../Components/PageHeader";
import { Boundary } from "../../Components/boundary";

export default function Category() {
  return (
    <>
      <PageHeader title="Category" />
      <div className=" my-5 w-full flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0 gap-4 ">
        <div className=" order-2  lg:w-2/3  lg:order-1">
          <div className="bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20">
            <div className=" h-screen rounded-lg bg-black p-3.5 lg:p-6">
              <Boundary labels={["parallel-routes/page.tsx"]} size="small">
                <div className="prose prose-sm prose-invert max-w-none">
                  <h2 className="text-lg font-bold">Parallel Routes</h2>
                </div>
              </Boundary>
            </div>
          </div>
        </div>

        <div className="order-1  lg:w-1/3  lg:order-2">
          <div className="bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20">
            <div className="rounded-lg bg-black p-3.5 lg:p-6">
              <Boundary labels={["parallel-routes/page.tsx"]} size="small">
                <div className="prose prose-sm prose-invert max-w-none">
                  <h2 className="text-lg font-bold">Parallel Routes</h2>
                </div>
              </Boundary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
