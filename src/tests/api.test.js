import axios from "axios";
import { weatherConfig, youtubeConfig } from '../config';

test("weather API", () => {
    const weatherUrl = `${weatherConfig.baseUrl}/F-D0047-075?Authorization=${weatherConfig.apiKey}&locationName=大甲區&elementName=MaxAT,MinAT,PoP12h,WeatherDescription`
    return axios.get(weatherUrl)
        .then((response) => {
            const data = response.data
            const weatherElementList = data.records.locations[0].location[0].weatherElement
            expect(weatherElementList).toBeDefined()
        })
})

test("youtube search API", () => {
    const searchVedioUrl = `${youtubeConfig.baseUrl}/search?part=snippet&type=video
                            &order=${ youtubeConfig.order}&q=合歡山主峰步道&key=${youtubeConfig.apiKey}`
    return axios.get(searchVedioUrl)
        .then((response) => {
            const data = response.data
            expect(data.items[0].snippet).toBeDefined()
            expect(data.items.length).toBeGreaterThan(3)
            expect(typeof data.items[0].id.videoId).toBe('string')
            expect(typeof data.items[0].snippet.channelId).toBe('string')
            expect(typeof data.items[0].snippet.title).toBe('string')
            expect(typeof data.items[0].snippet.description).toBe('string')
        })
})

test("youtube channels API", () => {
    const channelUrl = `${youtubeConfig.baseUrl}/channels?part=snippet
                            &id=UC_XRq7JriAORvDe1lI1RAsA&key=${youtubeConfig.apiKey}`
    return axios.get(channelUrl)
        .then((response) => {
            const data = response.data
            expect(data.items[0].snippet).toBeDefined()
            expect(typeof data.items[0].snippet.title).toBe('string')
            expect(typeof data.items[0].snippet.thumbnails.default.url).toBe('string')
        })
})

