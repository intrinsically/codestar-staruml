/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, app, window */

const selection = require("./selection");
const message = require("./message");

function isDefault(element) {
  return element.defaultDiagram;
}

function _handleOpenLinkedDiagram() {
  var element = selection.getSelectedElement(false);
  _openLinkedDiagram(element, false);
}

function _openLinkedDiagram(element, parent) {
  if (!element) {
    var package = app.diagrams.diagramEditor.diagram._parent._parent;
    if (!package) {
      message.error("No parent diagram found");
      return;
    }
    _openLinkedDiagram(package, true);
    return;
  }

  var foundDiagrams = [];

  element.ownedElements.forEach(function(ele) {
    if (
      ele instanceof type.UMLDiagram ||
      ele instanceof type.ERDDiagram ||
      ele instanceof type.FCFlowchartDiagram ||
      ele instanceof type.DFDDiagram
    ) {
      foundDiagrams.push(ele);
    } else if (ele.ownedElements) {
      ele.ownedElements.forEach(function(innerEle) {
        if (
          innerEle instanceof type.UMLDiagram ||
          innerEle instanceof type.ERDDiagram ||
          innerEle instanceof type.FCFlowchartDiagram ||
          innerEle instanceof type.DFDDiagram
        ) {
          foundDiagrams.push(innerEle);
        }
      });
    }
  });

  if (foundDiagrams.length < 1) {
    message.warning("No linked diagram found");
  } else {
    var defaultDiagrams = foundDiagrams.filter(isDefault);

    var openDiagram = function(diagram) {
      if (diagram) {
        app.modelExplorer.select(diagram, true);
        app.diagrams.setCurrentDiagram(diagram, false);
        if (parent) {
          message.info("Opened parent diagram");
        } else {
          message.info("Opened linked diagram");
        }
      }
    };

    if (defaultDiagrams.length == 1) openDiagram(defaultDiagrams[0]);
    else if (foundDiagrams.length == 1) openDiagram(foundDiagrams[0]);
    else {
      var dlg = app.elementListPickerDialog
        .showDialog("Select a linked diagram to open", foundDiagrams)
        .then(function({ buttonId, returnValue }) {
          if (buttonId === "ok") openDiagram(returnValue);
        });
    }
  }
}

exports._handleOpenLinkedDiagram = _handleOpenLinkedDiagram;
exports._openLinkedDiagram = _openLinkedDiagram;
