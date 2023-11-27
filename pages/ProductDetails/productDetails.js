import {ImageBackground, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import styles from "./styleProductDetails";
import {AntDesign, Entypo, Feather, FontAwesome, FontAwesome5} from "@expo/vector-icons";
import {useEffect, useState} from "react";
import appColor from "../../constant/appColor";
import {useAddCartMutation, useFindProductByIdMutation} from "../../stores/API/service";
import {useNavigate, useParams} from "react-router-native";
import SORT_TYPE from "../../constant/sortType";
import {storeSlice} from "../../stores/StoreReducer";
import {useDispatch, useSelector} from "react-redux";

export default function ProductDetails() {
    const dispatch = useDispatch();
    const navigate= useNavigate();
    const data = useParams();

    const [quantityPurchased, setQuantityPurchased] = useState("1")
    const [productValue, setProductValue] = useState(null);
    const listStar = [1, 2, 3, 4, 5];
    const user = useSelector((state) => state.storeReducer.user);
    const cartNotication = useSelector((state) => state.storeReducer.cartNotication);


    // API
    const [findProductById, findProductByIdResult] = useFindProductByIdMutation();
    const [addCart, addCartResult] = useAddCartMutation();

    //format lại giá
    const priceOld = productValue?.price != null ? (productValue?.price).toLocaleString('vi-VN') : null;
    const price = productValue?.price != null ? (((100-productValue?.discount)/100) * productValue.price).toLocaleString('vi-VN') : null;

    let soldQuantity = productValue?.soldQuantity;
    if(soldQuantity >= 1000000){
        soldQuantity = (productValue?.soldQuantity/1000000.0).toFixed(1) + "tr";
    }
    else if(soldQuantity >= 1000){
        soldQuantity = (productValue?.soldQuantity/1000.0).toFixed(1) + "k";
    }

    let warehouseQuantity = productValue?.warehouseQuantity;
    if(warehouseQuantity >= 1000000000){
        warehouseQuantity = (productValue?.warehouseQuantity/1000000000.0).toFixed(1) + "t";
    }
    else if(warehouseQuantity >= 1000000){
        warehouseQuantity = (productValue?.warehouseQuantity/1000000.0).toFixed(1) + "tr";
    }
    else if(warehouseQuantity >= 1000){
        warehouseQuantity = (productValue?.warehouseQuantity/1000.0).toFixed(1) + "k";
    }
    // kết thúc format giá

    useEffect(() => {

        const getData = async () => {
            await findProductById({
                id: data?.id,
            }).unwrap()
                .then((originalPromiseResult) => {
                    setProductValue(originalPromiseResult);
                })
                .catch((ex) => {
                    console.log("Exception: ,", ex)
                })
        }
        getData();

    }, []);

    const handleOnChangeQuantityPurchased = (value) => {
        value = value.replace(/\s|[^0-9]/, '');
        if (value === '' || value === '0') {
            setQuantityPurchased("1");
        } else if (Number(value) >= productValue?.warehouseQuantity) {
            setQuantityPurchased(`${productValue?.warehouseQuantity}`)
        } else {
            value = Number(value);
            setQuantityPurchased('' + value);
        }
    }

    const handleOnPressQuantityPurchasedMinus = () => {
        if (Number(quantityPurchased) > 1) {
            setQuantityPurchased(`${Number(quantityPurchased) - 1}`);
        }
    }

    const handleOnPressQuantityPurchasedPlus = () => {
        if (Number(quantityPurchased) < productValue?.warehouseQuantity) {
            setQuantityPurchased(`${Number(quantityPurchased) + 1}`);
        }
    }

    const handleOnPressAddToCart = async () => {
        console.log("user", user);

        if(user != null){
            await addCart({
                user,
                product: productValue,
                quantity: quantityPurchased,
            }).unwrap()
                .then((originalPromiseResult) => {
                    if(originalPromiseResult?.cart != null){
                        ToastAndroid.show('Thêm vào giỏ hàng thành công!', ToastAndroid.SHORT, ToastAndroid.CENTER,);
                        dispatch(storeSlice.actions.setCartNotication(cartNotication + Number(quantityPurchased)));
                    }
                })
                .catch((ex) => {
                    console.log("Exception: ,", ex)
                })
        }
        else {
            dispatch(storeSlice.actions.nextPage(`/login`));
            navigate(`/login`)
        }
    }

    const handleOnPressBuyNow = () => {

    }

    return (
        <View
            style={styles.container}
        >
            <ScrollView>
                <ImageBackground
                    style={[styles.productDetailsImage]}
                    source={{uri: productValue?.linkImage}}
                    resizeMode="stretch"
                >
                </ImageBackground>
                <View
                    style={[styles.productDetailsContent]}
                >
                    <View>
                        <Text style={[styles.productDetailsName]}>
                            {productValue?.name}
                        </Text>
                    </View>
                    <View style={[styles.starAndSold]}>
                        <View style={[styles.starBox]}>
                            <View style={[styles.listStar]}>
                                {
                                    listStar.map((value) => {
                                        if (value <= productValue?.rating) {
                                            return (
                                                <View key={`star ${value}`} style={[styles.starIcon]}>
                                                    <FontAwesome name="star" size={24} color="#ffb440"/>
                                                </View>
                                            );
                                        } else if ((value - 0.5) <= productValue?.rating) {
                                            return (
                                                <View key={`star ${value}`} style={[styles.starIcon]}>
                                                    <FontAwesome name="star-half-o" size={24} color="#ffb440"/>
                                                </View>
                                            );
                                        } else {
                                            return (
                                                <View key={`star ${value}`} style={[styles.starIcon]}>
                                                    <FontAwesome name="star-o" size={24} color="black"/>
                                                </View>
                                            );
                                        }
                                    })
                                }
                            </View>
                            <View style={[styles.splittingLine,]}></View>
                            <Text style={[styles.quantityStar]}>{productValue?.rating}</Text>
                        </View>
                        <View style={[styles.quantitySold]}>
                            <Text>Đã Bán {soldQuantity}</Text>
                        </View>
                    </View>
                    <View style={[styles.productDetailsPrice]}>
                        <View style={[styles.productPriceBox, styles.productPriceBoxOld]}>
                            <Text style={[styles.productCurrencyUnit, styles.productCurrencyUnitOld]}>đ</Text>
                            <Text style={[styles.productPrice, styles.productPriceOld]}>{priceOld}</Text>
                        </View>

                        <View style={[styles.productPriceBox]}>
                            <Text style={[styles.productCurrencyUnit]}>đ</Text>
                            <Text style={[styles.productPrice]}>{price}</Text>
                        </View>

                        <View
                            style={[styles.productSaleOff]}
                        >
                            <Text style={[styles.productSaleOffText]}>{`-${productValue?.discount}%`}</Text>
                        </View>
                    </View>
                    <View style={[styles.quantityPurchasedAndSold]}>
                        <Text style={[]}>Số Lượng</Text>
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
                            ></TextInput>
                            <TouchableOpacity
                                style={[styles.quantityPurchasedBtn]}
                                onPress={handleOnPressQuantityPurchasedPlus}
                            >
                                <AntDesign name="plus" size={24} color="black"/>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.quantitySoldBox]}>
                            <Text style={[]}>Sản phẩm có sẵn: {warehouseQuantity}</Text>
                        </View>
                    </View>
                    <View style={[styles.purchaseBox]}>
                        <TouchableOpacity
                            style={[styles.btnAddToCart]}
                            onPress={handleOnPressAddToCart}
                        >
                            <View style={[]}><FontAwesome5 name="cart-plus" size={24} color={appColor.red}/></View>
                            <Text style={[styles.btnAddToCartText]}>Thêm Vào Giỏ Hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.btnBuyNow]}
                            onPress={handleOnPressBuyNow}
                        >
                            <Text style={[styles.btnBuyNowText]}> Mua Ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
