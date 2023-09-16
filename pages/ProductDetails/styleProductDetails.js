import {StyleSheet} from 'react-native';
import appColor from "../../constant/appColor";
import app from "react-native/template/App";

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "rgba(178,172,172,0.2)",
        width: "100%",
        height: "100%",
    },
    splittingLine: {
        marginHorizontal: 10,
        borderColor: "#000",
        borderRightWidth: 1,
        height: "60%",
        opacity: 0.2
    },
    productDetailsImage: {
        width: "100%",
        height: 400,
        resizeMode: "stretch",
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    productDetailsContent: {
        backgroundColor: "#fff",
        paddingHorizontal: 5,
        paddingVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        color: "#ffb440"
    },
    productDetailsName: {
        fontWeight: 400,
        lineHeight: 18,
    },
    starAndSold: {
        flexDirection: "row",
        width: "100%",
        marginTop: 40,
        paddingBottom: 10,

    },
    starBox: {
        flexDirection: "row",
        alignItems: "center",

    },
    quantityStar: {},
    listStar: {
        flexDirection: "row",

    },
    starIcon: {
        padding: 5,
    },
    quantitySold: {
        justifyContent: "center",
        marginLeft: 10
    },
    productDetailsPrice: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "rgba(178,172,172,0.1)",
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 10,
        alignItems: "center",
    },
    productPriceBox: {
        flexDirection: "row",
    },
    productCurrencyUnit: {
        textDecorationLine: "underline",
        color: appColor.red,
        fontSize: 16,
    },
    productPrice: {
        color: appColor.red,
        fontSize: 16,
    },
    productPriceBoxOld: {
        marginRight: 20,
    },
    productCurrencyUnitOld: {
        textDecorationLine: "underline line-through",
        color: "rgba(178,172,172,0.5)"
    },
    productPriceOld: {
        textDecorationLine: "line-through",
        color: "rgba(178,172,172,0.5)"

    },
    productSaleOff: {
        backgroundColor: "rgb(245,221,96)",
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 30,
        borderRadius: 3,
        marginLeft: 20,
    },
    productSaleOffText: {
        fontSize: 14,
        lineHeight: 14,
        textTransform: "uppercase",
        fontWeight: 500,
        color: "red",
    },
    quantityPurchasedAndSold: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
    },
    quantityPurchasedBox: {
        marginLeft: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    quantityPurchasedBtn: {
        alignItems: "center",
        justifyContent: "center",
        borderColor: "rgba(178,172,172,0.1)",
        borderWidth: 1,
        width: 40,
        height: 40,
    },
    quantityPurchasedBtnCenter: {
        width: 60,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    quantitySoldBox: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
    },
    purchaseBox: {
        paddingVertical: 30,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 30,
    },
    btnAddToCart: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 48,
        backgroundColor: "rgb(255,238,232)",
        borderWidth: 1,
        borderColor: "#ee4d2d",
        borderRadius: 2,
        paddingHorizontal: 15,
    },
    btnAddToCartText: {
        marginLeft: 5,
        color: appColor.red,
        fontWeight: 500,

    },
    btnBuyNow: {
        justifyContent: "center",
        backgroundColor: appColor.red,
        height: 48,
        borderRadius: 2,
        paddingHorizontal: 15,
    },
    btnBuyNowText: {
        color: "white",
        fontWeight: 500,
    },
});

export default styles;
