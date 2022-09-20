import { useEffect, useState } from 'react';
import { ScrollView, Alert} from 'react-native';
import { 
    Card,
    Title,
    Paragraph,
    Button,
    IconButton,
    MD3Colors
} from 'react-native-paper';
import { getProducts, removeProductByCode} from '../../services/ProductService';
import { AntDesign } from "@expo/vector-icons";

const ProductListScreen = ({navigation}) => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        return navigation.addListener('focus', () => {
            getData();
        });
    }, []);

    async function getData() {
        const currentProducts = await getProducts();
        setProducts(currentProducts);
    }

    function removeProduct(code) {
        Alert.alert("Atenção", "Confirma a remoção do produto ?", [
            {
              text: "Sim",
              onPress: () => { 
                removeProductByCode(code);
                let newProducts = products.filter(product => product.code !== code);
                setProducts(newProducts);
              },
            },
            {
              text: "Não",
              style: "cancel",
            },
          ]);
    }

    function editProduct(product) {
        navigation.navigate('ProductUpdate', { 
            code: product.code,
            description: product.description,
            price: product.price,
            category: product.category
        });
    }

    return (
            <ScrollView>
                {products.map((product) => (
                        <Card style={{marginBottom: 20}} key={product.code}>
                            <Card.Content>
                                <Title>{product.description}</Title>
                                <Paragraph>R$ {product.price}</Paragraph>
                            </Card.Content>
                            <Card.Actions style={{ alignSelf: 'flex-end'}}>
                                <Button onPress={() => {
                                                        editProduct(product);
                                                    }}>
                                    <AntDesign name="edit" size={24} color="black" />
                                </Button>
                                <Button onPress={() => {
                                                        removeProduct(product.code);
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
                    onPress={() => navigation.navigate('ProductCreation')}
                />
            </ScrollView>
    );
};

export default ProductListScreen;