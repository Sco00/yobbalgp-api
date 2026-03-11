import { HttpStatusCode } from "../../../shared/errors/StatusCode.js";
export class ResponseFormatter {
    static success(res, data, message, status = HttpStatusCode.OK) {
        return res.status(status).json({
            success: true,
            message,
            data
        });
    }
}
//# sourceMappingURL=ReponseFormatter.js.map