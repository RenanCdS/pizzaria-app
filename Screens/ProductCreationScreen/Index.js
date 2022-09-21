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
import styles from '../../styles';

const ProductCreationScreen = ({ navigation }) => {
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const [items, setItems] = useState([]);

    useEffect(() => {
        return navigation.addListener('focus', () => {
            getData();
            setValue(null);
            setDescription('');
            setPrice(0);
        });
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

        if (value === null || value === undefined || value === 0) {
            Alert.alert('Categoria inválida.');
            return false;
        }

        return true;
    };

    return (
        <View style={styles.defaultScreen}>
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