#!/usr/bin/env bash

test $(mongosh --quiet --eval 'try {rs.status().ok} catch {rs.initiate().ok}') = "1"
