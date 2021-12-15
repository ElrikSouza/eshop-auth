import { WrappedRouteHandler } from "../route-handler/route-handler";

export interface GenericAuthController {
    signIn: WrappedRouteHandler;
    signUp: WrappedRouteHandler;
}
