import {ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./styleProductDetails";
import {AntDesign, Entypo, Feather, FontAwesome, FontAwesome5} from "@expo/vector-icons";
import {useState} from "react";
import appColor from "../../constant/appColor";

export default function ProductDetails() {
    const [quantityPurchased, setQuantityPurchased] = useState("1")

    const quantityStar = 2.5;
    const listStar = [1, 2, 3, 4, 5];

    const handleOnChangeQuantityPurchased = (value) => {
        value = value.replace(/\s|[^0-9]/, '');
        if (value === '' || value === '0') {
            setQuantityPurchased("1");
        } else if (Number(value) >= 999) {
            setQuantityPurchased("999")
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
        if (Number(quantityPurchased) < 999) {
            setQuantityPurchased(`${Number(quantityPurchased) + 1}`);
        }
    }

    const handleOnPressAddToCart = () => {

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
                    source={require("../../assets/img/sanpham1.jpg")}
                    resizeMode="stretch"
                >
                </ImageBackground>
                <View
                    style={[styles.productDetailsContent]}
                >
                    <View>
                        <Text style={[styles.productDetailsName]}>
                            áo khoác nữ sinh Harajuku JK 100% ảnh thật áo khoác nữ sinh Harajuku
                        </Text>
                    </View>
                    <View style={[styles.starAndSold]}>
                        <View style={[styles.starBox]}>
                            <View style={[styles.listStar]}>
                                {
                                    listStar.map((value) => {
                                        if (value <= quantityStar) {
                                            return (
                                                <View key={`star ${value}`} style={[styles.starIcon]}>
                                                    <FontAwesome name="star" size={24} color="#ffb440"/>
                                                </View>
                                            );
                                        } else if ((value - 0.5) <= quantityStar) {
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
                            <Text style={[styles.quantityStar]}>{quantityStar}</Text>
                        </View>
                        <View style={[styles.quantitySold]}>
                            <Text>Đã Bán 1,7k</Text>
                        </View>
                    </View>
                    <View style={[styles.productDetailsPrice]}>
                        <View style={[styles.productPriceBox, styles.productPriceBoxOld]}>
                            <Text style={[styles.productCurrencyUnit, styles.productCurrencyUnitOld]}>đ</Text>
                            <Text style={[styles.productPrice, styles.productPriceOld]}>400.000</Text>
                        </View>

                        <View style={[styles.productPriceBox]}>
                            <Text style={[styles.productCurrencyUnit]}>đ</Text>
                            <Text style={[styles.productPrice]}>200.000</Text>
                        </View>

                        <View
                            style={[styles.productSaleOff]}
                        >
                            <Text style={[styles.productSaleOffText]}>-50%</Text>
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
                            <Text style={[]}>Sản phẩm có sẵn: 999</Text>
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
