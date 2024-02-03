import styles from "./styleCart"
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import ProductOfCart from "./productOfCart/productOfCart";
import {useEffect, useMemo, useState} from "react";
import Checkbox from "expo-checkbox";
import generalStyle from "../../assets/GeneralStyle/generalStyle";
import {storeSlice} from "../../stores/StoreReducer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-native";
import {useFindProductByCriteriaMutation, useGetCartByUserMutation} from "../../stores/API/service";
import SORT_TYPE from "../../constant/sortType";

export default function Cart() {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const pageHistory = useSelector((state) => state.storeReducer.pageHistory);
    const user = useSelector((state) => state.storeReducer.user);
    const listCart = useSelector((state) => state.storeReducer.listCart);

    let checkedAll = false;
    let totalCost = 200000;

    // API
    const [getCartByUser, getCartByUserResult] = useGetCartByUserMutation();

    useMemo(() => {
        let countCheck = 0;
        listCart?.map((cart, i) => {
            if (cart.isChecked){
                const product = cart.product;
                countCheck++;
                totalCost += ((100-product.discount)/100) * product.price * cart.quantity;
            }
            return Object.assign({}, cart);
        });

        checkedAll = listCart?.length > 0 && countCheck === listCart?.length;

    }, [listCart])

    useEffect(() => {
        const getData = async () => {
            await getCartByUser({
                user,
            }).unwrap()
                .then((originalPromiseResult) => {
                    dispatch(storeSlice.actions.setListCart(originalPromiseResult.listCart.map((cart) => {
                        return {
                            ...cart,
                            isChecked : false,
                        };
                    })));
                    // console.log("originalPromiseResult.listCart", originalPromiseResult.listCart)
                })
                .catch((ex) => {
                    console.log("Exception: ,", ex)
                })
        }
        getData();
    }, []);

    const handleOnPressBackButton = () => {
        if (pageHistory.length >= 2) {
            const path = pageHistory[pageHistory.length - 2]
            navigate(path);
            dispatch(storeSlice.actions.backPage());
        }
    }

    const handleOnChaneCheckAllProduct = (valueCheckBox) => {
        dispatch(storeSlice.actions.setListCart(listCart.map((cart) => {
            return {
                ...cart,
                isChecked : valueCheckBox,
            };
        })));
    }

    return (
        <View style={[styles.container]}>
            <View style={[styles.header]}>
                <TouchableOpacity
                    style={[styles.btnComeBack,]}
                    onPress={handleOnPressBackButton}
                >
                    <AntDesign name="arrowleft" size={30} color="red"/>
                </TouchableOpacity>
                <Text style={[styles.cartText,]}>Giỏi hàng</Text>
            </View>
            <ScrollView style={[styles.listProduct]}>
                {(listCart.length > 0) && listCart.map((cart) => {
                    return (
                        <ProductOfCart
                            key={"product: " + cart.id}
                            value={cart}
                        ></ProductOfCart>
                    );
                })}
            </ScrollView>
            <View style={[styles.footer]}>
                <View style={[styles.transportationCostContent]}>
                    <Text style={[styles.transportationCostText]}>Phí vận chuyển: </Text>
                    <View style={[styles.transportationCostBox]}>
                        <Text style={[styles.transportationCostCurrencyUnit]}>đ</Text>
                        <Text style={[styles.transportationCost]}>200.000</Text>
                    </View>
                </View>
                <View style={[styles.pay]}>
                    <View style={[styles.checkAllProductContent]}>
                        <Checkbox
                            style={[styles.checkAllProduct]}
                            value={checkedAll}
                            onValueChange={handleOnChaneCheckAllProduct}
                            color={checkedAll ? 'red' : "rgb(128,125,125)"}
                        />
                        <Text style={[styles.checkAllProductText]}>Tất cả</Text>
                    </View>
                    <View style={[styles.totalCostContent]}>
                        <View style={{flexDirection: "row", marginTop: 1}}>
                            <Text>Tổng thanh toán</Text>
                            <View style={[styles.totalCostBox]}>
                                <Text style={[styles.totalCostCurrencyUnit]}>đ</Text>
                                <Text style={[styles.totalCost]}>{totalCost.toLocaleString('vi-VN')}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={[styles.btnBuyProduct]}>
                            <Text style={[styles.btnBuyProductText]}>Mua Hàng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};
