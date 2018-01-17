import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import update from 'immutability-helper';

/**
 * {
 *      coins: {
 *               id: {
 *                   value,
 *                   expirationDate,
 *                   contexts: [{
 *                      req: 0,
 *                      page: 1
 *                   }]
 *               }
 *      },
 *      portfolios: {
 *               id: {
 *                   value,
 *                   expirationDate,
 *                   contexts: [{
 *                      req: 0,
 *                      page: 1
 *                   }]
 *               }
 *      },
 *      myCoins: {
 *               id: {
 *                   value,
 *                   expirationDate,
 *                   contexts: [{
 *                      req: 0,
 *                      page: 1
 *                   }]
 *               }
 *      },
 *      operations: {
 *               id: {
 *                   value,
 *                   expirationDate,
 *                   contexts: [{
 *                      req: 0,
 *                      page: 1
 *                   }]
 *               }
 * }
 */
const initialState = {
    coins: {},
    portfolios: {},
    myCoins: {},
    operations: {}
};

export const store = createReducer(initialState, {
    [types.UPDATE_STORE](state, action) {
        var data = action.payload.data;
        var toUpdate = action.payload.toUpdate;
        var requestIndex = action.payload.requestIndex;
        var page = action.payload.page;

        console.log("inside Update_store :", data);

        data.forEach(element => {
            var indexContext = [toUpdate][element.id] ? [toUpdate][element.id].find((e) => {
                return e.req == requestIndex;
            }) : 0;

            state = update(state, {
                [toUpdate]: itemToUpdate => update(itemToUpdate || {}, {
                    [element.id]: itemToUpdateIndexed => update(itemToUpdateIndexed || {}, {
                        $merge: {
                            value: element,
                            expirationDate: Date.now()// + (2 * 60 * 1000)
                        },
                        contexts: contexts => update(contexts || {}, {
                            $merge: {
                                [indexContext]: {
                                    requestIndex,
                                    page
                                }
                            }
                        })
                    })
                })
            })
        });

        return state;
    },
    [types.ADD_TO_STORE](state, action) {
        var dataElement = action.payload.data;
        console.log("dataElement :", dataElement);
        var toUpdate = action.payload.toUpdate;

        return update(state, {
            [toUpdate]: itemToUpdate => update(itemToUpdate || {}, {
                [dataElement.id]: {
                    $set: {
                        value: dataElement,
                        expirationDate: Date.now(),// + (2 * 60 * 1000),
                        contexts: { 0: { requestIndex: action.payload.requestIndex, page: action.payload.page } }
                    }
                }
            })
        })
    }
});