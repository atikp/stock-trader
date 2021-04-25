# Stock-trader-app

1. Create a stock trading application.
2. You need to create end points to fit all requirements.

##### Backend

**User schema**

- `id` - int;
- `firstName` - varchar/string;
- `lastName` - varchar/string;
- `balance` - int;

**Transactions schema**

- `id` - int;
- `shareName` - varchar/string;
- `sharePriceOnParches` - varchar/string || null;
- `sharePriceOnSell` - varchar/string || null;
- `quantity` - int;
- `userId` - int;

##### Frontend

1. Render a list of 5 stocks(pick on your own taste).
2. Render a user balance.
3. Each list item should have:

- share name;
- current price per share;
- `input` for picking quantity to buy or sell shares;
- `buy` and `sell` buttons.
  - `buy` button should be clickable if user has sufficient funds to buy;
  - `sell` button should be clickable if user owns shares of this company;

4. prices should be updating as often as possible (depends on Stock Market API, at least 5s interval).
5. Render a list of shares usersOwn. Each list item should have:

- share name;
- quantity of shares.

#### NOTE:

**Recommended APIs**

- https://finnhub.io/ (support web sockets)
- https://www.tiingo.com/
- [Stock APIs list](https://medium.com/@andy.m9627/the-ultimate-guide-to-stock-market-apis-for-2020-1de6f55adbb)

### BONUS requirements:

- implement live data with web sockets;
- build charts for each stock and update chart;
  - you can use any js library for charts. (Ex: [ChartJS](https://www.chartjs.org/) or [D3](https://d3js.org/))
- create stock detail page;