#!/usr/bin/env fish

for dir in (find -type d ./servers)
    make -C $dir image
end
