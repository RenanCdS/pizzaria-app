import { useEffect, useState } from 'react';
import {
    View,
    Alert
} from 'react-native';
import { updateProductByCode } from '../../services/ProductService';
import { 
        Button,
        TextInput
} from 'react-native-paper';


const ProductUpdateScreen = ({route, navigation}) => {

    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    useEffect(() => {
        const { code, description, price } = route.params;
        setCode(code);
        setDescription(description);
        setPrice(price);
    }, []);


    async function updateProduct() {
        await updateProductByCode({ code, description, price });
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

            <Button mode="contained" onPress={() => updateProduct()}>
                Salvar produto
            </Button>
        </View>
    );
};

export default ProductUpdateScreen;