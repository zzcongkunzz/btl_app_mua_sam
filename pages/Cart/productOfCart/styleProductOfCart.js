import {StyleSheet} from 'react-native';
import appColor from "../../../constant/appColor";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#fff",
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 15,
        alignItems: "center",
        marginBottom: 10,
    },
    productOfCartImage: {
        marginLeft: 10,
        width: 100,
        height: 100,
    },
    content: {
        height: "100%",
        flex: 1,
        marginLeft: 10,
    },
    productOfCartName: {

    },
    productOfCartPriceBox: {
        flexDirection: "row",
        marginTop: 10,
    },
    productOfCartCurrencyUnit: {
        textDecorationLine: "underline",
        color: appColor.red,
        fontSize: 16,
        fontWeight: 500,
    },
    productOfCartPrice: {
        marginLeft: 2,
        color: appColor.red,
        fontSize: 16,
        fontWeight: 500,
    },
    quantityPurchasedBox: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    quantityPurchasedBtn: {
        alignItems: "center",
        justifyContent: "center",
        borderColor: "rgba(178,172,172,0.2)",
        borderWidth: 1,
        width: 30,
        height: 30,
    },
    quantityPurchasedBtnCenter: {
        width: 50,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    deleteBtn: {
        backgroundColor: appColor.red,
        marginLeft: 50,
        height: 30,
        justifyContent: "center",
        paddingHorizontal: 10,
        borderRadius: 3
    },
    deleteBtnText: {
        color: "#fff",
        fontWeight: 500,
    }
});

export default styles;
