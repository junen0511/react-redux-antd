import React from 'react';
import Exception from 'components/Exception';
import CheckPermissions from './CheckPermissions';

const Exception403 = () => <Exception type="403" style={{ minHeight: 500, height: '80%' }} />;

const checkIsInstantiation = target => {
    if (!React.isValidElement(target)) {
        return target;
    }
    return () => target;
};

/**
 * @param  { string | array | function | Promise } authority
 * @param  { ReactNode } error
 */
const authorize = (authority, error) => {
    let classError = false;
    if (error) {
        classError = () => error;
    }

    if (!authority) {
        throw new Error('authority is required');
    }

    return function decideAuthority(target) {
        const component = CheckPermissions(authority, target, classError || Exception403);
        return checkIsInstantiation(component);
    };
};

export default authorize;
