import PageHeader from "../../Components/PageHeader";
import { Boundary } from "../../Components/boundary";

export default function AdminHome() {
  return (
    <>
      <PageHeader title="Hello" />
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20 grd grid-cols-2">
          <div className="rounded-lg bg-black p-6">
            <Boundary labels={["parallel-routes/page.tsx"]} size="small">
              <div className="prose prose-sm prose-invert max-w-none">
                <h2 className="text-lg font-bold">Parallel Routes</h2>
                <ul>
                  <li>sex</li>
                  <li>
                    Parallel Routes can be used for advanced routing patterns
                    like{" "}
                    <a href="https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#conditional-routes">
                      Conditional Routes
                    </a>{" "}
                    and{" "}
                    <a href="https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes">
                      Intercepted Routes
                    </a>
                    .
                  </li>
                  <li>
                    Try using the tabs in one parallel route to navigate. Notice
                    the URL changes but the unaffected parallel route is
                    preserved.
                  </li>
                  <li>
                    Try using the browser&apos;s backwards and forwards
                    navigation. Notice the browser&apos;s URL history state and
                    active UI state is correctly synced.
                  </li>
                  <li>
                    Try navigating to a tab in one parallel route and refreshing
                    the browser. Notice you can choose what UI to show parallel
                    routes that don&apos;t match the initial URL.
                  </li>
                </ul>
              </div>
            </Boundary>
          </div>
        </div>
      </div>
    </>
  );
}
