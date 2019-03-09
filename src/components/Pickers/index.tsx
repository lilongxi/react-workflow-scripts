import * as React from 'react'

interface IProps {
    value: PlainObject,
    onChange: (value: string) => void,
    options: string[]
}

export default class Pickers extends React.PureComponent<IProps, {}> {
    public render() : JSX.Element {
        const { value: { city, wendu, ganmao }, onChange, options } = this.props
        return (
            <>
                <h1>{city}未来五天天气</h1>
                <select value={city} onChange={ (e: React.ChangeEvent<HTMLSelectElement>): void => { onChange(e.target.value) }}>
                    {
                        options.map((option: string) => (
                            <option value={option} key={option} >{ option }</option>
                        ))
                    }
                </select>
                <span>{' '}今日温度：{wendu}, 提醒：{ganmao}</span>
            </>
        )
    }
}
