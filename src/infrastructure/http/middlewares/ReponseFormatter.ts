import { Response } from "express";
import { HttpStatusCode } from "../../../shared/errors/StatusCode.js";

export class ResponseFormatter
{
    static success(res: Response, data: any, message: string, status: number = HttpStatusCode.OK){
        return res.status(status).json({
            success: true,
            message,
            data
        })
    }
}