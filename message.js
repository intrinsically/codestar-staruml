function info(msg) {
  app.toast.info(msg);
}

function warning(msg) {
  app.toast.warning(msg);
}

function error(msg) {
  app.toast.error(msg);
}

exports.info = info;
exports.warning = warning;
exports.error = error;
