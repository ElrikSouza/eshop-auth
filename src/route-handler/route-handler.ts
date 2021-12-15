import { NextFunction, Request, Response } from "express";

export interface WrappedRouteHandler {
    (req: Request, res: Response, next: NextFunction): Promise<Response | undefined>;
}

export interface RouteHandler {
    (req: Request, res: Response): Promise<Response>;
}
