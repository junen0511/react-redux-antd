import React from 'react'
import PromiseRender from './PromiseRender'
import { CURRENT } from './renderAuthorize'

function isPromise(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

/**
 * @param  { Permission judgment type string || array || Promise || Function } authority
 * @param  { Your permission description type string || array  } currentAuthority
 * @param  { Passing components } target
 * @param  { no pass components } Exception
 */
const checkPermissions = (authority, currentAuthority, target, Exception) => {
    // no permission
    if (!authority) {
        return target
    }

    // Array
    if (Array.isArray(authority)) {
        if (authority.includes(currentAuthority)) {
            return target
        }
        if (Array.isArray(currentAuthority)) {
            for (let i = 0; i < currentAuthority.length; i += 1) {
                const element = currentAuthority[i]
                if (authority.includes(element)) {
                    return target
                }
            }
        }
        return Exception
    }

    // String
    if (typeof authority === 'string') {
        if (authority === currentAuthority) {
            return target
        }
        if (Array.isArray(currentAuthority)) {
            for (let i = 0; i < currentAuthority.length; i += 1) {
                const element = currentAuthority[i]
                if (authority.includes(element)) {
                    return target
                }
            }
        }
        return Exception
    }

    // Promise
    if (isPromise(authority)) {
        return <PromiseRender ok={target} error={Exception} promise={authority} />
    }

    // Function
    if (typeof authority === 'function') {
        try {
            const bool = authority(currentAuthority)
            if (isPromise(bool)) {
                return <PromiseRender ok={target} error={Exception} promise={bool} />
            }
            if (bool) {
                return target
            }
            return Exception
        } catch (error) {
            throw new Error('unsupported parameters')
        }
    }
}

export { checkPermissions }

const check = (authority, target, Exception) => {
    return checkPermissions(authority, CURRENT, target, Exception)
}

export default check
