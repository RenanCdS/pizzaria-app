import { useState, useEffect } from 'react';
import {
    View,
    Alert
} from 'react-native';
import { createProduct } from '../../services/ProductService';
import { getCategories } from '../../services/CategoryService';
import { 
        Button,
        TextInput
} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

const ProductCreationScreen = ({ navigation }) => {
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    navigation.addListener('focus', () => {
        getData();
    });

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const currentCategories = await getCategories();
        const categoriesList = currentCategories.map(category => {
            return { label: category.description, value: category.code }
        });
        setItems(categoriesList);
    }

    const registerProduct = async () => {
        if (!isProductValid()) {
            return;
        }
        await createProduct(description, price, value);
        Alert.alert('Produto cadastrado com sucesso!');
    };

    const isProductValid = () => {
        if (description.length == 0) {
            Alert.alert('Descrição inválida.');
            return false;
        }

        if (price <= 0) {
            Alert.alert('Preço inválido.');
            return false;
        }

        if (value === null || value === undefined) {
            Alert.alert('Categoria inválida.');
            return false;
        }

        return true;
    };

    return (
        <View>
            <TextInput
                label="Descrição"
                onChangeText={(description) => setDescription(description)}
                value={description}
            />

            <TextInput
                style={{marginBottom: 20}}
                label="Preço"
                onChangeText={(price) => setPrice(price)}
                keyboardType="numeric"
                value={price}
            />

            <DropDownPicker
                style={{marginBottom: 20}}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
            />

            <Button mode="contained" onPress={() => registerProduct()}>
                Salvar produto
            </Button>
        </View>
    );
}

export default ProductCreationScreen;