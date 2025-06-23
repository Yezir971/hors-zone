import clsx from 'clsx'

const Burger = ({ open, setOpen }) => {
    return (
        <button
            onClick={() => setOpen(!open)}
            className="flex flex-col justify-between w-8 h-6 z-50 focus:outline-none"
        >
            <span
                className={clsx(
                    'block w-8 h-1 rounded-full bg-current transition-transform duration-300 origin-[1px]',
                    open ? 'rotate-[42deg]' : 'rotate-0'
                )}
            />
            <span
                className={clsx(
                    'block w-8 h-1 rounded-full bg-current transition-all duration-300 origin-[1px]',
                    open
                        ? 'opacity-0 translate-x-5'
                        : 'opacity-100 translate-x-0'
                )}
            />
            <span
                className={clsx(
                    'block w-8 h-1 rounded-full bg-current transition-transform duration-300 origin-[1px]',
                    open ? '-rotate-[42deg]' : 'rotate-0'
                )}
            />
        </button>
    )
}

export default Burger
