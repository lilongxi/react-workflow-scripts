import * as React from 'react'
import { Layout } from 'antd'
import { Switch, Route } from 'react-router-dom'
import * as styles from './index.scss'
import Sider from '@containers/HomePage/SiderPage'
import { menu } from '@mock/menu'
import { asynchronousComponents } from './menu'
import NotFound from '@components/404'
import Header from '@containers/HomePage/HeaderPage'
import Footer from '@containers/HomePage/FooterPage'

export default function App(): JSX.Element {
     return(
            <>
              <Layout className={styles.layout}>
                  <Sider />
                  <Layout className={styles.content}>
                      <Header />
                      <Layout.Content>
                            <Switch>
                                {
                                    menu.map(r => {
                                        return !r.path ? null : (
                                            <Route
                                                key={r.id}
                                                exact={r.exact}
                                                path={r.path}
                                                component={r.component ? asynchronousComponents[r.component] : null}
                                            />
                                        )
                                    })
                                }
                                <Route component={NotFound} />
                            </Switch>
                      </Layout.Content>
                      <Footer />
                  </Layout>
              </Layout>
            </>
        )
}
