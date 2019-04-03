// import React, { Component, ComponentType } from 'react'
// import hoistNonReactStatics from 'hoist-non-react-statics'
// import Toggleable, {ToggleableComponentProps } from '@components/Toggleable'
// import { getHocComponentname } from '@utils/index'

// function withToggleable<OriginalProps extends ToggleableComponentProps>(
//     WrappedComponent: ComponentType<OriginalProps>) {

//     type Props = Omit<OriginalProps, keyof ToggleableComponentProps>

//     class WithToggleable extends Component<Props> {

//         static readonly displayName = getHocComponentname(WrappedComponent, 'WithToggleable')
//         static readonly WrappedComponent = WrappedComponent

//         render() {
//             return (
//                 <Toggleable render={renderProps => <WrappedComponent {...this.props} {...renderProps}/>}/>
//             )
//         }
//     }

//     return hoistNonReactStatics<any, any>(WithToggleable, WrappedComponent)
// }

// export default withToggleable
