
import React, { Component } from 'react';
import ReactNative from 'react-native';
import PropTypes from 'prop-types';

import { Container, Header, Content, List, ListItem, Text, Left, Body, Right, Switch, Card, CardItem, CardSwiper, SwipeRow, Button, Icon as IconNativeBase } from 'native-base';

import { FontelloIcon, checkFontelloIconExist} from '../utils/AppIcons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const {
    View,
    ScrollView,
    RefreshControl,
    TouchableHighlight,
    StyleSheet
  } = ReactNative;

import styles from '../styles/AppStyle'

const CardMyCoin = ({ myCoin, deleteMyCoin, editMyCoin, augmentation, myCoinValue, myCoinOwn }) => (
    <SwipeRow style={styles.listElementMyCoin}
        rightOpenValue={-150}
        right={
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableHighlight onPress={() => editMyCoin(myCoin)} style={{flex: 1}}>
                    <FontAwesomeIcon name="pencil" color="#FFD700" style={{ marginTop: 70, marginLeft: 10 }} size={30} />
                </TouchableHighlight >
                <TouchableHighlight onPress={() => deleteMyCoin(myCoin)} style={{flex: 1}}>
                    <FontAwesomeIcon name="trash" color="#FF0000" style={{ marginTop: 70 }} size={30} />
                </TouchableHighlight >
            </View>
        }
        body={
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Left>
                                {checkFontelloIconExist(myCoinValue.symbol.toLowerCase() + "-alt") ?
                                    <FontelloIcon name={myCoinValue.symbol.toLowerCase() + "-alt"} size={55} style={{ marginTop: 5, marginBottom: 5 }} /> :
                                    <FontelloIcon name="coin-2" size={55} style={{ marginTop: 5, marginBottom: 5 }} />
                                }
                                <Body>
                                    <Text>{myCoinValue.name}</Text>
                                    <Text note>{myCoin.quantity} {myCoinValue.symbol}</Text>
                                </Body>
                            </Left>
                            <Body>
                                <CardItem>
                                    <Text style={{ fontSize: 12 }}> Price (USD) : {myCoinOwn}</Text>
                                </CardItem>
                                <CardItem>
                                    <Text style={{ fontSize: 12 }}> Beneficial : {(myCoinOwn - (myCoin.quantity * myCoin.buyingPrice)).toPrecision(6)}$</Text>
                                </CardItem>
                                <CardItem>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}>
                                        {augmentation > 0 ?
                                            <FontAwesomeIcon name="arrow-up" size={40} color="#090" /> :
                                            <FontAwesomeIcon name="arrow-down" size={40} color="#900" />
                                        }
                                        <Text style={{ marginTop: 13, marginLeft: 10 }}>{augmentation}%</Text>
                                    </View>
                                </CardItem>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        }>
    </SwipeRow>
)

CardMyCoin.propTypes = {
    editMyCoin: PropTypes.func.isRequired,
    deleteMyCoin: PropTypes.func.isRequired,
    myCoin: PropTypes.object.isRequired,
    myCoinValue: PropTypes.object.isRequired,
    augmentation: PropTypes.number.isRequired,
    myCoinOwn: PropTypes.string.isRequired
};

export default CardMyCoin;
