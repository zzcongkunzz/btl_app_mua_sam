import {ScrollView, View} from "react-native";
import Header from "../../component/Header/header";
import styles from "./styleLayoutWithoutFooter";
import Footer from "../../component/Footer/footer";


function LayoutWithoutHeader({children}) {
    return (
        <View
            style={styles.container}
        >
            <Header></Header>
            <ScrollView
                contentContainerStyle={{flex: 1,}}
            >
                {children}
            </ScrollView>
        </View>
    );
}

export default LayoutWithoutHeader
