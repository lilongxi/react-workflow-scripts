import * as React from 'react'
import { queryURL } from '@utils/tools'
import { message, notification, Modal } from 'antd'

export class ReactExt<P = {}, S = {}> extends React.Component<P, S> {
    readonly $queryURL = queryURL
    readonly $message = message
    readonly $notification = notification
    readonly $confirm = Modal.confirm
}
