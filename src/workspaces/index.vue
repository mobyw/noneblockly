<script setup lang="ts">
import { onMounted } from "vue";
import { useTheme } from "vuetify";
// Components
import Blockly from "blockly";
import BlocklyComponent from "@/components/BlocklyComponent.vue";
import ContentCard from "@/components/ContentCard.vue";
// Stores
import {
  optionsStore,
  workspaceStore,
  outputsStore,
} from "@/stores/workspaces";
import * as functions from "@/stores/workspaces";
// Workspace data
import toolbox from "@/data/toolbox.json";
import startBlocks from "@/data/default.json";
// Blockly config
import "@/blocks/blocks.js";
import * as ZhHans from "blockly/msg/zh-hans";

Blockly.setLocale(ZhHans);

// Set store data
optionsStore.toolbox = toolbox;
workspaceStore.startBlocks = startBlocks;
const workspace = Blockly.getMainWorkspace();
workspaceStore.workspace = workspace;

const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark
    ? "LightTheme"
    : "DarkTheme";
  // hljs theme
  let htmlElement = document.querySelector("html");
  if (htmlElement) {
    htmlElement.setAttribute(
      "hljs-theme-dark",
      theme.global.current.value.dark ? "true" : "false",
    );
  }
}

onMounted(() => {
  functions.loadJSON();

  var workspace = Blockly.getMainWorkspace();
  workspace.addChangeListener(functions.generateCode);
});
</script>

<template>
  <v-app>
    <BlocklyComponent id="blockly-div" :options="optionsStore" ref="workspace">
    </BlocklyComponent>
    <v-card id="content" flat class="mx-auto rounded-0">
      <!-- Start content card -->
      <v-container class="pa-0 ma-0">
        <ContentCard id="cotent-card">
          <!-- Start Tab 1 Content -->
          <template v-slot:tab-1>
            <v-card-text class="text-h6 pb-0">Title</v-card-text>
            <v-card-text>
              <p class="text-body-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </v-card-text>
            <!-- <v-card-text class="text-h6 pb-0">Example</v-card-text>
            <v-card-text class="content-code">
              <highlightjs
                class="overflow-auto"
                :code="example_code"
                language="python"
                word-wrap
              />
            </v-card-text> -->
          </template>
          <!-- End Tab 1 Content -->

          <!-- Start Tab 2 Content -->
          <template v-slot:tab-2>
            <v-card-text class="content-code">
              <highlightjs
                class="overflow-auto"
                :code="outputsStore.code"
                language="python"
                word-wrap
              />
            </v-card-text>
          </template>
          <!-- End Tab 2 Content -->
          <template v-slot:bottom> </template>
        </ContentCard>
        <!-- End content card -->
      </v-container>
      <v-card-actions>
        <v-toolbar
          id="cotent-card-toolbar"
          density="default"
          color="primary-container"
        >
          <v-spacer />
          <v-spacer />

          <v-snackbar
            location-strategy="static"
            v-model="outputsStore.snackbar"
            :timeout="outputsStore.snackbarTimeout"
            :color="outputsStore.snackbarColor"
            elevation="24"
          >
            <template v-slot:actions>
              <v-icon :icon="mdiContentSave"></v-icon>
            </template>
            {{ outputsStore.snackbarMsg }}
          </v-snackbar>

          <v-btn color="tertiary" @click="functions.saveJSON">
            <v-icon :icon="mdiContentSave"></v-icon>
            暂存
            <!-- SAVE -->
            <v-tooltip activator="parent" location="bottom">
              暂存工作区
            </v-tooltip>
          </v-btn>

          <v-btn color="tertiary" @click="functions.loadJSON">
            <v-icon :icon="mdiFileRestore"></v-icon>
            恢复
            <!-- RESTORE -->
            <v-tooltip activator="parent" location="bottom">
              恢复保存的工作区
            </v-tooltip>
          </v-btn>

          <v-btn color="tertiary" @click="functions.initWorkspaceState">
            <v-icon :icon="mdiRestart"></v-icon>
            <!-- RESET -->
            重置
            <v-tooltip activator="parent" location="bottom">
              重置为默认工作区
            </v-tooltip>
          </v-btn>

          <v-btn color="tertiary" @click="">
            <v-icon :icon="mdiFileDownload"></v-icon>
            下载
            <!-- RESTORE -->
            <v-tooltip activator="parent" location="bottom">
              下载工作区源代码
            </v-tooltip>
          </v-btn>

          <v-btn color="tertiary" @click="">
            <v-icon :icon="mdiFileUpload"></v-icon>
            导入
            <!-- RESTORE -->
            <v-tooltip activator="parent" location="bottom">
              导入工作区源代码
            </v-tooltip>
          </v-btn>

          <v-btn color="tertiary" @click="functions.copyCode">
            <v-icon :icon="mdiLanguagePython"></v-icon>
            复制代码
            <!-- RESTORE -->
            <v-tooltip activator="parent" location="bottom">
              复制导出的 Python 代码
            </v-tooltip>
          </v-btn>

          <v-spacer />

          <v-btn color="primary" class="text-none" stacked>
            <v-icon :icon="mdiThemeLightDark" @click="toggleTheme()"></v-icon>
          </v-btn>
        </v-toolbar>
      </v-card-actions>
    </v-card>
  </v-app>
</template>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Open+Sans");
@import url("https://fonts.googleapis.com/css?family=Inter");

html {
  overflow-y: auto;
}

body {
  margin: 0;
}

#root {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: --background;
  margin: 0;
}

#blockly-div {
  position: absolute;
  left: 0;
  top: 0;
  width: 55%;
  height: 100%;
}

#content {
  position: absolute;
  right: 0;
  top: 0;
  width: 45%;
  height: 100%;
}

#cotent-card-toolbar {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
}

.content-code {
  padding-left: 1em;
  font-family: ui-monospace !important;
}
</style>
<script lang="ts">
import hljs from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import {
  mdiContentSave,
  mdiFileRestore,
  mdiFileDownload,
  mdiFileUpload,
  mdiRestart,
  mdiThemeLightDark,
  mdiLanguagePython,
} from "@mdi/js";

hljs.registerLanguage("python", python);

// const example_code = `\
// from nonebot.rule import to_me
// from nonebot.plugin import on_command

// weather = on_command("天气", rule=to_me())

// @weather.handle()
// async def handle_function():
//     pass  # do something here\
// `;

export default {
  components: {
    highlightjs: hljsVuePlugin.component,
  },
};
</script>
