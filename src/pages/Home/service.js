import request from '@src/utils/request';

export async function fetchPostList(data) {
    const response = await request({
        url: '/post/list',
        method: 'post',
        data
    });

    return response.data;
}

export async function fetchPostInfo(params) {
    const response = await request({
        url: '/post/info',
        method: 'get',
        params
    });

    return response.data;
}
