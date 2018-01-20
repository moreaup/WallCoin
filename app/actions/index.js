import * as user from './user';
import * as coins from './coins';
import * as portfolios from './portfolios';
import * as myCoins from './myCoins';
import * as operations from './operations';
import * as api from './api';

export const ActionCreators = {
  ...user,
  ...coins,
  ...portfolios,
  ...myCoins,
  ...operations,
  ...api
};
