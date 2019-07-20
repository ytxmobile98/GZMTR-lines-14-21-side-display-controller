# Documentation for data files / 数据文件说明

**Note:** Please keep the file names and columns of each CSV file, and **do not** modify the header names (prefixed by the exclamation mark "!"); otherwise, the demo page will **fail to function properly**.

**请注意：** 请将此目录下所有的CSV文件名和表格列保持不变，且**不要**改变任何表格列的标题（前面以感叹号“!”标明）；否则，此展示页面将**不能正常工作**。

## Data reading process / 数据读取流程

When the demo page loads, the script `js/React/index.js` is executed, which calls the `initialLoad()` function in `js/React/initial-load.js` to read required data and load the main view.

当该展示页面加载时，会执行`js/React/index.js`文件，调用`js/React/initial-load.js`中的`initialLoad()`函数，以读取必要数据并加载主页面。

1. The program will first read the files `SERVICE-TYPES.csv` and `DESTINATIONS.csv` in parallel using an asynchronous operation, each data file containing Chinese - English translations for service types and destinations, respectively. The reading function is `readTranslationsData()` in `js/data/TRANSLATIONS-DATA.js`.

	首先，程序会使用异步操作同时读取`SERVICE-TYPES.csv`和`DESTINATIONS.csv`这两个文件，分别是列车种类与目的地的中英文翻译。

2. Then the program will then read `LINES-BASIC-INFO.csv` and `LINES-FILTERS.csv` sequentially, consisting of basic information about the line, and the filter lists that appear on the destination selection dialog, respectively. The reading function is `loadLinesInfo()` in `js/data/LINES-DATA.js`. **If one need to edit the data, please make sure that each service type and destination (both in Chinese only) is listed in `SERVICE-TYPES.csv` or `DESTINATIONS.csv` correspondingly.**

	接着，程序会先后读取`LINES-BASIC-INFO.csv`和`LINES-FILTERS.csv`两个文件，分别包含各条线路的基本信息，及选择目的地对话框中的筛选列表。**如果需要编辑数据时，请务必确保每个列车种类名称和终点站（仅中文）皆已在对应的`SERVICE-TYPES.csv`或`DESTINATIONS.csv`文件中列出。**

3. After the data above are all read, the program calls `initialLoad()` to load the main view; this function is defined in `js/React/initial-load.js`, and called in `js/React/index.js`.

	以上数据读取完成后，程序会调用`initialLoad()`来加载主页面；此函数位于`js/React/initial-load.js`文件内。

## Documentation for structures of the data files / 数据文件结构说明

### `LINES-BASIC-INFO.csv`

This file records the basic information of individual metro lines, including line name, whether it is for passenger service, destinations, and service types.

此文件记录各线路的基本信息，包括线路名称、是否为载客服务、终点站和列车种类信息。

### `LINES-FILTERS.csv`

This file supplies the filter lists that appear on the destination selection dialog, allowing train conductors to more conveniently select the most frequent destinations.

此文件提供了选择目的地对话框中的筛选列表，方便列车司机选择最常用的列车目的地。
