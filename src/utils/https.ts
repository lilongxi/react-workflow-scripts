// import axios, { AxiosRequestConfig as _AxiosRequestConfig } from 'axios'

function getJSON<T>(conf: {
    url: string,
    headers?: {
        [key: string]: string
    }
}): Promise<T> {
    const fetchConf = ({
        'method': 'GET',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...(conf.headers || {})
    })
    return fetch(conf.url, fetchConf)
            .then<T>(response => response.json())
}

export { getJSON }
