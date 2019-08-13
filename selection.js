const message = require("./message");

function getSelectedElement(complain) {
  var selectedModels = app.selections.getSelectedModels();

  if (selectedModels.length == 0) {
    if (complain) {
      message.warning("No items selected.");
    }
    return null;
  } else if (selectedModels.length > 1) {
    if (complain) {
      message.warning("Select only one item.");
    }
    return null;
  }
  return app.selections.getSelected();
}

exports.getSelectedElement = getSelectedElement;
