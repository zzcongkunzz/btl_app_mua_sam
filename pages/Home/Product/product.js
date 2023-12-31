import {Image, ImageBackground, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import styles from "./styleProduct";
import generalStyle from "../../../assets/GeneralStyle/generalStyle"
import {useNavigate} from "react-router-native";
import {useDispatch} from "react-redux";
import {storeSlice} from "../../../stores/StoreReducer";


export default function Product() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleOnPressProduct = () => {
        dispatch(storeSlice.actions.nextPage(`/productDetails/${111}`));
        navigate(`/productDetails/${111}`);
    }

    return (
        <TouchableWithoutFeedback
            onPress={handleOnPressProduct}
        >
            <View
                style={styles.container}
            >
                <ImageBackground
                    style={[styles.productImage]}
                    source={require("../../../assets/img/sanpham1.jpg")}
                    resizeMode="cover"
                >
                    <View>
                        <View
                            style={[styles.productFavouriteBefore]}
                        ></View>
                        <View
                            style={[styles.productFavourite]}

                        >
                            <Text
                                style={[styles.productFavouriteText]}
                            >
                                Yêu Thích
                            </Text>
                        </View>
                    </View>
                    <View
                        style={[styles.productSaleOff]}
                    >
                        <Text
                            style={[styles.productSaleOffText]}

                        >-99%</Text>
                    </View>
                </ImageBackground>

                <View
                    style={[styles.productContent]}
                >
                    <Text style={[generalStyle.text]}>
                        áo khoác nữ sinh Harajuku JK 100% ảnh thật áo khoác nữ sinh Harajuku
                    </Text>
                    <View
                        style={[styles.productSell]}
                    >
                        <View
                            style={[styles.productPriceBox]}
                        >
                            <Text
                                style={[styles.productCurrencyUnit]}
                            >đ</Text>
                            <Text
                                style={[styles.productPrice]}
                            >200.000</Text>
                        </View>
                        <Text
                            style={[styles.productQuantitySold]}
                        >Đã bán 8k</Text>
                    </View>
                </View>
            </View>


        </TouchableWithoutFeedback>
    );
}
