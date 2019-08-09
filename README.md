# Codemap
=================

This extension lets the user navigate to a file and pattern in VSCode. It is designed for me to be able to draw up a diagram, and then tag various elements with VSCode locations and jump to them quickly. In essence, this is a codemap.

## Usage

Add ->file:pattern to the first line of the doc of an element. E.g. ->src/test.ts:private findFiles

Then to navigate to the element, right click on it and choose "Select in VSCode" or cmd-O

An alternative way to set the ->file:pattern is to select a line in VSCode, then in StarUML right click on an element and choose "Store VSCode location" or cmd-G

NOTE: you also need the VSCode codemap extension.

---

Licensed under the Apache 2.0 license (see LICENSE file).
