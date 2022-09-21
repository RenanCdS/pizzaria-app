import {
    View,
    Text
} from 'react-native';

import { Button } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {

    return (
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
            <Text>
                <Button mode='contained' onPress={() => navigation.navigate('ProductList')}>
                    Entrar no App
                </Button>
            </Text>
        </View>
    );
}

export default HomeScreen;