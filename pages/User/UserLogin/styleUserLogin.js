import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        height: "100%",
        marginTop: 40,
    },
    accountInformationText: {
        textAlign: "center",
        fontSize: 24,
        paddingVertical: 30,
    },
    line: {
        borderTopWidth: 1,
        borderColor: "rgba(0,0,0,0.1)",
        paddingHorizontal: 10,
        height: 65,
        paddingVertical: 10,
    },
    accountInformation: {
        flexDirection: "row",
        alignItems: "center",
    },
    lineTextInput: {
        flex: 1,
    },
    btn: {
        marginTop: 40,
        marginHorizontal: 30,
    },
    disabledBtnSaveInformation: {
        opacity: 0.5,
    }
});

export default styles;
