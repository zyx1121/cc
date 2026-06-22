# Course Outline

A hands-on Claude Code course for **complete beginners**. One project — **Claude Scope**, an Electron desktop app — is grown from scratch across the chapters. Each chapter ends on a *pain point* that forces the next one.

**Tech:** Electron (Node is installed back in Ch0). **Teaching style** (learned from PAPAYA 電腦教室): pain-driven, one project grown chapter by chapter, each chapter uses one concrete "moment" to teach one mechanism.

**Arc:** install & run CC (Ch0) → understand how it talks / touches files / remembers (Ch1) → build your first desktop app from zero (Ch2) → freeze that experience into a Skill (Ch3) → use the Skill to iterate faster (Ch4).

---

## 0 · onboarding ✅
- **Pain:** brand-new machine, nothing installed.
- **Mechanisms / tools:** install Claude Code, log in, install Git / Node / uv / gh, connect GitHub.
- **Outcome:** a working Claude Code environment.
- **Hook:** Node is installed here → Ch2's Electron starts instantly.

## 1 · meet-claude — talk, act, remember
- **Pain:** it's installed, but how does it actually help me? Does it remember me?
- **Mechanisms:** launch `claude` in a folder, basic conversation → let it read/write a file (permission prompts, `@` references) → **CLAUDE.md** (your standing note to it) → **auto-memory** (it remembers you on its own; you can also tell it to "remember this").
- **🔑 Teaching moment:** ask it to do something and watch it "forget" an earlier setting → teaches "memory doesn't carry across conversations" + "CLAUDE.md vs auto-memory"; then `/memory` → open `~/.claude/.../memory/` and *see the memories are just raw `.md` files*.
- **Pain → Ch2:** these memories can only be opened one file at a time in a text editor — no overview, hard to manage → let's build a UI for it.
- **Follow along:** chat about yourself, tell it to remember something, then find that memory file. **Challenge:** write one CLAUDE.md rule and verify it takes effect.

## 2 · build-the-scope — build "Claude Scope" from zero
- **Pain:** you can't see memory as a whole → build a desktop app to view it.
- **Mechanisms:** **Plan Mode** (plan before building — the habit every beginner needs) → `npx create-electron-app` → read `~/.claude/.../memory/*.md` with Node → build the UI (list memories, view content) → **the debug loop** (run → error → paste the error to CC → fix; this is normal Vibe Coding) → Git commit.
- **🔑 Teaching moment:** the moment `npm start` pops up *your own* window (peak achievement); the first red error → teach "don't panic, copy it to CC".
- **Outcome:** 🎯 a running Electron app that shows your CC memory. **The course's core milestone.**
- **Follow along:** the minimal "list + view" version. **Challenge:** add edit / delete / create, or polish the UI.

## 3 · make-it-a-skill — freeze the experience into a Skill
- **Pain:** explaining that whole setup (open Electron, read `~/.claude`) all over again next time is tedious.
- **Mechanisms:** **what a Skill is** (vs CLAUDE.md: loaded on demand, saves context) → use skill-creator to package the "build this kind of tool" SOP into a `SKILL.md` → test that it auto-triggers.
- **🔑 Teaching moment:** in a new conversation, one sentence makes CC apply the Skill and skip a long explanation → feel the value of "frozen experience".
- **Outcome:** your own Skill.
- **Follow along:** create + trigger a Skill. **Challenge:** tune its description so it fires at the right time.

## 4 · iterate — use the Skill to grow Claude Scope
- **Pain:** the scope only manages memory, but Skills are valuable CC assets too — manage those in the UI as well.
- **Mechanisms:** `/init` to let CC learn the existing project → add features to existing code (skill list / enable-disable) → the Skill genuinely speeds this up → feel the "freeze → accelerate" virtuous loop. (Optional: package / share the app.)
- **🔑 Teaching moment:** the same add-a-feature task runs noticeably smoother this time thanks to the Skill + the existing project → bookends the whole course.
- **Outcome:** 🎯 Claude Scope v2, managing memory + skills together.
- **Follow along:** add the skill list. **Challenge:** add enable / disable, or invent a feature.

---

**Claude Code features covered:** conversation, permissions, `@`, CLAUDE.md, auto-memory, `/memory`, Plan Mode, the debug loop, Git, Skill, skill-creator, `/init`, iterating an existing project.

**Deliberately out of scope** (candidates for future `5.+` chapters): Hooks, MCP, Subagents, cloud deployment — this app is a local-file tool, so forcing those in would feel unnatural.
