/**
 * @license
 * Copyright 2022 ICILS
 * SPDX-License-Identifier: Apache-2.0
 */

import Blockly from "blockly/core";

export default Blockly.Theme.defineTheme("theme", {
  base: Blockly.Themes.Classic,
  name: "Theme",
  componentStyles: {
    workspaceBackgroundColour: "#FEFBFF",
    toolboxBackgroundColour: "#DCE1FF",
    toolboxForegroundColour: "#071748",
    flyoutBackgroundColour: "#E1E1F2",
    flyoutForegroundColour: "#191B26",
    flyoutOpacity: 0.8,
    scrollbarColour: "rgba(198, 197, 208, 0.7)",
    insertionMarkerColour: "#2B3042",
    insertionMarkerOpacity: 0.3,
    markerColour: "#906C88",
    cursorColour: "#EFEFFF",
    selectedGlowColour: "#A36C00",
    selectedGlowOpacity: 0.6,
    replacementGlowColour: "#FFB94F",
    replacementGlowOpacity: 0.8,
  },

  fontStyle: {
    family: "'Inter', 'Open Sans', Roboto, sans-serif",
    weight: "normal",
    size: 13,
  },
});
