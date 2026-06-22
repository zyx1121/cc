# 第 3 章 — 把開發經驗封裝成 Skill

上一章你做出內視鏡了。但回想一下那個過程 —— 你得跟 Claude 解釋一大串:「用 Electron、檔案讀取放 main、用 preload 橋接、第一次 `npm start` 要等它下載 binary…」。下次再做類似的小工具,難道又要重講一遍?

有沒有辦法把這套「正確姿勢」存起來,讓 Claude 以後**自動就會**?有 —— 這就是 **Skill**。

---

## Skill 是什麼?跟 CLAUDE.md 差在哪?

你在 Ch1 認識過 `CLAUDE.md` —— 它**每次啟動都載入**,是常駐的備忘錄。但規則一多,它就會一直佔著空間、還可能讓 Claude 分心。

**Skill 不一樣:平常不載入,只有當 Claude 判斷「這次任務用得到」時才翻出來。** 等於是「需要時才拿出來的 SOP」。

所以那種「**不是每次都用、但特定任務很有用**」的流程,最適合做成 Skill。剛才做 Electron 小工具那套,正是這種。

---

## 叫 Claude 幫你把經驗封成 Skill

你不需要什麼特殊工具 —— 直接叫 Claude 把剛才的經驗整理成一個 Skill 就好:

> 把我們剛才做 Electron 桌面小工具的這套流程,整理成一個 Skill,放到我的個人 skills 資料夾,讓我以後做類似的小工具時你會自動參考。

Claude 會幫你建一個 `~/.claude/skills/<名字>/SKILL.md`(Windows 在 `%USERPROFILE%\.claude\skills\…`)。打開來看,它大概長這樣:

```markdown
---
name: electron-tool
description: Build a small Electron desktop app that reads or writes local files.
  Use when the user wants a 桌面小工具 / Electron app that views or edits files.
---

# Build a local-file Electron desktop tool

1. Plan first — which folder it reads, what the UI shows, what actions.
2. Scaffold: `npx --yes create-electron-app@latest <app-name>` (vanilla template).
3. File I/O in the main process (fs + os), exposed over IPC — never in the renderer.
4. Bridge with a preload script using contextBridge.
5. Build the UI; keep it simple and modern.
6. Path safety: keep reads/writes inside the intended folder.
7. Run & iterate: npm start → read errors → fix → rerun.
```

兩個重點:

- **最上面的 `description` 是觸發關鍵** —— Claude 就是靠它判斷「這次任務要不要用這個 skill」。所以它要寫清楚「**什麼時候該用**」,並包含你會說的字眼(Electron、桌面小工具、讀檔…)。
- **下面的 body 是 SOP** —— 真正被用到時,Claude 會照著它做。

> 完整的標準答案 skill 在 [`solution/electron-tool/`](./solution/electron-tool/)。

---

## 🔑 關鍵時刻:它真的「自動」會了

建好之後,開一個**全新的對話**(`/clear` 或重開),然後**完全不要**提任何細節,直接說:

> 我想用 Electron 做一個桌面小工具,顯示某個資料夾的檔案清單。

你會發現 Claude **自動**就照著正確姿勢回你 —— 主動提到 vanilla 模板、檔案讀取放 main、用 preload 橋接、第一次要下載 binary… 這些你這次**一個字都沒講**,它卻全知道。

因為它讀到你那個 skill 的 `description`,判斷這次用得上,就自動把 SOP 翻出來照做了。**這就是把經驗固化的價值:講一次,以後免講。**

---

## 怎麼確認 Skill 真的在運作

- 打 `/skills`:列出目前有哪些 skill、各自的觸發狀態。
- 想確認某次任務到底有沒有用到它:在 `/skills` 裡把它**暫時關掉**,同一句話再問一次,比較兩次回答的差別 —— 關掉後若答得明顯比較泛,就證明剛才是它在發功。

---

## 這章你做到了

- [ ] 搞懂 Skill 跟 CLAUDE.md 的差別(按需載入 vs 常駐)
- [ ] 叫 Claude 把 Ch2 的開發經驗封成一個 personal skill
- [ ] 開新對話、用一句話驗證它**自動觸發**

**進階挑戰**:
- 調 `description` 的寬窄 —— 太廣會亂觸發、太窄不觸發,試著抓到剛好。
- (進階) 裝官方外掛 `skill-creator@claude-plugins-official`,它能幫你**評估** skill 觸發準不準、跑 with/without 對照。

---

⬅️ 上一章:[`2.build-the-scope`](../2.build-the-scope/) ｜ ➡️ 下一章:`4.iterate`(用這個 skill,回頭把內視鏡加上 skill 管理功能)
