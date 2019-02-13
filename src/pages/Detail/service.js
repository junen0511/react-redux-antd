import request from '@src/utils/request';

export async function fetchPostInfo(params) {
    const response = await request({
        url: '/post/info',
        method: 'get',
        params
    });

    return response.data;
}
