import {ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import styles from "./styleProductHeader";
import {useEffect, useState} from "react";
import {AntDesign, MaterialIcons} from '@expo/vector-icons';
import DATA_CATEGORY from "../../../constant/dataCategory";

function ProductHeader() {
    const [productHeaderItemFollow, setProductHeaderItemFollow] = useState('Sort By New');
    const [priceIncreasesDecreases, setPriceIncreasesDecreases] = useState(false);
    const [productHeaderCategoryFollow, setProductHeaderCategoryFollow] = useState(false);
    const [categoryExpandMore, setCategoryExpandMore] = useState(false);
    const [categorySelected, setCategorySelected] = useState([]);


    useEffect(() => {
        if (productHeaderItemFollow !== 'Sort By Price') {
            setPriceIncreasesDecreases(false);
        }
    }, [productHeaderItemFollow])

    const handleOnPressSortByNew = () => {
        setProductHeaderItemFollow('Sort By New');
        if(categoryExpandMore){
            handleOnPressCategory();
        }

    }

    const handleOnPressSortByBestseller = () => {
        setProductHeaderItemFollow('Sort By Bestseller');
        if(categoryExpandMore){
            handleOnPressCategory();
        }

    }

    const handleOnPressSortByPrice = () => {
        if (productHeaderItemFollow === 'Sort By Price') {
            setPriceIncreasesDecreases(!priceIncreasesDecreases);
        }
        setProductHeaderItemFollow('Sort By Price');
        if(categoryExpandMore){
            handleOnPressCategory();
        }
    }

    const handleOnPressCategory = () => {
        if(categoryExpandMore === false){
            setProductHeaderCategoryFollow(true);
        }
        else if(categorySelected.length === 0){
            setProductHeaderCategoryFollow(false);
        }
        setCategoryExpandMore(!categoryExpandMore);
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
                            productHeaderItemFollow === 'Sort By New' && styles.productHeaderItemFollowText
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
                            productHeaderItemFollow === 'Sort By Bestseller' && styles.productHeaderItemFollowText
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
                            productHeaderItemFollow === 'Sort By Price' && styles.productHeaderItemFollowText
                        ]}
                    >Giá</Text>
                    <View
                        style={[styles.productHeaderItemIcon]}
                    >
                        {priceIncreasesDecreases ?
                            <AntDesign name="arrowdown" size={20} color="red"/> :
                            <AntDesign name="arrowup" size={20}
                                       color={productHeaderItemFollow === 'Sort By Price' ? "red" : "black"}/>
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
                            productHeaderCategoryFollow && styles.productHeaderItemFollowText
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
                                    {DATA_CATEGORY?.map((item) => {
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
