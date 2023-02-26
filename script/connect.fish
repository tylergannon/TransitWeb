#!/usr/bin/env fish

set HOST dev.transithd.com

ssh $HOST -t "~/.local/bin/start_tmux.fish '$GITHUB_TOKEN' $1"
