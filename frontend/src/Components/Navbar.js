

export default function Navbar() {
    return (
        <nav className="flex justify-between px-20 py-10 items-center">
            <h1 className="text-5xl text-gray-100 font-bold">Apollo</h1>
            <div className="flex items-center">
                <ul className="flex text-3xl items-center space-x-6">
                    <li className="font-semibold text-gray-700">Home</li>
                    <li className="font-semibold text-gray-700">Articles</li>
                </ul>
            </div>
        </nav>
    )
}
