import React from 'react';
import { render } from '@testing-library/react';
import { TrailsConst } from '../../../../constants';
import TrailSort from './TrailsSort.jsx'

describe('Test <TrailSort />', () => {
    const changeSort = (inputValue) => {
        return inputValue
    }

    test('test sorts quantity', () => {
        const inputValue = 0
        const sortCheckedValue = changeSort(inputValue)
        const { container } = render(<TrailSort changeSort={changeSort} sortCheckedValue={sortCheckedValue} />)
        expect(container.querySelectorAll('label').length).toBe(TrailsConst.sortList.length)
    })

    test('test initial active sort', () => {
        let inputValue = 0
        let sortCheckedValue = changeSort(inputValue)
        const { container } = render(<TrailSort changeSort={changeSort} sortCheckedValue={sortCheckedValue} />)
        expect(container.querySelector('.sort-item.active').textContent).toBe(TrailsConst.sortList[0].option)
    })

    test('test last active sort', () => {
        let inputValue = TrailsConst.sortList.length - 1
        let sortCheckedValue = changeSort(inputValue)
        const { container } = render(<TrailSort changeSort={changeSort} sortCheckedValue={sortCheckedValue} />)
        expect(container.querySelector('.sort-item.active').textContent).toBe(TrailsConst.sortList[TrailsConst.sortList.length - 1].option)
    })
})
