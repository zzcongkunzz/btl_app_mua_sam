import styles from "./styleCart"
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import ProductOfCart from "./productOfCart/productOfCart";
import {useState} from "react";
import Checkbox from "expo-checkbox";
import generalStyle from "../../assets/GeneralStyle/generalStyle";

export default function Cart() {
    const [isCheckedAll, setCheckedAll] = useState(false);

    return (
        <View style={[styles.container]}>
            <View style={[styles.header]}>
                <TouchableOpacity style={[styles.btnComeBack,]}>
                    <AntDesign name="arrowleft" size={30} color="red"/>
                </TouchableOpacity>
                <Text style={[styles.cartText,]}>Giỏi hàng</Text>
            </View>
            <ScrollView style={[styles.listProduct]}>
                <ProductOfCart></ProductOfCart>
                <ProductOfCart></ProductOfCart>
                <ProductOfCart></ProductOfCart>
                <ProductOfCart></ProductOfCart>
                <ProductOfCart></ProductOfCart>
                <ProductOfCart></ProductOfCart>
                <ProductOfCart></ProductOfCart>
                <ProductOfCart></ProductOfCart>
                <ProductOfCart></ProductOfCart>
                <ProductOfCart></ProductOfCart>
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
                            value={isCheckedAll}
                            onValueChange={setCheckedAll}
                            color={isCheckedAll ? 'red' : "rgb(128,125,125)"}
                        />
                        <Text style={[styles.checkAllProductText]}>Tất cả</Text>
                    </View>
                    <View style={[styles.totalCostContent]}>
                        <View style={{flexDirection: "row", marginTop: 1}}>
                            <Text>Tổng thanh toán</Text>
                            <View style={[styles.totalCostBox]}>
                                <Text style={[styles.totalCostCurrencyUnit]}>đ</Text>
                                <Text style={[styles.totalCost]}>200.000</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={[styles.btnBuyProduct]} >
                            <Text style={[styles.btnBuyProductText]}  >Mua Hàng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};
