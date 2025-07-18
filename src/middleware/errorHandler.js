export default function errorHandler(err, req, res, next) {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).render(`errors/${status}`, { error: err });
}
