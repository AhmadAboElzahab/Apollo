import { useState } from 'react'
import { Link } from 'react-router-dom';
import { MenuAlt2Icon, XIcon } from '@heroicons/react/solid';
import clsx from 'clsx';


export default function AdminNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const close = () => setIsOpen(false);
    return (
        <div className="fixed top-0 z-10 flex w-full flex-col border-b border-gray-800 bg-black lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-r lg:border-gray-800">
            <div className="flex h-14 items-center px-4 py-4 lg:h-auto">
                <Link
                    href="/"
                    className="group flex w-full items-center gap-x-2.5"
                    onClick={close}
                >


                    <div className="relative z-30 ">
                        <div class="glitch z-10 text-xl" data-text="Apollo">Apollo</div>
                    </div>
                </Link>
            </div>
            <button
                type="button"
                className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="font-medium text-gray-100 group-hover:text-gray-400">
                    Menu
                </div>
                {isOpen ? (
                    <XIcon className="block w-6 text-gray-400" />
                ) : (
                    <MenuAlt2Icon className="block w-6 text-gray-400" />
                )}
            </button>





            <div
                className={clsx('overflow-y-auto lg:static lg:block', {
                    'fixed inset-x-0 bottom-0 top-14 mt-px bg-black': isOpen,
                    hidden: !isOpen,
                })}
            >
                <nav className="space-y-6 px-2 py-5">

                    <div >
                        <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400/80">
                            <div>Hello</div>
                        </div>
                        <Link
                            onClick={close}
                            to=""
                            className={clsx(
                                'block rounded-md px-3 py-2 text-sm font-medium hover:text-gray-300',
                                {
                                    'text-gray-400 hover:bg-gray-800': !isActive,
                                    'text-white': isActive,
                                },
                            )}
                        >
                            hi
                        </Link>


                    </div>

                </nav>
            </div>
        </div>
    )
}
