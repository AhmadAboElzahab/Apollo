import {
    Outlet,
    NavLink,
    ScrollRestoration,
    useNavigate,
} from "react-router-dom";
import { Boundary } from '../Components/boundary';
import AdminNavbar from "../Components/AdminNavbar";
export default function AdminLayout() {
    return (
        <div className="bg-gray-1100 h-screen overflow-y-scroll bg_grid pb-36">
            <AdminNavbar />
            <div className="lg:pl-72">
                <div className="mx-auto max-w-4xl space-y-8 px-2 pt-20 lg:px-8 lg:py-8">
                    <div className="bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20">
                        <div className="rounded-lg bg-black p-6">
                            <h1 className="text-white text-3xl">hello</h1>
                        </div>
                    </div>



                    <div className="bg-vc-border-gradient rounded-lg p-px shadow-lg shadow-black/20">
                        <div className="rounded-lg bg-black p-3.5 lg:p-6">


                            <Boundary labels={['parallel-routes/page.tsx']} size="small">
                                <div className="prose prose-sm prose-invert max-w-none">
                                    <h2 className="text-lg font-bold">Parallel Routes</h2>
                                    <ul>
                                        <li>
                                            Parallel Routes allow you to simultenously or conditionally render
                                            multiple pages, with independent navigation, in the same layout.
                                        </li>
                                        <li>
                                            Parallel Routes can be used for advanced routing patterns like{' '}
                                            <a href="https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#conditional-routes">
                                                Conditional Routes
                                            </a>{' '}
                                            and{' '}
                                            <a href="https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes">
                                                Intercepted Routes
                                            </a>
                                            .
                                        </li>
                                        <li>
                                            Try using the tabs in one parallel route to navigate. Notice the URL
                                            changes but the unaffected parallel route is preserved.
                                        </li>
                                        <li>
                                            Try using the browser&apos;s backwards and forwards navigation.
                                            Notice the browser&apos;s URL history state and active UI state is
                                            correctly synced.
                                        </li>
                                        <li>
                                            Try navigating to a tab in one parallel route and refreshing the
                                            browser. Notice you can choose what UI to show parallel routes that
                                            don&apos;t match the initial URL.
                                        </li>
                                    </ul>

                                </div>
                            </Boundary>

                            <Outlet /></div>
                    </div>

                </div>
            </div>

        </div>

    )
}
