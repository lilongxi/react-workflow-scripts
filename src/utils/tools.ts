export function queryURL(name: string): string {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
    const result = window.location.search.substr(1).match(reg)
    if (result !== null) {
        return decodeURI(result[2])
    }
    return null
}
