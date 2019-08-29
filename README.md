# Codestar

=================

This extension lets the user navigate to a file and pattern in VSCode. It is designed for me to be able to draw up a diagram, and then tag various elements with VSCode locations and jump to them quickly. In essence, this is a map of your code.

## Prerequisites

Please make sure you also install the VSCode Codestar extension, and start it with the "Codestart: Start" command. The extension lives [here](https://marketplace.visualstudio.com/items?itemName=amcveighvscodeextensions.codestar) but you should install it using the extension tab of VSCode.

This extension starts up a small server inside VSCode on a port, supporting the StarUML extension.

## Usage

Ensure the Codestar VSCode extension is running. If it isn't, the linked diagram navigation will work, but not the VSCode functions.

## Preferences

You can define the start and end port in the preferences. By default the extension will talk to ports 8081 through to 8091, so you can control up to 10 VSCode windows if desired. Note that you will need to start up the VSCode Codestar extension with "CodeStar: start" and pick a different port per window.

## Store VSCode position

Select a line or snippet of code in VSCode, then navigate to StarUML + select an item, right click and choose "Codestar: Save Position".

You can also press cmd-P, or use cmd + middle mouse button.

(Finally, if you wish to manually set the location, add ->file:pattern to the first line of the doc of an element. E.g. ->src/test.ts:private findFiles)

## Goto previously stored VSCode position

To navigate to the VSCode location, right click on an element with a previously saved location and choose "Codestar: Goto" or cmd-G.

You can also click the middle mouse button on the element.

## Navigate to a linked diagram

If you click the middle mouse button on the empty diagram space, it will navigate to the parent diagram.

If you click the middle mouse button on a package, it will navigate to the linked diagram of that package.

Alternatively, select the "Open linked diagram" menu option, or press cmd-L. This also works on classes and other non-package items.

Notes
- Code for navigating to the linked diagram initially taken from [LinkedDiagramNavigator](https://github.com/zillemarco/StarUML_LinkedDiagramNavigator) by Zillemarco
- Code for detecting middle mouse button and finding active element under the mouse was from a support post by the creator of StarUML

---

Licensed under GPL v3 (see LICENSE file).
