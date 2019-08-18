/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, app, window */

const vscode = require("./vscode");
const linked = require("./linkeddiagram");
const message = require("./message");

/** Initialize Extension */
function init() {
  var CMD_OPEN_CODESTAR = "codestar:open_linked_vscode";
  app.commands.register(CMD_OPEN_CODESTAR, vscode._handleOpenVSCodeLocation);
  var CMD_GET_CODESTAR = "codestar:get_linked_vscode";
  app.commands.register(CMD_GET_CODESTAR, vscode._handleSaveVSCodeLocation);
  var CMD_OPEN_CODESTAR = "codestar:open_linked_diagram";
  app.commands.register(CMD_OPEN_CODESTAR, linked._handleOpenLinkedDiagram);

  // make toasts disappear after 1 second
  app.toast.toast.options.autoHideAfter = 1000;

  $("#diagram-canvas").mousedown(function(e) {
    switch (e.which) {
      case 2:
        var diagram = app.diagrams.getCurrentDiagram();
        var editor = app.diagrams.getEditor();
        var zoom = editor.canvas.zoomFactor;
        var scale = zoom.numer / zoom.denom;

        var view = diagram.getViewAt(
          editor.canvas,
          e.offsetX / scale,
          e.offsetY / scale
        );
        if (view && view.model) {
          var model = view.model;
          if (e.metaKey || e.ctrlKey) {
            vscode._saveVSCodeLocation(model);
          } else {
            // if this is a package then goto parent
            if (model instanceof type.UMLPackage) {
              linked._openLinkedDiagram(model);
            } else {
              // otherwise open the linked diagram
              vscode._openVSCodeLocation(view.model);
            }
          }
        } else {
          // treat as "goto parent diagrams"
          linked._openLinkedDiagram(null);
        }
        return true; // to allow the browser to know that we handled it.
    }
    return false;
  });
  message.info("Installed Codestar extension");
}

exports.init = init;
