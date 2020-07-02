/*
包含n个工具函数的模块
 */
export function getRedirectTo(type, header) {
    let path = '';

    if (type === 'boss') {
        path = '/boss';
    } else {
        path = '/seeker';
    }

    if (!header) {
        path += 'info';
    }

    return path;
}