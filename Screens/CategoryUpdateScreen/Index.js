import { useEffect, useState } from 'react';
import {
    View,
    Alert
} from 'react-native';
import { updateCategoryByCode } from '../../services/CategoryService';
import { 
        Button,
        TextInput
} from 'react-native-paper';


export const CategoryUpdateScreen = ({ route, navigation }) => {
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const { code, description } = route.params;
        setCode(code);
        setDescription(description);
    }, []);

    async function updateCategory() {
        await updateCategoryByCode({ code, description });
        Alert.alert('Atualizado com sucesso!');
        navigation.navigate('CategoryList');
    }

    return (
        <View>
            <TextInput
                label="Descrição"
                onChangeText={(description) => setDescription(description)}
                value={description}
            />

            <Button mode="contained" onPress={() => updateCategory()}>
                Salvar categoria
            </Button>
        </View>
    );
};