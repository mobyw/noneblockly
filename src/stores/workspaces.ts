// outputs.ts
import { reactive, ref } from "vue";
import Blockly from "blockly";
import { pythonGenerator } from "blockly/python";
import theme from "@/theme/index";

export const workspaceStore = reactive({
  workspace: ref(),
  startBlocks: ref(),
});

export const optionsStore = reactive({
  toolbox: ref(),
  theme: ref(theme),
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

export const outputsStore = reactive({
  code: "" as string,
  activeTab: ref("tab-1"),
  snackbar: false,
  snackbarMsg: "" as string,
  snackbarTimeout: 2500 as number,
  snackbarColor: "green" as string,
});

export function saveJSON() {
  let workspace = Blockly.getMainWorkspace();
  let state = Blockly.serialization.workspaces.save(workspace);
  let json = JSON.stringify(state);
  localStorage.setItem("NoneBlockly", json);
  outputsStore.snackbarColor = "green";
  outputsStore.snackbarMsg = "🤗 工作区已暂存";
  outputsStore.snackbar = true;
  // console.log("工作区已暂存：");
  // console.log(json);
}

export function loadJSON() {
  let workspace = Blockly.getMainWorkspace();
  let json = localStorage.getItem("NoneBlockly");
  if (json) {
    Blockly.serialization.workspaces.load(JSON.parse(json), workspace);
    outputsStore.snackbarColor = "green";
    outputsStore.snackbarMsg = "🥰 已恢复暂存工作区";
  } else {
    outputsStore.snackbarColor = "warning";
    outputsStore.snackbarMsg = "未找到暂存工作区，将导入默认工作区";
    initWorkspaceState();
  }
  outputsStore.snackbar = true;
}

export function initWorkspaceState() {
  let startBlocks = workspaceStore.startBlocks;
  let workspace = Blockly.getMainWorkspace();
  Blockly.serialization.workspaces.load(startBlocks, workspace);
}

export function generateCode() {
  let workspace = Blockly.getMainWorkspace();
  outputsStore.code = pythonGenerator.workspaceToCode(workspace);
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
      outputsStore.snackbarColor = "green";
      outputsStore.snackbarMsg = "😎 已复制 Python 代码";
    })
    .catch((err) => {
      outputsStore.snackbarColor = "warning";
      outputsStore.snackbarMsg = "🥺 复制代码出错" + err;
    });
  outputsStore.snackbar = true;
}
