const TrailsConst = {
    sortList: [
        {
            option: '熱門程度',
            iconClassName: 'fa-sort-amount-down'
        },
        {
            option: '時間長短',
            iconClassName: 'fa-sort-amount-up'
        },
        {
            option: '困難程度',
            iconClassName: 'fa-sort-amount-up'
        },
        {
            option: '喜愛排名',
            iconClassName: 'fa-sort-amount-down'
        }
    ],

    filterList: [
        {
            title: '所在區域',
            questionIcon: false,
            tag: 'area',
            optionList: [
                {
                    name: '全部'
                },
                {
                    name: '北部'
                },
                {
                    name: '中部'
                },
                {
                    name: '南部'
                },
                {
                    name: '東部'
                },
                {
                    name: '外島'
                }
            ]
        },
        {
            title: '步道難度',
            questionIcon: true,
            tag: 'difficulty',
            optionList: [
                {
                    name: '全部'
                },
                {
                    name: '輕鬆'
                },
                {
                    name: '有點挑戰'
                },
                {
                    name: '很有挑戰'
                }
            ]
        },
        {
            title: '所需時間',
            questionIcon: false,
            tag: 'time',
            optionList: [
                {
                    name: '全部',
                    minValue: 0,
                    maxValue: 10000,
                },
                {
                    name: '1 小時以下',
                    minValue: 0,
                    maxValue: 60,
                },
                {
                    name: '1 - 3 小時',
                    minValue: 60,
                    maxValue: 180,
                },
                {
                    name: '3 - 5 小時',
                    minValue: 180,
                    maxValue: 300,
                },
                {
                    name: '5 小時以上',
                    minValue: 300,
                    maxValue: 10000,
                }
            ]
        },
        {
            title: '步道全長',
            questionIcon: false,
            tag: 'length',
            optionList: [
                {
                    name: '全部',
                    minValue: 0,
                    maxValue: 10000,
                },
                {
                    name: '2 公里以下',
                    minValue: 0,
                    maxValue: 2,
                },
                {
                    name: '2 - 4 公里',
                    minValue: 2,
                    maxValue: 4,
                },
                {
                    name: '4 - 8 公里',
                    minValue: 4,
                    maxValue: 8,
                },
                {
                    name: '8 公里以上',
                    minValue: 8,
                    maxValue: 10000,
                }
            ]
        }
    ]
}

export default TrailsConst