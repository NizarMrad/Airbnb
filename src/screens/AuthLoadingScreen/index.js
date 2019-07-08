import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';


class AuthLoadingScreen extends React.Component {
    componentDidMount = async () => {
        const userToken = await AsyncStorage.getItem("userToken");
        const userId = await AsyncStorage.getItem("userId");
        this.props.navigation.navigate(userToken ? "Home" : "Login", { userToken: userToken, userId: userId });
    };

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

export default AuthLoadingScreen;