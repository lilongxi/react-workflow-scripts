import * as React from 'react'

interface IProps {
    posts: PlainObject[]
}

export default class Posts extends React.PureComponent<IProps, any> {
    public render(): JSX.Element {
        return (
            <>
                <ul>
                    {
                        this.props.posts.map((post: PlainObject , i: number) => (
                            <li key={i}>日期：{post.date}，温度：{post.high}，风级：{post.fengli}，最低温低：{post.fengxiang}，风向：{post.low}</li>
                        ))
                    }
                </ul>
            </>
        )
    }
}
