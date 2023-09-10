import {Image, ScrollView, View} from "react-native";
import styles from "./styleHome";
import ProductHeader from "./productHeader/productHeader";
import Product from "./product/product";

function Home() {

    return (
        <View
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={styles.containerScrollView}
            >
                <Image
                    style={styles.banner}
                    source={require("../../assets/img/banner.png")}
                ></Image>
                <View
                    style={styles.listProduct}
                >
                    <Product></Product>
                    <Product></Product>
                    <Product></Product>
                    <Product></Product>
                    <Product></Product>
                    <Product></Product>
                </View>

            </ScrollView>
            <ProductHeader></ProductHeader>

        </View>
    );
}

export default Home
