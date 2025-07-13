import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 bg-white">
            <header className="flex items-center justify-between px-6 py-4 w-full max-w-6xl mx-auto">
                {/* Title */}
                <h1 className="text-xl font-bold text-gray-900">Fake is Bad</h1>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    <nav className="flex items-center gap-4">
                        <a href="#insights" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                            Insights
                        </a>
                        <a href="#tools" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                            Tools
                        </a>
                        <a href="#about" className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                            About AI
                        </a>
                    </nav>

                    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300">
                        <img
                            src="https://i.pravatar.cc/32"
                            alt="User Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Mobile Nav Toggle */}
                <div className="flex md:hidden items-center gap-4">
                    <button
                        onClick={() => setIsOpen(true)}
                        className="text-gray-800 hover:text-gray-900"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300">
                        <img
                            src="https://i.pravatar.cc/32"
                            alt="User Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </header>

            {/* Mobile Slide-In */}
            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 md:hidden" onClose={setIsOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-30" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex z-50">
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex flex-col w-64 max-w-xs bg-white shadow-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-gray-700 hover:text-gray-900"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <nav className="flex flex-col gap-4">
                                    <a
                                        href="#insights"
                                        className="text-gray-700 hover:text-gray-900 text-base font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Insights
                                    </a>
                                    <a
                                        href="#tools"
                                        className="text-gray-700 hover:text-gray-900 text-base font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Tools
                                    </a>
                                    <a
                                        href="#about"
                                        className="text-gray-700 hover:text-gray-900 text-base font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        About AI
                                    </a>
                                </nav>
                            </Dialog.Panel>
                        </Transition.Child>
                        <div className="flex-shrink-0 w-full" onClick={() => setIsOpen(false)} />
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    );
}
