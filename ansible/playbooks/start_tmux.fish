#!/usr/bin/env fish

# Starts a new tmux session unless one is already running
set GITHUB_TOKEN "$1"
set session_name "main"
tmux has-session -t $session_name;
and tmux attach-session \
    $2 \
    -T RGB \
    attach-session \
    -e "GITHUB_TOKEN=$GITHUB_TOKEN" \
    -t $session_name; \
or tmux \
    $2 \
    -T RGB \
    new-session \
    -e "GITHUB_TOKEN=$GITHUB_TOKEN" \
    -s $session_name
