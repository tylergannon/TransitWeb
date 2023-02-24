#!/usr/bin/env fish

# Initialize a list of commands to check the existence of
set -l requirements curl

set -l brew_packages git \
    neovim \
    fzf \
    ripgrep \
    starship \
    nodejs \
    python \
    the_silver_searcher \
    rust

# Check if the command exists
for cmd in $requirements
    if not type -q $cmd
        echo "Please install $cmd"
        exit 1
    end
end
type -q brew; or begin

    read -l -P "Install homebrew? (y/n)" INSTALL_HOMEBREW
    if test $INSTALL_HOMEBREW = "y"
        echo "Installing homebrew..."
        curl -fsSL https://tinyurl.com/homebrew-installer | bash
    else
        echo "Please install homebrew first"
        echo "curl -fsSL https://tinyurl.com/homebrew-installer | bash"
        exit 1
    end
end

echo "Homebrew packages to install: $brew_packages"
read -l -P "Install packages? (y/n)" INSTALL_PACKAGES
if test $INSTALL_PACKAGES != "y"
    echo "Please install packages first."
    echo "brew install $brew_packages"
    exit 1
end
echo "Installing packages..."
brew install $brew_packages
# Iterate backward through the indices of $brew_packages

# Should I install LunarVim?
read -l -P "Install LunarVim? (y/n)" INSTALL_LUNARVIM
if test $INSTALL_LUNARVIM = "y"
    echo "Installing LunarVim..."
    curl -L -s https://tinyurl.com/lunarvim | bash
else
    echo "Please install LunarVim first."
    echo "curl -L -s https://tinyurl.com/lunarvim | bash"
    exit 1
end
