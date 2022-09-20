import { useEffect, useState } from 'react';
import {
    View,
    Alert
} from 'react-native';
import { updateProductByCode } from '../../services/ProductService';
import { getCategories } from '../../services/CategoryService';
import { 
        Button,
        TextInput
} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';

const ProductUpdateScreen = ({route, navigation}) => {

    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        return navigation.addListener('focus', () => {
            getData();
        });
    }, [route]);

    async function getData() {
        const { code, description, price, category } = route.params;
        const currentCategories = await getCategories();
        const categoriesList = currentCategories.map(category => {
            return { label: category.description, value: category.code }
        });
        setCode(code);
        setDescription(description);
        setPrice(price);
        setItems(categoriesList);
        setValue(category);
    }


    async function updateProduct() {
        if (description.length === 0) {
            Alert.alert('Por favor, insira uma descrição.')
            return;
        }

        if (Number(price) <= 0) {
            Alert.alert('Por favor, insira um preço válido.');
            return;
        }
        await updateProductByCode({ code, description, price, category: value });
        Alert.alert('Atualizado com sucesso!');
        navigation.navigate('ProductList');
    }
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

            <Button mode="contained" onPress={() => updateProduct()}>
                Salvar produto
            </Button>
        </View>
    );
};

export default ProductUpdateScreen;