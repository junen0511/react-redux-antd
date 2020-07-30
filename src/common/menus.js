import { isUrl } from 'utils/validate';
import { UserOutlined } from '@ant-design/icons';

const menuData = [
    {
        name: '工作台',
        path: 'dashboard',
        icon: UserOutlined,
    },
    {
        name: '列表页',
        path: 'list',
        icon: UserOutlined,
        children: [
            {
                name: '列表信息',
                path: 'info',
            },
        ],
    },
];

function formatter(data, parentPath = '/', parentAuthority) {
    return data.map((item) => {
        const result = {
            ...item,
            key: `${parentPath}${item.path}`,
            authority: item.authority || parentAuthority,
        };

        let { path } = item;
        if (path && !isUrl(path)) {
            path = parentPath + item.path;
            result.path = path;
        }

        if (item.children) {
            result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
        }
        return result;
    });
}

function formatFlatMenuData(menus) {
    let keys = {};
    menus.forEach((item) => {
        if (item.children) {
            keys[item.path] = { ...item };
            keys = { ...keys, ...formatFlatMenuData(item.children) };
        } else {
            keys[item.path] = { ...item };
        }
    });
    return keys;
}

export const getMenuData = () => formatter(menuData);
export const getFlatMenuData = () => formatFlatMenuData(getMenuData());
