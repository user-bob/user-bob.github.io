import React, {Fragment, useRef} from "react"
import {Popover, Transition} from "@headlessui/react"
import classNames from "@/utils/class-names";

interface PopoverProps {
    popoverCN: string,
    popoverBtnCN: string,
    popoverPanelCN: string,

    button: React.ReactNode | string,
    content: React.ReactNode
}

export const PopoverMenu = ({popoverCN, popoverPanelCN, popoverBtnCN, button, content}: PopoverProps) => {
    const buttonRef = useRef(null)
    const timeoutDuration = 5
    let timeout: NodeJS.Timeout

    const closePopover = () => {
        // @ts-ignore
        return buttonRef.current?.dispatchEvent(
            new KeyboardEvent("keydown", {
                key: "Escape",
                bubbles: true,
                cancelable: true
            })
        )
    }

    const onMouseEnter = (open: boolean) => {
        clearTimeout(timeout)
        if (open) return
        // @ts-ignore
        return buttonRef.current?.click()
    }

    const onMouseLeave = (open: boolean) => {
        if (!open) return
        timeout = setTimeout(() => closePopover(), timeoutDuration)
    }

    return (
        <Popover className={classNames("", popoverCN)}>
            {({open}) => (
                <div onMouseLeave={onMouseLeave.bind(null, open)}>
                    <div className="relative flex">
                        <Popover.Button
                            ref={buttonRef}
                            className={classNames(
                                open
                                    ? 'border-indigo-600 text-indigo-600 border-b-2'
                                    : 'border-transparent text-gray-700 dark:text-gray-300 dark:hover:text-gray-200 hover:text-gray-800',
                                'relative z-10 flex items-center transition-colors ease-out duration-200 text-sm font-medium -mb-px pt-px',
                                popoverBtnCN
                            )}
                            onMouseEnter={onMouseEnter.bind(null, open)}
                            onMouseLeave={onMouseLeave.bind(null, open)}
                        >
                            {button}
                        </Popover.Button>
                    </div>
                    <Popover.Overlay className="fixed inset-0 bg-black opacity-5" />
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel
                            className={classNames(popoverPanelCN, "absolute left-1/4 z-10 mt-1 -translate-x-1/3 transform")}
                            onMouseEnter={onMouseEnter.bind(null, open)}
                            onMouseLeave={onMouseLeave.bind(null, open)}
                        >
                            {content}
                        </Popover.Panel>
                    </Transition>
                </div>
            )
            }
        </Popover>
    )
}