import React from "react";
import { Text, StyleSheet, Dimensions, TextInput, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import axios from "axios";
import { AsyncStorage } from "react-native";


class SignupScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return { headerStyle: { backgroundColor: '#FF5B5E' }, headerTitle: "Sign-up", headerTitleStyle: { color: "white", fontSize: 25, fontWeight: "300" }, headerTintColor: "white" }
    }

    state = {
        email: "",
        password: "",
        username: "",
        name: "",
        description: ""

    }
    handleChange = async (text, name) => {
        const update = {};
        update[name] = text;
        await this.setState(update);


    }

    handlePress = async () => {

        const response = await axios.post("https://airbnb-api.now.sh/api/user/sign_up", this.state)

        await AsyncStorage.setItem("userToken", response.data.token)
        await AsyncStorage.setItem("userId", response.data._id)
        const token = await AsyncStorage.getItem("userToken");
        const id = await AsyncStorage.getItem("userId")

        this.props.navigation.navigate("Home", { userId: id, userToken: token });
    }

    render() {
        return (<><KeyboardAvoidingView style={styles.container} enabled behavior="padding">


            <Text>Email</Text>
            <TextInput autoCapitalize="none" keyboardType="email-address" style={styles.textInput} onChangeText={(text) => this.handleChange(text, "email")} value={this.state.email} />
            <Text>Password</Text>
            <TextInput secureTextEntry style={styles.textInput} onChangeText={(text) => this.handleChange(text, "password")} value={this.state.password} />
            <Text>Username</Text>
            <TextInput autoCapitalize="none" style={styles.textInput} onChangeText={(text) => this.handleChange(text, "username")} value={this.state.username} />
            <Text>Name</Text>
            <TextInput autoCapitalize="none" style={styles.textInput} onChangeText={(text) => this.handleChange(text, "name")} value={this.state.name} />
            <Text>Tell us about yourself</Text>
            <TextInput autoCapitalize="none" multiline={true} style={styles.textInput} onChangeText={(text) => this.handleChange(text, "description")} value={this.state.description} />
            <TouchableOpacity style={styles.button} onPress={() => this.handlePress()}><Text style={styles.buttonText}>Sign-up</Text></TouchableOpacity>



        </KeyboardAvoidingView >
        </>)
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white',
        height: Dimensions.get("screen").height,
    },
    welcomeText: {

        color: "black",
        fontSize: 40,
        fontWeight: "200",
        paddingBottom: 50,
        paddingTop: 50
    },
    textInput: {
        color: "black",
        fontSize: 25,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#FF5B5E',

        width: "70%",
        fontWeight: "100",
        textAlign: "center"
    },
    button: {
        backgroundColor: '#FF5B5E',
        borderRadius: 30,
        width: 200,
        padding: 10,
        marginTop: 30
    },

    buttonText: {
        color: 'white',
        fontSize: 30,
        textAlign: "center",
    },
    signUp: {
        paddingTop: 30,

    }

})

export default SignupScreen;