import {ScrollView, View} from "react-native";
import Header from "../../component/Header/header";
import styles from "./styleDefaultLayout";
import Footer from "../../component/Footer/footer";


function DefaultLayout({children}) {
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
            <Footer></Footer>
        </View>
    );
}

export default DefaultLayout
