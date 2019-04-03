import * as React from 'react'
import { ToggleableMenu, ToggleableMenuViaComponentInjection } from './ToggleableMenu'

const initialState = {
    showContents: false
}

type State = Readonly<typeof initialState>

export class Menu extends React.PureComponent<{}, State> {

    readonly state
    readonly toggleShowContents: () => void

    constructor(props) {
        super(props)
        this.state = initialState
        this.toggleShowContents = () =>
        this.setState(prevState => ({ showContents: !prevState.showContents }))
    }

    render(): JSX.Element {
        const { showContents } = this.state
        return (
            <>
                <button onClick={this.toggleShowContents}>Toggle show content</button>
                <hr />
                <ToggleableMenu title="First Menu" show={showContents}>
                <p>Some content</p>
                </ToggleableMenu>
                <ToggleableMenuViaComponentInjection
                    title="Second Menu"
                    show={showContents}
                >
                <p>Another content</p>
                </ToggleableMenuViaComponentInjection>
            </>
        )
    }
}
