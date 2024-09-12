// outputs.ts
import { reactive, ref } from "vue";
import * as Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import { LightTheme, DarkTheme } from "@/theme";

export const WorkspaceStore = reactive({
  workspace: ref(),
  startBlocks: ref(),
});

export const OptionsStore = reactive({
  toolbox: ref(),
  theme: ref(),
  collapse: false,
  comments: false,
  disable: false,
  maxBlocks: Infinity,
  trashcan: true,
  horizontalLayout: false,
  toolboxPosition: "start",
  css: true,
  media: "https://blockly-demo.appspot.com/static/media/",
  rtl: false,
  scrollbars: true,
  sounds: false,
  oneBasedIndex: true,
  grid: {
    spacing: 20,
    length: 1,
    colour: "#888",
    snap: true,
  },
  zoom: {
    controls: true,
    wheel: false,
    startScale: 1,
    maxScale: 3,
    minScale: 0.3,
    scaleSpeed: 1.2,
  },
  renderer: "geras",
});

export const OutputsStore = reactive({
  code: "" as string,
  activeTab: ref("tab-1"),
  snackbar: false,
  snackbarMsg: "" as string,
  snackbarTimeout: 2500 as number,
  snackbarColor: "green" as string,
});

export function setWorkspaceTheme(theme: string) {
  let workspace = Blockly.getMainWorkspace();
  if (theme === "LightTheme") {
    OptionsStore.theme = ref(LightTheme);
    // @ts-ignore
    workspace.setTheme(LightTheme);
  } else if (theme === "DarkTheme") {
    OptionsStore.theme = ref(DarkTheme);
    // @ts-ignore
    workspace.setTheme(DarkTheme);
  }
}

export function saveJson() {
  let workspace = Blockly.getMainWorkspace();
  let state = Blockly.serialization.workspaces.save(workspace);
  let json = JSON.stringify(state);
  localStorage.setItem("NoneBlockly", json);
  OutputsStore.snackbarColor = "green";
  OutputsStore.snackbarMsg = "🤗 工作区已暂存";
  OutputsStore.snackbar = true;
  // console.log("工作区已暂存：");
  // console.log(json);
}

export function loadJson() {
  let workspace = Blockly.getMainWorkspace();
  let json = localStorage.getItem("NoneBlockly");
  if (json) {
    Blockly.serialization.workspaces.load(JSON.parse(json), workspace);
    OutputsStore.snackbarColor = "green";
    OutputsStore.snackbarMsg = "🥰 已恢复暂存工作区";
  } else {
    OutputsStore.snackbarColor = "warning";
    OutputsStore.snackbarMsg = "未找到暂存工作区，将导入默认工作区";
    initWorkspaceState();
  }
  OutputsStore.snackbar = true;
}

export function initWorkspaceState() {
  let startBlocks = WorkspaceStore.startBlocks;
  let workspace = Blockly.getMainWorkspace();
  Blockly.serialization.workspaces.load(startBlocks, workspace);
}

export function generateCode() {
  let workspace = Blockly.getMainWorkspace();
  OutputsStore.code = pythonGenerator.workspaceToCode(workspace);
  // outputsStore.activeTab = "tab-2";
  // console.log("已生成代码：");
  // console.log(outputsStore.code);
}

export function showCode() {
  let workspace = Blockly.getMainWorkspace();
  let code = pythonGenerator.workspaceToCode(workspace);
  alert(code);
}

export function copyCode() {
  let workspace = Blockly.getMainWorkspace();
  let code = pythonGenerator.workspaceToCode(workspace);
  navigator.clipboard
    .writeText(code)
    .then(() => {
      OutputsStore.snackbarColor = "green";
      OutputsStore.snackbarMsg = "😎 已复制 Python 代码";
    })
    .catch((err) => {
      OutputsStore.snackbarColor = "warning";
      OutputsStore.snackbarMsg = "🥺 复制代码出错" + err;
    });
  OutputsStore.snackbar = true;
}
