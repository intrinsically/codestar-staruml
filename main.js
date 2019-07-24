/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, app, window */

function _handleOpenLinkedVSCode() {
  var selectedModels = app.selections.getSelectedModels();

  if (selectedModels.length == 0) {
    app.toast.warning("No items selected.");
    return;
  } else if (selectedModels.length > 1) {
    app.toast.warning("Select only one item.");
    return;
  }
  var element = app.selections.getSelected();
  _openLinkedVSCode(element);
}

function _openLinkedVScode(element) {
  // read the first line of the doc and parse into 2 parts
  var doc = element.documentation;
  console.log(doc);
}

/** Initialize Extension */
function init() {
  var CMD_OPEN_LINKED_VSCODE = "linked_vscode_navigator:open_linked_vscode";
  app.commands.register(CMD_OPEN_LINKED_VSCODE, _handleOpenLinkedVSCode);
}

exports.init = init;
