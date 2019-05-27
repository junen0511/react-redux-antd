export const getMenuData = () => {
    return [
        {
            key: 'account',
            name: '账户中心',
            icon: '',
            path: 'account',
            children: [
                {
                    key: 'user',
                    name: '用户配置',
                    path: 'user'
                }
            ]
        }
    ];
};
