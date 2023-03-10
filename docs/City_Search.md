# City Search component

City data for getting birth location info is obtained from
the free [geonames.org][1] download area.  The files have unused
columns removed and then are compressed, by:

```
set file_name "cities15000"
set file_url "http://download.geonames.org/export/dump/$file_name.zip"

curl -LsfO $file_url 
unzip $file_name.zip
cat $file_name.txt | script/strip_file.py | brotli > static

```


[1]: http://download.geonames.org/export/dump/
