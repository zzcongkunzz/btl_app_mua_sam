import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        // flexDirection: "column",
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: "rgba(178,172,172,0.2)",
        width: "100%",
        height: "100%",
        // backgroundColor: "#854747"

    },
    containerScrollView: {
        // width: "100%",
        // height: "100%",
    },
    banner: {
        marginTop: 45,
        marginBottom: 10,
        width: "100%",
        resizeMode: 'stretch',
    },
    listProduct: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 8,
        flexWrap: "wrap",
        // paddingHorizontal: 5,
    },

});

export default styles;
