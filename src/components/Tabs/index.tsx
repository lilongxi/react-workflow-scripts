import * as React from 'react'

interface IState {
    activeIndex: string | number
}

interface IProps extends IState {
    onTabChange: (index: string | number) => void,
    children: React.ReactNode
}

export class Tabs extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props)
        this.state = {
            activeIndex: props.activeIndex
        }
    }

    public tabChange = (event: React.MouseEvent<HTMLAnchorElement> , index: number | string): void => {
        event.preventDefault()
        this.setState({
            activeIndex: index
        })
        this.props.onTabChange(index)
    }

    public render(): JSX.Element {
        const { children } = this.props
        const { activeIndex } = this.state
        return (
            <ul>
                { React.Children.map(children, (child: React.ReactNode, index: number): JSX.Element => {
                    const activeClassName: string = (activeIndex === index) ? 'nav-link active' : 'nav-link'
                    return (
                        <li>
                            <a
                                className={activeClassName}
                                onClick={(event: React.MouseEvent<HTMLAnchorElement>): void => {this.tabChange(event, index)}}
                                role="button"
                            >
                                {child}
                            </a>
                        </li>
                    )
                })}
            </ul>
        )
    }

}

export const Tab: React.SFC = ({children}) => <>{children}</>
