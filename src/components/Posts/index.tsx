import * as React from 'react'
import { withDefaultProps } from '@utils/index'

interface IProps {
    posts: PlainObject[],
    color?: string
}

const defaultProps = {
    color: 'leelongxi'
}

type DefaultProps = typeof defaultProps

const Posts: React.SFC<IProps> = ({ posts, color }: IProps & DefaultProps): JSX.Element => (
        <ul>
            {
                posts.map((post: PlainObject , i: number) => (
                    <li key={i}>
                        日期：{post.date}，
                        温度：{post.high}，
                        风级：{post.fengli}，
                        最低温低：{post.fengxiang}，
                        风向：{post.low}，
                        默认值：{color}
                    </li>
                ))
            }
        </ul>
)

export default withDefaultProps(defaultProps, Posts)
