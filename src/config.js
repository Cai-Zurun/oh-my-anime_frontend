var baseUrl = 'http://localhost:8520'

export default {
    sessionId: sessionStorage.getItem('token'),

    //user api
    LogApi: baseUrl + '/user/sign-in',
    LogoutApi: baseUrl + '/user/sign-out',
    //anime api
    AnimeAddApi: baseUrl + '/anime/add',
    AnimeGetApi: baseUrl + '/anime/get',
    AnimeAllGetApi: baseUrl + '/anime/all/get',
    AnimeDeleteApi: baseUrl + '/anime/delete',
    AnimeUpdateApi: baseUrl + '/anime/update',
    //animeType api
    AnimeTypeAddApi: baseUrl + '/anime/type/add',
    AnimeTypeGetApi: baseUrl + '/anime/type/get',
    AnimeTypeDeleteApi: baseUrl + '/anime/type/delete',
    AnimeTypeUpdateApi: baseUrl + '/anime/type/update'
}
