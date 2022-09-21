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
import styles from '../../styles';


export const CategoryUpdateScreen = ({ route, navigation }) => {
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const { code, description } = route.params;
        setCode(code);
        setDescription(description);
    }, [route]);

    async function updateCategory() {
        await updateCategoryByCode({ code, description });
        Alert.alert('Atualizado com sucesso!');
        navigation.navigate('CategoryList');
    }

    return (
        <View style={styles.defaultScreen}>
            <TextInput
                label="Descrição"
                onChangeText={(description) => setDescription(description)}
                value={description}
            />

            <Button mode="contained" style={{marginTop: 20}} onPress={() => updateCategory()}>
                Salvar categoria
            </Button>
        </View>
    );
};