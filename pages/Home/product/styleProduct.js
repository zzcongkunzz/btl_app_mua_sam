import {StyleSheet} from 'react-native';
import appColor from "../../../constant/appColor";

const styles = StyleSheet.create({
    container: {
        // flexDirection: "column",
        alignItems: 'center',
        width: "49%",
        backgroundColor: "#fff",
        borderRadius: 3,
        marginTop: 10,
        borderWidth: 1,
        borderColor: "rgba(175,172,172,0.1)"
    },
    productImage: {
        width: "100%",
        height: 200,
        resizeMode: "stretch",
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },
    productContent: {
        marginTop: 10,
        padding: 5,
        paddingBottom: 10,
    },
    productSell: {
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-between",
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
    productQuantitySold: {
        fontSize: 11
    },
    productFavourite: {
        position: "absolute",
        top: 5,
        left: -4,
        backgroundColor: appColor.red,
        paddingHorizontal: 5,
        borderTopRightRadius: 2,
        borderBottomRightRadius: 2,
    },
    productFavouriteText: {
        color: "white",
        fontSize: 12,
        fontWeight: 500,
        lineHeight: 16,
    },
    productFavouriteBefore: {
        top: 22,
        left: -4,
        position: "absolute",
        borderTopColor: "rgb(171,60,28)",
        borderTopWidth: 5,
        borderLeftColor: "transparent",
        borderLeftWidth: 4,
    },
    productSaleOff: {
        position: "absolute",
        right: -0.2,
        backgroundColor: "rgb(245,221,96)",
        alignItems: "center",
        justifyContent: "center",
        width: 40,
        height: 20,
        borderRadius: 1,
        borderTopRightRadius: 0,
    },
    productSaleOffText: {
        fontSize: 11,
        lineHeight: 14,
        textTransform: "uppercase",
        fontWeight: 500,
        color: "red",
    },
});

export default styles;
