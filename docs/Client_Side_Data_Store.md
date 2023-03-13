# Data Store using LokiJS

[LokiJS][1] is our data store.
Charts arrive with a `ChartDate` object which
means the local date in `YYYY-mm-dd` and time in `HH:MM:ss` format,
as well as the string Time Zone.

This should be changed to a UTC timestamp but for the meantime we'll
probably convert it.

> if the retrieved object has a `chart_date` element, change to `timestamp`.

Charts are indexed by timestamp.

[1]: https://github.com/techfort/LokiJS
