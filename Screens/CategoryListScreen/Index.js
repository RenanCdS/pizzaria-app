import { useEffect, useState } from 'react';
import { ScrollView, Alert} from 'react-native';
import { 
    Card,
    Title,
    Button,
    IconButton,
} from 'react-native-paper';
import { AntDesign } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native"
import { getCategories, removeCategoryByCode } from '../../services/CategoryService';

const CategoryListScreen = ({navigation}) => {
    const [categories, setCategories] = useState([]);

    useFocusEffect(() => {
        getData();
    });

    async function getData() {
        const currentCategories = await getCategories();
        setCategories(currentCategories);
    }

    function editCategory (category) {
        navigation.navigate('CategoryUpdate', { 
            code: category.code,
            description: category.description
        });
    }

    function removeCategory (code) {
        Alert.alert("Atenção", "Confirma a remoção da categoria ?", [
            {
              text: "Sim",
              onPress: () => { 
                removeCategoryByCode(code);
                let newCategories = categories.filter(category => category.code !== code);
                setCategories(newCategories);
              },
            },
            {
              text: "Não",
              style: "cancel",
            },
          ]);
    }
    return (
        <ScrollView>
            {categories.map((category) => (
                    <Card style={{marginBottom: 20}} key={category.code}>
                        <Card.Content>
                            <Title>{category.description}</Title>
                        </Card.Content>
                        <Card.Actions style={{ alignSelf: 'flex-end'}}>
                            <Button onPress={() => {
                                                    editCategory(category);
                                                }}>
                                <AntDesign name="edit" size={24} color="black" />
                            </Button>
                            <Button onPress={() => {
                                                    removeCategory(category.code);
                                                }}>
                                <AntDesign name="delete" size={24} color="black" />                 
                            </Button>
                        </Card.Actions>
                    </Card>
                )
            )}
            <IconButton
                style={{alignSelf: 'flex-end'}}
                icon='plus-circle'
                mode='contained'
                color='#00f'
                size={60}
                onPress={() => navigation.navigate('CategoryCreation')}
            />
        </ScrollView>
    );
};

export default CategoryListScreen;