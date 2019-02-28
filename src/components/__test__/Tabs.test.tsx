import * as React from 'react'
import { shallow } from 'enzyme'
import * as TabComponent from '@components/Tabs'

const props = {
    onTabChange: jest.fn(),
    activeIndex: 0,
}

let wrapper

describe('tabs 组件切换测试', () => {

    beforeEach(() => {
        wrapper = shallow(
            <TabComponent.Tabs {...props}>
                <TabComponent.Tab key="1">1</TabComponent.Tab>
                <TabComponent.Tab key="2">2</TabComponent.Tab>
            </TabComponent.Tabs>
        )
    })

    it('生成快照', () => {
        // expect(wrapper).toMatchSnapshot()
    })

    it('应该生成两个tab 并且 默认选择第一个', () => {
        expect(wrapper.find(TabComponent.Tab).length).toEqual(2)
        expect(wrapper.find('.nav-link').length).toEqual(2)
        expect(wrapper.state().activeIndex).toEqual(0)
        expect(wrapper.find('.nav-link').first().hasClass('active')).toBeTruthy()
    })

    it('tab 点击 测试', () => {
        wrapper.find('.nav-link').last().simulate('click', {preventDefault: () => {}})
        expect(wrapper.find('.nav-link').first().hasClass('active')).toEqual(false)
        expect(wrapper.find('.nav-link').last().hasClass('active')).toEqual(true)
        expect(wrapper.state().activeIndex).toEqual(1)
        expect(props.onTabChange).toHaveBeenCalled()
        expect(props.onTabChange).toHaveBeenCalledWith(1)
    })

})
