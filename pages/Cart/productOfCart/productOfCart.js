import {ImageBackground, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./styleProductOfCart";
import {useState} from "react";
import Checkbox from 'expo-checkbox';
import generalStyle from "../../../assets/GeneralStyle/generalStyle";
import {AntDesign} from "@expo/vector-icons";

export default function ProductOfCart({onProductChecked}) {
    const [isChecked, setChecked] = useState(false);
    const [quantityPurchased, setQuantityPurchased] = useState("1")

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

    return (
        <View style={[styles.container]}>
            <Checkbox
                style={[generalStyle.checkBox]}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? 'red' : "#000"}
            />
            <ImageBackground
                style={[styles.productOfCartImage]}
                source={require("../../../assets/img/sanpham1.jpg")}
                resizeMode="cover"
            >
            </ImageBackground>
            <View style={[styles.content]}>
                <Text  style={[styles.productOfCartName]}>sp sp adsadsa qewqeq adsasda...</Text>
                <View style={[styles.productOfCartPriceBox]}>
                    <Text style={[styles.productOfCartCurrencyUnit]}>đ</Text>
                    <Text style={[styles.productOfCartPrice]}>200.000</Text>
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
                    ></TextInput>
                    <TouchableOpacity
                        style={[styles.quantityPurchasedBtn]}
                        onPress={handleOnPressQuantityPurchasedPlus}
                    >
                        <AntDesign name="plus" size={24} color="black"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.deleteBtn]} >
                        <Text style={[styles.deleteBtnText]} >Xoá</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
