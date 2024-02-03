import {ScrollView, View} from "react-native";
import Header from "../../component/Header/header";
import styles from "./styleLayoutWithoutHeader";
import Footer from "../../component/Footer/footer";


function LayoutWithoutHeader({children}) {
    return (
        <View
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={{flex: 1,}}
            >
                {children}
            </ScrollView>
            <Footer></Footer>
        </View>
    );
}

export default LayoutWithoutHeader
