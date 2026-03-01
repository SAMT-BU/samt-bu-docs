---
id: "1e0d2050-f885-496d-8ab4-8bdc287697e8"
title: "How to Contribute"
linkTitle: "How to Contribute"
weight: 3
---

> **Note:** This is a preliminary version of the guide and will be expanded and improved.

This website is open to contributions from all partners in the SAMT-BU project. Content is written in Markdown and published automatically via GitHub.

There are two ways to contribute, depending on your level of technical comfort:

---

## Option 1 – Simple Editing Directly in the Browser

This is the simplest option and requires no installation. It is suitable for individual changes and minor corrections.

**How to do it:**

1. Go to the page you wish to edit at [samt-bu.github.io/samt-bu-docs](https://samt-bu.github.io/samt-bu-docs/)
2. Click the **"Edit on GitHub"** link at the bottom of the page
3. You will be taken to GitHub's text editor. Make your changes in the Markdown field
4. Scroll down to **"Commit changes"**
5. Write a brief description of what you changed
6. Select **"Create a new branch and start a pull request"** (recommended), or commit directly to `main` if you have the necessary permissions
7. Click **"Propose changes"** – an editor will review and approve it

The page is published automatically within a minute of the change being approved.

> **Note:** You need a GitHub account. Create one for free at [github.com](https://github.com).

---

## Option 2 – Local Setup (for Regular Contributors)

This option gives you a full local working environment in which you can preview all changes in the browser as you write. Recommended for those who intend to contribute regularly.

### What You Need

| Tool | Version | Purpose |
|------|---------|---------|
| [Git](https://git-scm.com/) | Latest stable | Version control |
| [Hugo Extended](https://gohugo.io/) | 0.155.3 or later | Site generator |
| [Go](https://go.dev/) | 1.21 or later | Required by Hugo Modules |
| Text editor | – | [VS Code](https://code.visualstudio.com/) recommended |

---

### Installation on Windows

Open **Terminal** (or PowerShell) and run:

```powershell
winget install --id Git.Git
winget install --id Hugo.Hugo.Extended
winget install --id GoLang.Go
winget install --id Microsoft.VisualStudioCode
```

Restart the terminal afterwards so that the newly installed programmes are available in PATH.

**Verify the installation:**

```powershell
git --version
hugo version
go version
```

---

### Installation on macOS

```bash
brew install git hugo go
```

### Installation on Linux (Ubuntu/Debian)

```bash
sudo apt install git golang
# Hugo Extended is obtained from GitHub Releases (the apt version is often too old):
wget https://github.com/gohugoio/hugo/releases/download/v0.155.3/hugo_extended_0.155.3_linux-amd64.deb
sudo dpkg -i hugo_extended_0.155.3_linux-amd64.deb
```

---

### Clone the Repository

```bash
git clone --recurse-submodules https://github.com/SAMT-BU/samt-bu-docs.git
cd samt-bu-docs
```

`--recurse-submodules` ensures that the theme (`hugo-theme-samt-bu`) is downloaded at the same time.

**Initialise Hugo Modules** (fetches content modules from the other repositories):

```bash
hugo mod download
```

---

### Start Local Preview

```bash
hugo server
```

Open [http://localhost:1313/samt-bu-docs/](http://localhost:1313/samt-bu-docs/) in the browser. The page updates automatically when you save a file.

---

### File Structure – Where the Content Lives

```
content/
  om/                    ← "About" section
  behov/                 ← Subject area: Needs (use cases)
  pilotering/            ← Subject area: Pilots
  arkitektur/            ← Subject area: Architecture
  loesning/              ← Subject area: Solutions
  rammeverk/             ← Subject area: Framework
  informasjonsmodeller/  ← Subject area: Information Models
  innsikt/               ← Shared Insight
```

Each content chapter is a **folder** containing two files:

```
content/om/om-samt-bu/
  _index.nb.md    ← Norwegian content
  _index.en.md    ← English content
```

---

### Writing Content

Content files are standard Markdown files with a small header at the top (frontmatter):

```markdown
---
title: "Page title"
weight: 10
---

Your content begins here in standard Markdown.

## Heading

A paragraph with **bold text** and *italic text*.
```

- `title` – page title displayed in the menu and at the top of the page
- `weight` – sort order (lower number = higher in the menu)
- `draft: true` – add this to hide the page from publication until it is ready

---

### Saving and Publishing Changes

```bash
git add content/path/to/file/_index.en.md
git commit -m "Brief description of what you changed"
git push
```

GitHub Actions builds and publishes automatically. After 1–2 minutes, the change is live at [samt-bu.github.io/samt-bu-docs](https://samt-bu.github.io/samt-bu-docs/).

> **No write access to the repository?** Create a *pull request* instead:
> `git checkout -b my-contribution` → make changes → `git push origin my-contribution` → open a PR on GitHub.

---

### Useful Commands

| Command | Description |
|---------|-------------|
| `hugo server` | Start local server with live reload |
| `hugo server -D` | Include pages marked with `draft: true` |
| `hugo` | Build to the `public/` folder (check for errors) |
| `git pull` | Fetch the latest changes from GitHub |
| `hugo mod get -u` | Update all content modules to the latest version |
