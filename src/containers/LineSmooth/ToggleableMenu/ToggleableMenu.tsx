import * as React from 'react'
import Toggleable from '@components/Toggleable'

interface IProps {
    title: string
    show: boolean
}

interface IMenuProps extends IProps {
    toggle: (event: React.MouseEvent<HTMLElement>) => void
}

const MenuItem: React.SFC<IMenuProps> = ({ title, toggle, show, children }) => (
    <>
        <div onClick={toggle}>
            <h1>{title}</h1>
        </div>
        { show ? children : null }
    </>
)

const ToggleableMenu: React.SFC<IProps> = ({title, children, show: showContent }) => (
    <Toggleable
        show={showContent}
        render={({ show, toggle }) => (
            <MenuItem title={title} toggle={toggle} show={show}>
                {children}
            </MenuItem>
        )}
    />
)

const ToggleableWithTitle = Toggleable.ofType()
const ToggleableMenuViaComponentInjection:React.SFC<IProps> = ({
    title,
    children,
    show: showContent
}) => (
    <ToggleableWithTitle component={MenuItem} show={showContent} props={{title}}>
        {children}
    </ToggleableWithTitle>
)

export {
    ToggleableMenu,
    ToggleableMenuViaComponentInjection
}
