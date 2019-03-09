import * as React from 'react'
import { queryURL } from '@utils/tools'

export class ReactExt<P = {}, S = {}> extends React.Component<P, S> {
    readonly $queryURL = queryURL
}
