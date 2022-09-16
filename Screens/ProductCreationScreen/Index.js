import { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    Alert
} from 'react-native';
import styles from '../../styles';
import { createProduct, getProducts } from '../../services/ProductService';

const ProductCreationScreen = ({ navigation }) => {
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    const registerProduct = async () => {
        await createProduct(description, price);
        Alert.alert('Produto cadastrado com sucesso!');
    };

    const showProducts = async () => {
        const products = await getProducts();
        console.log(products);
    }

    return (
        <View>
            <Text>Código</Text>
            <TextInput
                style={styles.defaultTextInput}
                onChangeText={(code) => setCode(code)}
                value={code}
            />

            <Text>Descrição</Text>
            <TextInput
                style={styles.defaultTextInput}
                onChangeText={(description) => setDescription(description)}
                value={description}
            />

            <Text>Preço</Text>
            <TextInput
                style={styles.defaultTextInput}
                onChangeText={(price) => setPrice(price)}
                keyboardType="numeric"
                value={price}
            />

            <Button title="Cadastrar produto" onPress={() => registerProduct()} />
            <Button title="Get produtos" onPress={() => showProducts()} />
        </View>
    );
}

export default ProductCreationScreen;