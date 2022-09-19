import { useState } from 'react';
import {
    View,
    Alert
} from 'react-native';
import { createCategory } from '../../services/CategoryService';
import { 
        Button,
        TextInput
} from 'react-native-paper';

const CategoryCreationScreen = ({navigation}) => {

    const [description, setDescription] = useState('');
    const registerCategory = async () => {
        if (!isCategoryValid()) {
            return;
        }
        await createCategory(description);
        Alert.alert('Categoria cadastrada com sucesso!');
    };

    const isCategoryValid = () => {
        if (description.length == 0) {
            Alert.alert('Descrição inválida.');
            return false;
        }

        return true;
    };

    return (
        <View>
            <TextInput
                style={{marginBottom: 20}}
                label="Descrição"
                onChangeText={(description) => setDescription(description)}
                value={description}
            />

            <Button mode="contained" onPress={() => registerCategory()}>
                Salvar categoria
            </Button>
        </View>
    );
}

export default CategoryCreationScreen;