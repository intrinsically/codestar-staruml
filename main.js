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

function _openLinkedVSCode(element) {
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
  console.log("File = " + file + ", pattern = " + pattern);
  console.log(
    $.ajax({
      type: "POST",
      url: "http://127.0.0.1:1781/api/goToDeclaration",
      beforeSend: function(xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Basic " + btoa("amcveigh:tiggle")
        );
      },
      data: ["IOperation"],
      success: function(data) {
        console.log(data);
      },
      dataType: "json"
    })
  );
}

/** Initialize Extension */
function init() {
  var CMD_OPEN_LINKED_VSCODE = "linked_vscode_navigator:open_linked_vscode";
  app.commands.register(CMD_OPEN_LINKED_VSCODE, _handleOpenLinkedVSCode);
}

exports.init = init;
