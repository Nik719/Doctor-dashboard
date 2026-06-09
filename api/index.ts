// Minimal test — no imports, just ping back
module.exports = function (req: any, res: any) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ status: "ok", path: req.url }));
};
