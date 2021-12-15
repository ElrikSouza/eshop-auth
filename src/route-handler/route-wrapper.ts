import { RouteHandler, WrappedRouteHandler } from "./route-handler";

export const wrapRoute = (routeHandler: RouteHandler): WrappedRouteHandler => {
    return async (req, res, next) => {
        try {
            const result = await routeHandler(req, res);
            return result;
        } catch (error) {
            next(error);
        }
    };
};
