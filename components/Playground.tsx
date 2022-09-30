import React, { useEffect } from "react";
import { compiler_state, initEsbuild } from "../store/features/compilerSlice";
import { useAppDispatch, useAppSelector } from "../store/hook";

import EditorInput from "./EditorInput";
import ConsoleLog from "./ConsoleLog";
import Iframe from "./Iframe";
import { editor_state, PanelEnum } from "../store/features/editorSlice";
import dynamic from "next/dynamic";
import { TemplateTab } from "./TemplateTab";
import { SettingsTab } from "./SettingsTab";

const EditorPanel = dynamic(() => import("./EditorPanel"), {
  ssr: false,
});

export const Playground = () => {
  const dispatch = useAppDispatch();

  const { esbuildStatus, isCompiling, output } = useAppSelector(compiler_state);
  const { panel, logs, editorValue, isLogTabOpen } =
    useAppSelector(editor_state);

  useEffect(() => {
    if (!esbuildStatus.isReady) {
      dispatch(initEsbuild());
    }
  }, [dispatch, esbuildStatus]);

  const renderPanel = (panel: PanelEnum) => {
    switch (panel) {
      case PanelEnum.EDITOR_INPUT:
        return <EditorInput editorValue={editorValue} />;

      case PanelEnum.EDITOR_TEMPLATE:
        return <TemplateTab />;

      case PanelEnum.EDITOR_SETTINGS:
        return <SettingsTab />;
    }
  };

  return (
    <EditorPanel
      panelA={renderPanel(panel)}
      panelB={
        <Iframe
          tabs={editorValue.tabs}
          output={output}
          isCompiling={isCompiling}
          esbuildStatus={esbuildStatus}
        />
      }
      panelC={<ConsoleLog logs={logs} />}
      lastPanelVisibility={isLogTabOpen}
    />
  );
};