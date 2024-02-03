import {Image, ImageBackground, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import styles from "./styleProduct";
import generalStyle from "../../../assets/GeneralStyle/generalStyle"
import {useNavigate} from "react-router-native";
import {useDispatch} from "react-redux";
import {storeSlice} from "../../../stores/StoreReducer";


export default function Product({value}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productName = value.name.length > 25 ? (value.name.substring(0, 22) + '...') : value.name;
    const price = (((100-value.discount)/100) * value.price).toLocaleString('vi-VN');
    // const price = (value.price).toLocaleString('vi-VN');

    let soldQuantity = value.soldQuantity;

    if(soldQuantity > 1000000){
        soldQuantity = (value.soldQuantity/1000000.0).toFixed(1) + "tr";
    }
    else if(soldQuantity > 1000){
        soldQuantity = (value.soldQuantity/1000.0).toFixed(1) + "k";
    }

    const handleOnPressProduct = () => {
        dispatch(storeSlice.actions.nextPage(`/productDetails/${value.id}`));
        navigate(`/productDetails/${value.id}`);
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
                    source={{uri: value?.linkImage}}
                    resizeMode="cover"
                >
                    {value?.favorite &&
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
                    }
                    {(value?.discount > 0) &&
                        <View
                            style={[styles.productSaleOff]}
                        >
                            <Text
                                style={[styles.productSaleOffText]}

                            >{`-${value?.discount}%`}</Text>
                        </View>
                    }
                </ImageBackground>

                <View
                    style={[styles.productContent]}
                >
                    <Text style={[generalStyle.text]}>
                        {productName}
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
                            >{price}</Text>
                        </View>
                        <Text
                            style={[styles.productQuantitySold]}
                        >Đã bán {soldQuantity}</Text>
                    </View>
                </View>
            </View>


        </TouchableWithoutFeedback>
    );
}
