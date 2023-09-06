import {ScrollView, View} from "react-native";
import Header from "./Header/header";
import styles from "./styleDefaultLayout";
import Footer from "./Footer/footer";


function DefaultLayout({children}){
    return(
        <View
            style={styles.container}
        >
            <Header></Header>
            <ScrollView>
                {children}
                {children}
                {children}
                {children}
                {children}
                {children}
                {children}
            </ScrollView>
            <Footer></Footer>
        </View>
    );
}

export default DefaultLayout
