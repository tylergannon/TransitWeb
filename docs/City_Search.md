# City Search component

City data for getting birth location info is obtained from
the free [geonames.org][1] download area. The files have unused
columns removed and then are compressed, by:

```
set file_name "cities15000"
set file_url "http://download.geonames.org/export/dump/$file_name.zip"

curl -LsfO $file_url
unzip $file_name.zip
cat $file_name.txt | script/strip_file.py | brotli > static

```

## Data Model

Files are stored in TSV format.

> Note: geonameid is left off, assuming we'll rebuild the data if it's updated.

### City

TSV columns are:

```
name, asciiName, longitude, latitude, countryCode, admin1Code, admin2Code, tz
```

Country code, admin1 and admin2 code, are all 2-digit strings.

### Country

[1]: http://download.geonames.org/export/dump/
