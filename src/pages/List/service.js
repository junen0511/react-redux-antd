import request from 'utils/request';

export async function fetchDashboardData(data) {
    const response = await request({
        url: '/',
        method: 'post',
        data,
    });

    return response.data;
}
