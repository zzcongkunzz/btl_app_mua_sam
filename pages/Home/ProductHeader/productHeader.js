import {ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import styles from "./styleProductHeader";
import {useEffect, useState} from "react";
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import DATA_CATEGORY from "../../../constant/dataCategory";
import {useDispatch, useSelector} from "react-redux";
import SORT_TYPE from "../../../constant/sortType";
import {storeSlice} from "../../../stores/StoreReducer";
import {useFindProductByCriteriaMutation, useGetCategoryMutation} from "../../../stores/API/service";

function ProductHeader() {
    const dispatch = useDispatch();

    const listProduct = useSelector((state) => state.storeReducer.listProduct);
    const criteria = useSelector((state) => state.storeReducer.criteria);

    // const [productHeaderItemFollow, setProductHeaderItemFollow] = useState(SORT_TYPE.NEW);
    const [priceIncreasesDecreases, setPriceIncreasesDecreases] = useState(false);
    const [productHeaderCategoryFollow, setProductHeaderCategoryFollow] = useState(false);
    const [categoryExpandMore, setCategoryExpandMore] = useState(false);
    const [categorySelected, setCategorySelected] = useState(criteria.category);
    const [listCategory, setListCategory] = useState([]);


    // API
    const [findProductByCriteria, findProductByCriteriaResult] = useFindProductByCriteriaMutation();
    const [getCategory, getCategoryResult] = useGetCategoryMutation();

    useEffect(() => {
        const getDataCategory = async () => {
            await getCategory({

            }).unwrap()
                .then((originalPromiseResult) => {
                    setListCategory(originalPromiseResult.listCategory);
                })
                .catch((ex) => {
                    console.log("Exception: ,", ex)
                })
        }
        getDataCategory();
    }, []);

    useEffect(() => {
        if(criteria.category.length === 0){
            setCategorySelected([]);
            setProductHeaderCategoryFollow(false);
        }

    }, [criteria.category]);


    const handleOnPressSortByNew = async () => {

        dispatch(storeSlice.actions.setCriteria({
            ...criteria,
            sortBy: SORT_TYPE.NEW,
        }));

        // setProductHeaderItemFollow('Sort By New');
        if (categoryExpandMore) {
            handleOnPressCategory();
        }

    }

    const handleOnPressSortByBestseller = async () => {

        dispatch(storeSlice.actions.setCriteria({
            ...criteria,
            sortBy: SORT_TYPE.HOT_SELLING,
        }));


        if (categoryExpandMore) {
            handleOnPressCategory();
        }

    }

    const handleOnPressSortByPrice = async () => {

        let sortPrice = SORT_TYPE.PRICE_ASC;

        if(criteria.sortBy === SORT_TYPE.PRICE_ASC){
            sortPrice = SORT_TYPE.PRICE_DESC;
        }
        else if(criteria.sortBy === SORT_TYPE.PRICE_DESC){
            sortPrice = SORT_TYPE.PRICE_ASC;
        }

        dispatch(storeSlice.actions.setCriteria({
            ...criteria,
            sortBy: sortPrice,
        }));

        if (categoryExpandMore) {
            handleOnPressCategory();
        }
    }

    const handleOnPressCategory = async () => {
        if (categoryExpandMore === false) {
            setProductHeaderCategoryFollow(true);
        } else if (categorySelected.length === 0) {
            setProductHeaderCategoryFollow(false);
        }
        const temp = !categoryExpandMore

        //khi đóng category
        if (temp === false) {
            dispatch(storeSlice.actions.setCriteria({
                ...criteria,
                category: categorySelected,
            }));

        }

        setCategoryExpandMore(temp);
    }

    const handleOnPressCategoryItem = (item) => {
        const index = categorySelected?.indexOf(item.name);
        const updatedCategories = [...categorySelected];
        if (index > -1) {
            // console.log("updatedCategories", updatedCategories);
            updatedCategories.splice(index, 1)
            setCategorySelected(updatedCategories);
            // console.log("updatedCategories", updatedCategories);
        } else {
            setCategorySelected([...categorySelected, item.name]);
        }
    }

    return (
        <View
            style={styles.container}
        >
            <View
                style={styles.listProductHeaderItem}
            >
                <TouchableOpacity
                    style={[styles.productHeaderItem,]}
                    onPress={handleOnPressSortByNew}
                >
                    <Text
                        style={[
                            criteria.sortBy === SORT_TYPE.NEW && styles.productHeaderItemFollowText
                        ]}
                    >Mới nhất</Text>
                </TouchableOpacity>
                <View style={[styles.splittingLine,]}></View>
                <TouchableOpacity
                    style={[styles.productHeaderItem]}
                    onPress={handleOnPressSortByBestseller}
                >
                    <Text
                        style={[
                            criteria.sortBy === SORT_TYPE.HOT_SELLING && styles.productHeaderItemFollowText
                        ]}
                    >Bán chạy</Text>
                </TouchableOpacity>
                <View style={[styles.splittingLine,]}></View>
                <TouchableOpacity
                    style={[styles.productHeaderItem]}
                    onPress={handleOnPressSortByPrice}
                >
                    <Text
                        style={[
                            (criteria.sortBy === SORT_TYPE.PRICE_ASC || criteria.sortBy === SORT_TYPE.PRICE_DESC) && styles.productHeaderItemFollowText
                        ]}
                    >Giá</Text>
                    <View
                        style={[styles.productHeaderItemIcon]}
                    >
                        {criteria.sortBy === SORT_TYPE.PRICE_DESC ?
                            <AntDesign name="arrowdown" size={20} color="red"/> :
                            criteria.sortBy === SORT_TYPE.PRICE_ASC ?
                                <AntDesign name="arrowup" size={20} color="red"/> :
                                <AntDesign name="arrowup" size={20} color="black"/>
                        }
                    </View>
                </TouchableOpacity>
                <View style={[styles.splittingLine,]}></View>
                <TouchableOpacity
                    style={[styles.productHeaderItem]}
                    onPress={handleOnPressCategory}
                >
                    <Text
                        style={[
                            (productHeaderCategoryFollow) && styles.productHeaderItemFollowText
                        ]}
                    >{} Danh mục</Text>

                    <View
                        style={[styles.productHeaderItemIcon]}
                    >
                        {categoryExpandMore ?
                            <MaterialIcons name="expand-more" size={20}
                                           color={productHeaderCategoryFollow ? "red" : "black"}/> :
                            <MaterialIcons name="expand-less" size={20}
                                           color={productHeaderCategoryFollow ? "red" : "black"}/>
                        }
                    </View>
                </TouchableOpacity>
            </View>

            {/*list category*/}
            {categoryExpandMore &&
                <TouchableWithoutFeedback
                    onPress={handleOnPressCategory}
                >
                    <View
                        style={[styles.listCategoryContainer]}
                    >
                        <TouchableWithoutFeedback>
                            <View
                                style={[styles.listCategory]}
                            >
                                <ScrollView
                                    contentContainerStyle={[styles.listCategoryScrollView]}
                                >
                                    {listCategory?.map((item) => {
                                        return (
                                            <TouchableOpacity
                                                key={`category item ${item.id}`}
                                                style={[
                                                    styles.categoryItem,
                                                    categorySelected?.includes(item.name) && styles.categoryItemFollow
                                                ]}
                                                onPress={() => handleOnPressCategoryItem(item)}
                                            >
                                                <Text
                                                    style={[
                                                        styles.categoryItemText,
                                                        categorySelected?.includes(item.name) && styles.categoryItemTextFollow
                                                    ]}
                                                >{item.name}</Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            }

        </View>
    );
}

export default ProductHeader
