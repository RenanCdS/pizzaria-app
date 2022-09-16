import {
    View,
    Text,
    Button
} from 'react-native';

const HomeScreen = ({ navigation }) => {

    return (
        <View>
            <Text>
                This is the HomeScreen
                <Button onPress={() => navigation.navigate('ProductCreation')} title="Ir para página de criação" />
            </Text>
        </View>
    );
}

export default HomeScreen;