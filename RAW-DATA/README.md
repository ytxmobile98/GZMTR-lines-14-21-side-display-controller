# Documentation for data files

**Note:** Please keep the file names and columns of each CSV file, and do NOT modify the header names (prefixed by the exclamation mark "!"); otherwise, the demo page will fail to function properly.

## Data reading process

When the demo page loads, the script `js/React/index.js` is executed, which calls the `initialLoad()` function in `js/React/initial-load.js` to read required data and load the main view.
1. The program will first read the files `SERVICE-TYPES.csv` and `DESTINATIONS.csv` in parallel using an asynchronous operation, each data file containing Chinese-English translation pairs for service types and destinations, respectively. The reading function is `readTranslationsData()` in `js/data/TRANSLATIONS-DATA.js`.
2. Then the program will then read `LINES-BASIC-INFO.csv` and `LINES-FILTERS.csv` sequentially, consisting of basic information about the line, and the filter lists that appear on the destination selection dialog, respectively. The reading function is `loadLinesInfo()` in `js/data/LINES-DATA.js`. **If one need to edit the data files, please make sure that each service type and destination (both in Chinese only) is listed in `SERVICE-TYPES.csv` or `DESTINATIONS.csv` correspondingly.**
3. After the data above are all read, the program calls `initialLoad()` to load the main view; this function is defined in `js/React/initial-load.js`, and called in `js/React/index.js`.

## Data file structures

### `LINES-BASIC-INFO.csv`

This file records the basic information of individual metro lines, including line name, whether it is for passenger service, destinations, and service types.

### `LINES-FILTERS.csv`

This file supplies the filter lists that appear on the destination selection dialog, allowing train conductors to more conveniently select the most frequent destinations.
