import * as React from 'react'
import { ReactExt } from '@utils/index'
import { Row } from 'antd'
import { Menu } from './ToggleableMenu/index'

export default class LineSmooth extends ReactExt<{}, {}> {
    render(): JSX.Element {
        return (
            <Row>
                <Menu />
            </Row>
        )
    }
}
