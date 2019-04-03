import { cloneDeep } from 'lodash-es'
import * as React from 'react'

export function queryURL(name: string): string {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
    const result = window.location.search.substr(1).match(reg)
    if (result !== null) {
        return decodeURI(result[2])
    }
    return null
}

export function setCookie(name : string, value : string, expiredays = 365) {
    const exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = `${name}=${escape(value)};expires=${exdate.toUTCString()}`
}

export function getCookie(name: string) {
    if (document.cookie.length > 0) {
        let cStart = document.cookie.indexOf(name + '=')
        if (cStart !== -1) {
            cStart = cStart + name.length + 1
            let cEnd = document.cookie.indexOf(';', cStart)
            if (cEnd === -1) {
                cEnd = document.cookie.length
            }
            return unescape(document.cookie.substring(cStart, cEnd))
        }
    }
    return ''
}

export function clearCookie(name : string) {
    setCookie(name, '')
}

export function queryArray<T>(array: any[], key: string, keyAlias = 'key'): T {
    if (!(array instanceof Array)) {
        return null
    }
    const item = array.filter(a => a[keyAlias] === key)
    if (item.length) {
        return item[0]
    }
    return null
}

export function arrayToTree<T>(array: any[], id = 'id', pid = 'pid', children = 'children'): T[] {
    const data = cloneDeep(array)
    const result = []
    const hash = {}
    data.forEach((_, index) => {
        hash[data[index][id]] = data[index]
    })
    data.forEach(item => {
        const hashVP = hash[item[pid]]
        if (hashVP) {
            if (!hashVP[children]) {
                hashVP[children] = []
            }
            hashVP[children].push(item)
        } else {
            result.push(item)
        }
    })
    return result
}

export function getComponentName(component: React.ComponentType): string {
    return component.displayName || component.name || 'Component'
}

export function getHocComponentname(WrapperComponent: React.ComponentType, hocName: string = 'withHoc') {
    return `${hocName}(${getComponentName(WrapperComponent)})`
}

export function isEmptyChildren(children): boolean {
    return React.Children.count(children) === 0
}
