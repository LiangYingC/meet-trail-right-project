import { APP, DB } from '../lib';

test('time should transfrom from minute to hour minute', () => {
    expect(APP.transfromTimefromMinToHourMin(90)).toBe('1 小時 30 分鐘')
    expect(APP.transfromTimefromMinToHourMin(60)).toBe('1 小時 ')
    expect(APP.transfromTimefromMinToHourMin(20)).toBe('20 分鐘')
})

test('trail data should transform from state to DB structure', () => {
    const inputValue = {
        title: 'test title',
        description: 'test description',
        coverImg: 'coverImg link',
        routeImg: 'routeImg link',
        area: '中部',
        city: '台中市',
        dist: '大甲區',
        start: 'start point',
        end: 'end point',
        type: '單向折返',
        minHeight: '5',
        maxHeight: '50',
        length: '5',
        hour: '1',
        minute: '30'
    }
    const sceneryData = ['山景', '海景', '夜景']
    const difficultyData = ['輕鬆']
    const userData = {
        id: 'FFSt7XVbjfPlPMhKYHGoqxyFY0B3',
        name: 'Liang C',
        email: 'user@gmail.com',
        picture: 'picture link',
    }
    expect(APP.tansformTrialDataFromStateToDB(inputValue, sceneryData, difficultyData, userData))
        .toEqual({
            id: null,
            title: 'test title',
            description: 'test description',
            location: {
                area: '中部',
                city: '台中市',
                dist: '大甲區'
            },
            images: {
                main_image: 'coverImg link',
                route_image: 'routeImg link'
            },
            routes: {
                start: 'start point',
                end: 'end point',
                type: '單向折返'
            },
            create_user_id: 'FFSt7XVbjfPlPMhKYHGoqxyFY0B3',
            create_time: APP.getDay(),
            height: {
                max: 50,
                min: 5
            },
            length: 5,
            time: 90,
            scenery: ['山景', '海景', '夜景'],
            difficulty: ['輕鬆'],
            timestamp: DB.time(),
            youtube_list: null,
            like_data: {
                users: [],
                count: 0
            },
            view_count: 0
        })
})


