import {ImageBackground, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import styles from "./styleProductOfCart";
import {useEffect, useState} from "react";
import Checkbox from 'expo-checkbox';
import generalStyle from "../../../assets/GeneralStyle/generalStyle";
import {AntDesign} from "@expo/vector-icons";
import {useDispatch, useSelector} from "react-redux";
import {storeSlice} from "../../../stores/StoreReducer";
import {useDeleteCartMutation, useGetCartByUserMutation, useUpdateCartMutation} from "../../../stores/API/service";

export default function ProductOfCart({value}) {
    const dispatch = useDispatch();

    const listCart = useSelector((state) => state.storeReducer.listCart);

    const [quantityPurchased, setQuantityPurchased] = useState(`${value?.quantity}`)
    const product = value.product;
    const productName = product?.name.length > 31 ? (product?.name.substring(0, 28) + '...') : product?.name;
    const price = (((100 - product?.discount) / 100) * product?.price).toLocaleString('vi-VN');

    // API
    const [updateCart, updateCartResult] = useUpdateCartMutation();
    const [deleteCart, deleteCartResult] = useDeleteCartMutation();

    const update = async (quantity) => {
        await updateCart({
            cart: {
                ...value,
                quantity: quantity,
            },
        }).unwrap()
            .then((originalPromiseResult) => {
                console.log("originalPromiseResult", originalPromiseResult.cart);
                const cartNew = originalPromiseResult.cart;
                dispatch(storeSlice.actions.setListCart(listCart.map((cart) => {
                    if (cart.id === value.id) {
                        return {
                            ...cartNew,
                        };
                    } else {
                        return {
                            ...cart,
                        }
                    }
                })));
                dispatch(storeSlice.actions.setCartNotication(cartNotication + Number(quantity)));

            })
            .catch((ex) => {
                console.log("Exception: ,", ex)
            })
    }


    const handleOnChangeQuantityPurchased = (value) => {
        value = value.replace(/\s|[^0-9]/, '');
        if (value === '' || value === '0') {
            setQuantityPurchased("1");
        } else if (Number(value) >= product.warehouseQuantity) {
            setQuantityPurchased(`${product.warehouseQuantity}`)
        } else {
            value = Number(value);
            setQuantityPurchased('' + value);
        }
    }

    const handleOnSubmitQuantityPurchased = async () => {
        await update(Number(quantityPurchased));
    }

    const handleOnPressQuantityPurchasedMinus = async () => {
        if (Number(quantityPurchased) > 1) {
            await update(Number(quantityPurchased) - 1);
            setQuantityPurchased(`${Number(quantityPurchased) - 1}`);
        }
    }

    const handleOnPressQuantityPurchasedPlus = async () => {
        if (Number(quantityPurchased) < product.warehouseQuantity) {
            await update(Number(quantityPurchased) + 1);
            setQuantityPurchased(`${Number(quantityPurchased) + 1}`);
        }
    }

    const handleOnChangeCheckBox = (valueCheckBox) => {
        dispatch(storeSlice.actions.setListCart(listCart.map((cart) => {
            if (cart.id === value.id) {
                return {
                    ...cart,
                    isChecked: valueCheckBox,
                };
            } else {
                return {
                    ...cart,
                }
            }
        })));
    }

    const handleOnPressDeleteCart = async () => {
        await deleteCart({
            id: value.id,
        }).unwrap()
            .then((originalPromiseResult) => {
                ToastAndroid.show('Xóa sản phẩm thành công!', ToastAndroid.SHORT, ToastAndroid.CENTER,);
                dispatch(storeSlice.actions.setListCart(listCart.filter((cart) => {
                    return cart.id !== value.id
                })));
                dispatch(storeSlice.actions.setCartNotication(cartNotication - Number(quantityPurchased)));
            })
            .catch((ex) => {
                console.log("Exception: ,", ex)
            })

    }

    return (
        <View style={[styles.container]}>
            <Checkbox
                style={[generalStyle.checkBox]}
                value={value.isChecked}
                onValueChange={handleOnChangeCheckBox}
                color={value.isChecked ? 'red' : "#000"}
            />
            <ImageBackground
                style={[styles.productOfCartImage]}
                source={{uri: product?.linkImage}}
                resizeMode="cover"
            >
            </ImageBackground>
            <View style={[styles.content]}>
                <Text style={[styles.productOfCartName]}>{productName}</Text>
                <View style={[styles.productOfCartPriceBox]}>
                    <Text style={[styles.productOfCartCurrencyUnit]}>đ</Text>
                    <Text style={[styles.productOfCartPrice]}>{price}</Text>
                </View>
                <View style={[styles.quantityPurchasedBox]}>
                    <TouchableOpacity
                        style={[styles.quantityPurchasedBtn]}
                        onPress={handleOnPressQuantityPurchasedMinus}
                    >
                        <AntDesign name="minus" size={24} color="black"/>
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.quantityPurchasedBtn, styles.quantityPurchasedBtnCenter]}
                        value={quantityPurchased}
                        textAlign={"center"}
                        onChangeText={handleOnChangeQuantityPurchased}
                        onSubmitEditing={handleOnSubmitQuantityPurchased}
                    ></TextInput>
                    <TouchableOpacity
                        style={[styles.quantityPurchasedBtn]}
                        onPress={handleOnPressQuantityPurchasedPlus}
                    >
                        <AntDesign name="plus" size={24} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.deleteBtn]}
                        onPress={handleOnPressDeleteCart}
                    >
                        <Text style={[styles.deleteBtnText]}>Xoá</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
