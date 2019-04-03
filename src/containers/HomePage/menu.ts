import { loadComponent } from '@utils/index'

const Dashboard = loadComponent(() => import(/* webpackChunkName: "dashboard" */ '@containers/Dashboard'))

export const asynchronousComponents = {
    Dashboard: Dashboard,
    ChartAreaStack: loadComponent(() => import(/* webpackChunkName: "newsPage" */ '@containers/ReduxPage')),
    ChartLineSmooth: loadComponent(() => import(/* webpackChunkName: "LineSmmoth" */ '@containers/LineSmooth')),
    ChartPie: Dashboard,
    Users: Dashboard
}

export type AsynchronousComponentKeys = keyof typeof asynchronousComponents

export interface IMenu {
    title: string,
    id: number,
    pid?: number,
    path?: string,
    icon?: string,
    component?: any,
    exact?: boolean
}

export interface IMenuInTree extends IMenu {
    children?: IMenuInTree[]
}
