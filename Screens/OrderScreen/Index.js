import { ScrollView, View, Alert } from "react-native";
import React, { useState } from 'react';
import { getProducts, getProductsByCategoryCode } from "../../services/ProductService";
import { getCategories } from "../../services/CategoryService";
import { 
    Card,
    Title,
    Paragraph,
    Button,
    Badge
} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

import { AntDesign } from "@expo/vector-icons";
import styles from "../../styles";

export const OrderScreen = ({ navigation }) => {

    const [orderProducts, setOrderProducts] = useState([]);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [items, setItems] = useState(['TODOS']);

    navigation.addListener('focus', () => {
        getData();
        setValue(0);
    });

    async function getData() {
        const promises = [getProducts(), getCategories()];
        const values = await Promise.all(promises);
        
        const currentProducts = values[0];
        const currentOrderProducts = currentProducts.map(product => {
            product.quantity = 0;
            return product;
        });
        setOrderProducts(currentOrderProducts);
        const currentCategories = values[1];
        const categoriesList = currentCategories.map(category => {
            return { label: category.description, value: category.code }
        });
        categoriesList.push({ label: 'TODOS', value: 0});
        setItems(categoriesList);
    }

    async function getProductsByCategory(categoryCode) {
        let filteredProducts = [];
        if (categoryCode === 0) {
            filteredProducts = await getProducts();
        } else {
            filteredProducts = await getProductsByCategoryCode(categoryCode);
        }

        filteredProducts = filteredProducts.map(product => {
            product.quantity = 0;
            return product;
        });

        setOrderProducts(filteredProducts);
    }

    function addProductToOrder(productCode) {
        const newOrderProducts = orderProducts.map(product => {
            if (product.code === productCode) {
                product.quantity = product.quantity + 1;
            }
            return product;
        });
        setOrderProducts(newOrderProducts);
    }

    function checkout() {
        const hasAnyProduct = orderProducts.some(orderProduct => orderProduct.quantity > 0);
        if (!hasAnyProduct) { 
            Alert.alert('Por favor, selecione ao menos um produto.');
            return;
        }
        const productsWithQuantity = orderProducts.filter(product => product.quantity > 0);

        navigation.navigate('Checkout', {
            products: productsWithQuantity
        });
    }

    return (
        <View style={styles.defaultScreen}>
            <DropDownPicker
                key={'dropdown'}
                placeholder="Filtre por categoria"
                style={{marginBottom: 20}}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onChangeValue={(value) => getProductsByCategory(value)}
            />
            <ScrollView>
                {orderProducts.map((product) => (
                        <Card style={{marginBottom: 20}} key={product.code}>
                            <Card.Content>
                                <Title>{product.description}</Title>
                                <Paragraph>Preço: R$ {product.price}</Paragraph>
                            </Card.Content>
                            <Card.Actions style={{ alignSelf: 'flex-end'}}>
                                <Badge size={40}>{product.quantity}</Badge>
                                <Button onPress={() => {
                                                        addProductToOrder(product.code);
                                                    }}>
                                    <AntDesign name="plus" size={24} color="black" />                 
                                </Button>
                            </Card.Actions>
                        </Card>
                    )
                )}
            <Button style={{marginBottom: 100}}  mode='contained' onPress={() => checkout()}>Fazer pedido</Button>
            </ScrollView>
        </View>
    );
}