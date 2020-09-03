var baseUrl = 'http://localhost:8520'

export default {
    LogApi: baseUrl + '/user/sign-in',
    LogoutApi: baseUrl + '/user/sign-out',
    AddAnimeApi: baseUrl + '/anime/add',
    AddAnimeTypeApi: baseUrl + '/anime/type/add',
    GetAnimeTypeApi: baseUrl + '/anime/type/get',
    GetAnimeApi: baseUrl + '/anime/get'
}
