/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, app, window */

function _handleOpenLinkedVSCode() {
  var element = getSelectedElement();
  if (!element) {
    return;
  }
  // read the first line of the doc and parse into 2 parts
  var doc = element.documentation;
  console.log(doc);
  var first = doc.split("\n")[0];
  if (!first.startsWith("->")) {
    app.toast.warning(
      "No VSCode navigation instruction! Form is ->file:pattern"
    );
    return;
  }
  var parts = first.substring(2).split(":");
  var file = parts[0];
  var pattern = parts[1];
  if (!file) {
    app.toast.warning("No file specified in navigation instruction");
    return;
  }
  $.ajax({
    type: "POST",
    url: "http://127.0.0.1:8081/setLocation",
    data: JSON.stringify({
      file: file,
      pattern: pattern
    }),
    success: function(data) {
      console.log(data);
    },
    dataType: "json"
  });
}

function _handleGetLinkedVSCode() {
  var element = getSelectedElement();
  if (!element) {
    return;
  }
  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8081/getLocation",
    success: function(data) {
      element.documentation = "->" + data.file + ":" + data.pattern;
    },
    dataType: "json"
  });
}

function getSelectedElement() {
  var selectedModels = app.selections.getSelectedModels();

  if (selectedModels.length == 0) {
    app.toast.warning("No items selected.");
    return null;
  } else if (selectedModels.length > 1) {
    app.toast.warning("Select only one item.");
    return null;
  }
  return app.selections.getSelected();
}

/** Initialize Extension */
function init() {
  var CMD_OPEN_LINKED_VSCODE = "linked_vscode_navigator:open_linked_vscode";
  app.commands.register(CMD_OPEN_LINKED_VSCODE, _handleOpenLinkedVSCode);
  var CMD_GET_LINKED_VSCODE = "linked_vscode_navigator:get_linked_vscode";
  app.commands.register(CMD_GET_LINKED_VSCODE, _handleGetLinkedVSCode);
}

exports.init = init;
