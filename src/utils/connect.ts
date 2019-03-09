import {connect as connected} from 'react-redux'
import {bindActionCreators, Dispatch} from 'redux'

function connect(mapStateToProps : any, action : any) : any {
    return(target : any, propertyKey?: string, descriptor?: PropertyDescriptor): any => {
        function mapDispatchToProps(dispatch : Dispatch) {
            return {
                ...bindActionCreators(action, dispatch)
            }
        }
        return connected(mapStateToProps, typeof action === 'function'
            ? action
            : mapDispatchToProps)(target)as any
    }
}

function connectToProps(mapStateToProps : any) {
    return (target : any, propertyKey?: string, descriptor?: PropertyDescriptor) : any => {
        return connected(mapStateToProps)(target)as any
    }
}

export {connect, connectToProps}
