const selection = require("./selection");
const message = require("./message");

function _handleOpenVSCodeLocation() {
  var element = selection.getSelectedElement(true);
  if (!element) {
    return;
  }
  _openVSCodeLocation(element);
}

function _openVSCodeLocation(element) {
  // read the first line of the doc and parse into 2 parts
  var doc = element.documentation;
  var first = doc.split("\n")[0];
  if (!first.startsWith("->")) {
    // look at the parent if we don't have an instruction
    if (element._parent) {
      _openVSCodeLocation(element._parent);
      return;
    }
    message.warning("No VSCode navigation instruction! Form is ->file:pattern");
    return;
  }
  var port = app.preferences.get("codestar.vscodePort");
  var parts = first.substring(2).split(":");
  var file = parts[0];
  var pattern = parts[1];
  if (!file) {
    message.warning("No file specified in navigation instruction");
    return;
  }
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:" + port + "/setLocation",
    data: JSON.stringify({
      file: file,
      pattern: pattern
    }),
    success: function(data) {
      message.info("Opened VSCode location");
    },
    error: function(err) {
      message.error(
        "Cannot communicate with Codestar VSCode extension: " + err.message
      );
      console.log(err);
    },

    dataType: "json"
  });
}

function _handleSaveVSCodeLocation() {
  var element = selection.getSelectedElement(true);
  _saveVSCodeLocation(element);
}

function _saveVSCodeLocation(element) {
  if (!element) {
    return;
  }
  var port = app.preferences.get("codestar.vscodePort");
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:" + port + "/getLocation",
    success: function(data) {
      element.documentation = "->" + data.file + ":" + data.pattern;
      message.info("Saved linked VSCode location");
    },
    error: function(err) {
      message.error(
        "Cannot communicate with Codestar VSCode extension: " + err.message
      );
      console.log(err);
    },
    dataType: "json"
  });
}

exports._handleSaveVSCodeLocation = _handleSaveVSCodeLocation;
exports._saveVSCodeLocation = _saveVSCodeLocation;
exports._handleOpenVSCodeLocation = _handleOpenVSCodeLocation;
exports._openVSCodeLocation = _openVSCodeLocation;
