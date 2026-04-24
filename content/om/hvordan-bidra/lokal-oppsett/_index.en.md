---
# id: auto-generated – copied values are overwritten automatically on push
id: "e26cb201-0841-46b2-8ac7-2ba3708edde6"
title: "Local Setup (for Developers)"
linkTitle: "Local setup"
weight: 30

---

This option gives you a full local working environment in which you can preview all changes in the browser as you write. Recommended for structural changes, larger amounts of new content, or technical development.

## What You Need

| Tool | Version | Purpose |
|------|---------|---------|
| [Git](https://git-scm.com/) | Latest stable | Version control |
| [Hugo Extended](https://gohugo.io/) | 0.155.3 or later | Site generator |
| [Go](https://go.dev/) | 1.21 or later | Required by Hugo Modules |
| Text editor | – | [VS Code](https://code.visualstudio.com/) recommended |

## Installation on Windows

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

## Installation on macOS

```bash
brew install git hugo go
```

## Installation on Linux (Ubuntu/Debian)

```bash
sudo apt install git golang
# Hugo Extended is obtained from GitHub Releases (the apt version is often too old):
wget https://github.com/gohugoio/hugo/releases/download/v0.155.3/hugo_extended_0.155.3_linux-amd64.deb
sudo dpkg -i hugo_extended_0.155.3_linux-amd64.deb
```

## Clone the Repository

```bash
git clone --recurse-submodules https://github.com/SAMT-X/samt-bu-docs.git
cd samt-bu-docs
hugo mod download
```

`--recurse-submodules` ensures that the theme (`hugo-theme-samt-bu`) is downloaded at the same time. `hugo mod download` fetches content modules from the other repositories.

## Start Local Preview

```bash
hugo server
```

Open [http://localhost:1313/samt-bu-docs/](http://localhost:1313/samt-bu-docs/) in the browser. The page updates automatically when you save a file.

## File Structure – Where the Content Lives

```
content/
  om/                      ← "About" section
  behov/                   ← Needs (use cases)
  pilotering/              ← Pilots
  arkitektur/              ← Architecture
  prosjektleveranser/      ← Solutions and framework
  innsikt/                 ← Shared insight
  administrasjon-og-styring/
  utkast/                  ← Drafts and inputs (content module)
```

Each chapter is a **folder** containing two files:

```
content/om/om-samt-bu/
  _index.nb.md    ← Norwegian content
  _index.en.md    ← English content
```

## Writing Content

Content files are standard Markdown files with a small header at the top (frontmatter):

```markdown
---
title: "Page title"
weight: 30
---

Your content begins here in standard Markdown.

## Heading

A paragraph with **bold text** and *italic text*.
```

- `title` – page title displayed in the menu and at the top of the page
- `weight` – sort order (lower number = higher in the menu)
- `draft: true` – add this to hide the page from publication until it is ready

## Saving and Publishing Changes

```bash
git add content/path/to/file/_index.en.md
git commit -m "Brief description of what you changed"
git push
```

GitHub Actions builds and publishes automatically after 1–2 minutes.

> **No write access to the repository?** Create a *pull request* instead:
> `git checkout -b my-contribution` → make changes → `git push origin my-contribution` → open a PR on GitHub.

## Useful Commands

| Command | Description |
|---------|-------------|
| `hugo server` | Start local server with live reload |
| `hugo server -D` | Include pages marked with `draft: true` |
| `hugo` | Build to the `public/` folder (check for errors) |
| `git pull` | Fetch the latest changes from GitHub |
| `hugo mod get -u` | Update all content modules to the latest version |
