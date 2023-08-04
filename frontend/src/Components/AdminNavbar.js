import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MenuAlt2Icon, XIcon } from "@heroicons/react/solid";
import clsx from "clsx";

export default function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const close = () => setIsOpen(false);
  return (
    <div className="fixed top-0 z-10 flex w-full flex-col border-b border-gray-800 bg-black lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-r lg:border-gray-800">
      <div className="flex h-14 items-center px-4 py-4 lg:h-auto">
        <NavLink
          href="/"
          className="group flex w-full items-center gap-x-2.5"
          onClick={close}
        >
          <div className="relative z-30 ">
            <div class="glitch z-10 text-xl" data-text="Apollo">
              Apollo
            </div>
          </div>
        </NavLink>
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
        className={clsx("overflow-y-auto lg:static lg:block", {
          "fixed inset-x-0 bottom-0 top-14 mt-px bg-black": isOpen,
          hidden: !isOpen,
        })}
      >
        <nav className="space-y-6 px-2 py-5">
          <div>
            <div className="mb-2 px-3 text-xs font-semibold   tracking-wider text-gray-400/80">
              <div>General</div>
            </div>
            <NavLink onClick={close} to="" className="link_style">
              Home
            </NavLink>
            <NavLink onClick={close} to="Category" className="link_style">
              Category
            </NavLink>
            <br />
            <div className="mb-2 px-3 text-xs font-semibold   tracking-wider text-gray-400/80">
              <div>Products</div>
            </div>
            <NavLink onClick={close} to="Category" className="link_style">
              Beats
            </NavLink>
            <NavLink onClick={close} to="Category" className="link_style">
              Lyrics
            </NavLink>
            <NavLink onClick={close} to="Category" className="link_style">
              Artworks
            </NavLink>
            <br />
            <div className="mb-2 px-3 text-xs font-semibold   tracking-wider text-gray-400/80">
              <div>Accounting</div>
            </div>
            <NavLink onClick={close} to="Category" className="link_style">
              Prediction
            </NavLink>
            <NavLink onClick={close} to="Category" className="link_style">
              History
            </NavLink>
            <NavLink onClick={close} to="Category" className="link_style">
              Promo Codes
            </NavLink>
            <br />
            <div className="mb-2 px-3 text-xs font-semibold   tracking-wider text-gray-400/80">
              <div>Social Media</div>
            </div>
            <NavLink onClick={close} to="Category" className="link_style">
              Instagram
            </NavLink>

            <br />
            <div className="mb-2 px-3 text-xs font-semibold  tracking-wider text-gray-400/80">
              <div>Settings</div>
            </div>
            <NavLink onClick={close} to="Category" className="link_style">
              Account
            </NavLink>
            <NavLink onClick={close} to="Category" className="link_style">
              Log out
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
}
