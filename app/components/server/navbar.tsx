import { Disclosure } from '@headlessui/react'
import LogoImage from '../client/logo-image'
import { ModeToggle } from '../client/theme/mode-toggle'

export default function Navbar() {
  return (
    <Disclosure as="nav" className="fixed top-0 left-0 w-full z-50">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div className="flex shrink-0 items-center">
                        <LogoImage className="h-11 w-auto"/>
                    </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <ModeToggle aria-hidden="true" className="size-8"/>
                </div>
            </div>
        </div>
    </Disclosure>
  )
}