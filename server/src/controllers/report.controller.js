import ReportModel from "../models/review.model.js";
import responseHandler from "../handlers/response.handler.js";

class ReportController {
  async addReport(req, res) {
    try {
      const { adsId } = req.params;

      if (req.user) {
        const report = new ReportModel({
          user: req.user.id,
          adsId,
          ...req.body,
        });

        await report.save();

        responseHandler.created(res, {
          ...report._doc,
          id: report.id,
          user: req.user,
        });
      }
    } catch {
      responseHandler.internalServerError(res);
    }
  }

  async removeReport(req, res) {
    try {
      const { reportId } = req.params;

      if (req.user) {
        const report = await ReportModel.findOne({
          _id: reportId,
          user: req.user.id,
        });

        if (!report) return responseHandler.notFound(res);

        await report.remove();

        responseHandler.ok(res);
      }
    } catch {
      responseHandler.internalServerError(res);
    }
  }

  async getReportsOfUser(req, res) {
    try {
      if (req.user) {
        const reportList = await ReportModel.find({
          user: req.user.id,
        }).sort("-createdAt");

        responseHandler.ok(res, reportList);
      }
    } catch {
      responseHandler.internalServerError(res);
    }
  }
}

export default ReportController;
