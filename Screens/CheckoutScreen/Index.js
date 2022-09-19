import { useEffect, useState } from "react";
import { Alert, Text } from 'react-native';
import { Card, Title, Paragraph, Badge, Button } from 'react-native-paper';
import { ScrollView } from "react-native-gesture-handler";
import { createOrder, getOrders } from "../../services/OrderService";

export const CheckoutScreen = ({route, navigation}) => {

    const [orderProducts, setOrderProducts] = useState([]);

    navigation.addListener('focus', () => {
        const {products} = route.params;
        setOrderProducts(products); 
    });

    async function finishOrder() {
        // await createOrder(orderProducts);
        await getOrders();


        Alert.alert('Pedido criado com sucesso!');
    }

    return (
        <ScrollView>
            {orderProducts.map((product) => (
                        <Card style={{marginBottom: 20}} key={product.code}>
                            <Card.Content>
                                <Title>{product.description}</Title>
                                <Paragraph>Preço: R$ {product.price}</Paragraph>
                            </Card.Content>
                            <Card.Actions style={{ alignSelf: 'flex-end'}}>
                                <Badge size={40}>{product.quantity}</Badge>
                            </Card.Actions>
                        </Card>
                    )
                )}

            <Text>
                Total: R$ {orderProducts.reduce((p, c) => {
                            return p + c.quantity * Number(c.price);}, 0)}
            </Text>

            <Button mode="contained" onPress={() => finishOrder()}>Finalizar pedido</Button>
        </ScrollView>
    )
}
