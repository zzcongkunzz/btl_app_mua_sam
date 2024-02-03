import {StyleSheet} from 'react-native';
import appColor from "../../constant/appColor";

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        // width: "100%",
        height: "100%",
        backgroundColor: "rgba(178,172,172,0.2)",
        marginTop: 40,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderBottomWidth: 2,
        backgroundColor: "#fff",
        borderColor: "rgba(33,29,29,0.05)",
    },
    btnComeBack: {
        // borderWidth: 1,
        // borderColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        // backgroundColor: "red",
    },
    cartText: {
        marginLeft: 20,
        fontSize: 20,

    },
    listProduct: {
        width: "100%",
    },
    footer: {
        backgroundColor: "white",
        height: 100,
        borderColor: "rgba(33,29,29,0.05)",
        borderTopWidth: 2,
        marginBottom: 40,
    },
    transportationCostContent: {
        flexDirection: "row",
        // backgroundColor: "#26aa99",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    transportationCostText:{
        color: "#26aa99",
    },
    transportationCostBox: {
        flexDirection: "row",
    },
    transportationCostCurrencyUnit: {
        textDecorationLine: "underline",
        color: "#26aa99",
        fontSize: 14,
        fontWeight: 500,
    },
    transportationCost: {
        marginLeft: 2,
        color: "#26aa99",
        fontSize: 14,
        fontWeight: 500,
    },
    pay: {
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
        borderTopWidth: 0.5,
        borderColor:  "rgb(238,235,235)",
        // backgroundColor: "#000"
    },
    checkAllProductContent: {
        paddingLeft: 15,
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor: "#000",
    },
    checkAllProduct:{
        width: 20,
        height: 20,
    },
    checkAllProductText: {
        marginLeft: 5,
        color:  "rgb(128,125,125)",
    },
    totalCostContent: {
        flexDirection: "row",
    },
    totalCostBox: {
        flexDirection: "row",
        marginHorizontal: 5,
    },
    totalCostCurrencyUnit: {
        textDecorationLine: "underline",
        color: appColor.red,
        fontSize: 14,
        fontWeight: 500,
    },
    totalCost: {
        marginLeft: 2,
        color: appColor.red,
        fontSize: 14,
        fontWeight: 500,
    },
    btnBuyProduct: {
        backgroundColor: appColor.red,
        width: 120,
        alignItems: "center",
        justifyContent: "center"
    },
    btnBuyProductText:{
        fontWeight: 500,
        color: "white"
    }
});

export default styles;
