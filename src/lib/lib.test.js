import { APP } from './index';

test('time should transfrom from minute to hour minute', () => {
    expect(APP.transfromTimefromMinToHourMin(90)).toBe('1 小時 30 分鐘')
    expect(APP.transfromTimefromMinToHourMin(60)).toBe('1 小時 ')
    expect(APP.transfromTimefromMinToHourMin(20)).toBe('20 分鐘')
})

test('trail data should transform from state to DB structure', () => {

})


