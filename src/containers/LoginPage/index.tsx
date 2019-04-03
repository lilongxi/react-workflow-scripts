import * as React from 'react'
import { ReactExt, connect } from '@utils/index'
import { ActionCreators } from '@creators/authActionCreators'
import { Form, Icon, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { COOKIE_KEYS } from '@constants/keys'

import * as styles from './index.scss'

const FormItem = Form.Item

interface IProps {
    routerStore?: RouterState,
    authStore: IAuthStore.UserInfo,
    loginRequest?: <T extends IAuthStore.LoginParams>(data: T) => void
}

const mapStateToProps = (state: IStore<any>) => {
    const { router,  authStore } = state
    return {
        routerStore: router,
        authStore
    }
}

@connect(mapStateToProps, {
    loginRequest: ActionCreators.loginRequest
})
export class LoginPage extends ReactExt<IProps & FormComponentProps , {}> {

    constructor(props: IProps & FormComponentProps) {
        super(props)
        this.submit = this.submit.bind(this)
    }

    public submit(e: React.MouseEvent<Element>): void {
        e.preventDefault()
        this.props.form.validateFields(
            async (err, values: IAuthStore.LoginParams): Promise<any> => {
                if (!err) {
                    this.props.loginRequest({ ...values, key: COOKIE_KEYS.KEYS })
                }
            }
        )
    }

    render(): JSX.Element {
        const { getFieldDecorator } = this.props.form
        const { loading } = this.props.authStore
        return (
            <div className={styles.login}>
                <Form className={styles.form}>
                    <div className={styles.logoBox}>
                        <Icon type="ant-design" />
                    </div>
                    <FormItem hasFeedback>
                        {
                            getFieldDecorator('phone', {
                                rules: [{ required: true }]
                            })(
                                <Input
                                    placeholder="account"
                                    prefix={<Icon type="user" />}
                                />
                            )
                        }
                    </FormItem>
                     <FormItem hasFeedback>
                        {getFieldDecorator('passwd', {
                            rules: [{ required: true }]
                        })(
                            <Input
                                prefix={<Icon type="lock" />}
                                type="password"
                                placeholder="password"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        <div className={styles.tips}>
                            <span>username: 13594347817</span>
                        </div>
                        <div className={styles.tips}>
                            <span>password: 123456</span>
                        </div>
                        <Button
                            type="primary"
                            href="javascript:void(0)"
                            htmlType="submit"
                            loading={loading}
                            onClick={this.submit}
                            className={styles.btns}
                        >
                            login
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Form.create<{}>()(LoginPage)
