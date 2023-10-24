import {Image, ScrollView, View} from "react-native";
import styles from "./styleHome";
import ProductHeader from "./ProductHeader/productHeader";
import Product from "./Product/product";
import {useFindProductByCriteriaMutation, useLoginMutation} from "../../stores/API/service";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {storeSlice} from "../../stores/StoreReducer";
import SORT_TYPE from "../../constant/sortType";
import {useSearchParams} from "react-router-native";

function Home() {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const listProduct = useSelector((state) => state.storeReducer.listProduct);
    const criteria = useSelector((state) => state.storeReducer.criteria);
    const pageHistory = useSelector((state) => state.storeReducer.pageHistory);
    // API
    const [findProductByCriteria, findProductByCriteriaResult] = useFindProductByCriteriaMutation();

    useEffect(() => {
        const getData = async () => {
            await findProductByCriteria({
                nameProductOrCategory: searchParams.get('nameProductOrCategory'),
                category: [],
                sortBy: SORT_TYPE.NEW,
            }).unwrap()
                .then((originalPromiseResult) => {
                    dispatch(storeSlice.actions.setListProduct(originalPromiseResult.listProduct));
                    dispatch(storeSlice.actions.setCriteria({
                        nameProductOrCategory: null,
                        category: [],
                        sortBy: SORT_TYPE.NEW,
                    }));

                })
                .catch((ex) => {
                    console.log("Exception: ,", ex)
                })
        }
        getData();
    }, [pageHistory]);

    return (
        <View
            style={styles.container}
        >
            <ScrollView
                contentContainerStyle={styles.containerScrollView}
            >
                <Image
                    style={styles.banner}
                    source={require("../../assets/img/banner.png")}
                ></Image>
                <View
                    style={styles.listProduct}
                >
                    {listProduct?.map((product) => {
                        // console.log("home/product: ", product);
                        return (
                            <Product
                                key={"product: " + product.id}
                                value={product}
                            ></Product>
                        );
                    })}
                </View>

            </ScrollView>
            <ProductHeader></ProductHeader>

        </View>
    );
}

export default Home
