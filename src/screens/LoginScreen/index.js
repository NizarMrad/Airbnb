import React from "react";
import { Text, StyleSheet, Dimensions, StatusBar, TextInput, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import axios from "axios";
import { Ionicons } from '@expo/vector-icons';
import { AsyncStorage } from "react-native";
import { Location, Permissions } from "expo";


class LoginScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return { header: null }
    }
    state = {
        email: "arno@airbnb-api.com",
        password: "password01",
        location: ""
    }
    handleChange = async (text, name) => {
        const objToUpdate = {};
        objToUpdate[name] = text;
        await this.setState(objToUpdate);


    }

    handlePress = async () => {

        const response = await axios.post("https://airbnb-api.now.sh/api/user/log_in", { email: this.state.email, password: this.state.password })

        await AsyncStorage.setItem("userToken", response.data.token)
        await AsyncStorage.setItem("userId", response.data._id)
        const token = await AsyncStorage.getItem("userToken");
        const id = await AsyncStorage.getItem("userId")

        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
            this.setState({
                errorMessage: "Permission refusée"
            });
        } else {
            const location = await Location.getCurrentPositionAsync({});
            this.setState({
                location: location
            });
        }

        this.props.navigation.navigate("Home", { userId: id, userToken: token });
    }

    render() {
        return (
            <>

                <KeyboardAvoidingView style={styles.container} enabled behavior="padding">
                    <StatusBar barStyle="light-content" />
                    <Ionicons name="md-home" color="white" size={100} />
                    <Text style={styles.welcomeText}>Welcome</Text>
                    <TextInput autoCapitalize="none" keyboardType="email-address" placeholderTextColor="white" placeholder="email" style={styles.textInput} onChangeText={(text) => this.handleChange(text, "email")} value={this.state.email} />
                    <TextInput placeholder="password" placeholderTextColor="white" secureTextEntry style={styles.textInput} onChangeText={(text) => this.handleChange(text, "password")} value={this.state.password} />
                    <TouchableOpacity style={styles.button} onPress={() => this.handlePress()}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.signUp} onPress={() => this.props.navigation.navigate("Signup")}><Text style={{ color: "blue" }}>Don`t have an account yet? Sign-up here</Text></TouchableOpacity>
                </KeyboardAvoidingView >

            </>)
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#FF5B5E',
        height: Dimensions.get("screen").height,
    },
    welcomeText: {

        color: "white",
        fontSize: 40,
        fontWeight: "200",
        paddingBottom: 50,
        paddingTop: 50
    },
    textInput: {
        color: "white",
        fontSize: 25,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "white",

        width: "70%",
        fontWeight: "100",
        textAlign: "center"
    },
    button: {
        backgroundColor: "white",
        borderRadius: 30,
        width: 100,
        padding: 10,
        marginTop: 30
    },

    buttonText: {
        color: '#FF5B5E',
        fontSize: 30,
        textAlign: "center",
    },
    signUp: {
        paddingTop: 30,

    }

})

export default LoginScreen;