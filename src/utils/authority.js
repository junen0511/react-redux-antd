const authorityKey = 'authority';

export function getAuthority() {
    return localStorage.getItem(authorityKey);
}

export function setAuthority(authority) {
    localStorage.setItem(authorityKey, authority);
}
