#!/usr/bin/env fish

set -l names cities15000 cities5000 cities500

for file_name in $names
  set dest_file static/cities/$file_name.tsv.br
  set file_url "http://download.geonames.org/export/dump/$file_name.zip"
  echo "$file_name --> $dest_file"

  curl -LsfO $file_url

  unzip -qq $file_name.zip
  cat $file_name.txt | script/strip_file.py | brotli > $dest_file
  chmod 644 $dest_file
  rm $file_name.txt $file_name.zip

end

