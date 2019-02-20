import Authorized from './Authorized';
import AuthorizedRoute from './AuthorizedRoute';
import check from './CheckPermissions';
import Secured from './Secured';
import renderAuthorize from './renderAuthorize';

Authorized.Secured = Secured;
Authorized.AuthorizedRoute = AuthorizedRoute;
Authorized.check = check;

export default renderAuthorize(Authorized);
