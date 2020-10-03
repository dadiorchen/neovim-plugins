The repo for my neovim plugins

# How to create plugin

* Install node package for neovim

```
npm install -g neovim
```

Run command to check it in nvim:

```
:checkhealth
```

* Link the project folder to nvim plugin folder:

```
ln -s ~/work/neovim-plugins ~/.nvim/rplugin/node/nvim-plugins
```

* Add plugin/command in index.js

```
function onBufWrite() {
  console.log('Buffer written!');
}

module.exports = (plugin) => {
  function setLine() {
    plugin.nvim.setLine('A line, for your troubles');
  }
  plugin.registerCommand('SetMyLine', [plugin.nvim.buffer, setLine]);
  plugin.registerAutocmd('BufWritePre', onBufWrite, { pattern: '*' });
};
```

* Install it in nvim

```
UpdateRemotePlugins
```

* Restart nvim

* Run the command:

```
:SetMyLine
```

# How to test
