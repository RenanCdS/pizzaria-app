import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { Badge } from 'react-native-paper';
import { styles } from './styles';
import { getOrders } from '../../services/OrderService';
import defaultStyles from '../../styles';

export const OrderListScreen = ({ navigation }) => {
    const [orders, setOrders] = useState([]);

    navigation.addListener('focus', () => {
        getData();
    });

    async function getData() {
        const currentOrders = await getOrders();
        setOrders(currentOrders);
    }

    return (
        <ScrollView style={defaultStyles.defaultScreen}>
            {orders.map(order => (
                <Card style={styles.cardStyle} key={order.code}>
                    <Card.Title title={'Pedido Nº ' + order.code} />
                    <Card.Content>
                        <Title style={{fontSize: 16}}>Produtos</Title>
                        {order.products.map(product => (
                            <View style={styles.cardRow} key={product.code}>
                                <Text> {product.description} </Text>
                                <Badge size={30}> {product.quantity} </Badge>
                            </View>
                        ))}
                        
                        <View style={styles.cardRow}>
                            <Text style={{fontWeight: 'bold'}}>Total: R$ {order.products.reduce((p, c) => {
                                return p + (c.quantity * Number(c.price));
                            }, 0)} </Text>
                        </View>
                    </Card.Content>
                </Card>
            ))}
        </ScrollView>
    )
};