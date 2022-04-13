---
title: Full-featured Swift in Visual Studio Code
date: "2021-10-20"
tags: ["swift"]
colorOne: rgba(239, 82, 55, 1)
---

# Update
Swift server side work group now have an official plugin published as a VSCode extension. No need to build it yourself.

# DIY

I'm starting a server-side Swift project, so I wanted to see how Swift works without Xcode. 

This guide is written for Mac users. It will also work on Linux but you need to get SourceKit-lsp separately first (https://swift.org/download). I will be writing an article on that soon!

# Prerequisites
* [VSCode](https://code.visualstudio.com) 
* Sourcekit LSP - Component of Xcode on mac or Swift toolchain on linux
* [NodeJS and npm](https://nodejs.org/en/download/)

Sourcekit LSP is the language server that runs in the background. Check that it's installed by running `sourcekit-lsp`. There should be no output meaning it works. ctrl+c to exit.

# Building the plugin
1. `git clone https://github.com/apple/sourcekit-lsp.git`
2. `cd sourcekit-lsp/Editors/vscode/`
3. `npm install`
4. `npm run dev-package`

This builds the vsix plugin for VScode.

If you encounter an error here, make sure all the prerequisites are installed and that you ran npm install. 

# Installing the plugin
5. `code --install-extension sourcekit-lsp-development.vsix`

Installs the plugin.

## Possible errors here
“zsh: command not found: code”:
* Open VScode
* command+shift+p
* Type “shell”
* Select “Install ‘code’ command in PATH

# Try it out!

Open up a new Swift file in vscode and notice how autocompletion is available, as well as syntax highlighting!

Check back later for a full tutorial with running the program, package management etc. 