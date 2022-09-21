import { useState } from "react";
import { Alert } from 'react-native';
import { Card, Title, Paragraph, Badge, Button } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";
import { createOrder } from "../../services/OrderService";
import styles from "../../styles";

export const CheckoutScreen = ({route, navigation}) => {

    const [orderProducts, setOrderProducts] = useState([]);

    navigation.addListener('focus', () => {
        const {products} = route.params;
        setOrderProducts(products); 
    });

    async function finishOrder() {
        await createOrder(orderProducts);

        Alert.alert('Pedido criado com sucesso!');
        navigation.navigate('OrderList');
    }

    return (
        <ScrollView style={styles.defaultScreen}>
            {orderProducts.map((product) => (
                        <Card style={{marginBottom: 20}} key={product.code}>
                            <Card.Content>
                                <Title>{product.description}</Title>
                                <Paragraph style={{fontWeight: 'bold'}}>Preço: R$ {product.price}</Paragraph>
                            </Card.Content>
                            <Card.Actions style={{ alignSelf: 'flex-end'}}>
                                <Badge size={40}>{product.quantity}</Badge>
                            </Card.Actions>
                        </Card>)
                )}

            <Title>
                Total: R$ {orderProducts.reduce((p, c) => {
                            return p + c.quantity * Number(c.price);}, 0)}
            </Title>

            <Button mode="contained" onPress={() => finishOrder()}>Finalizar pedido</Button>
        </ScrollView>
    )
}
