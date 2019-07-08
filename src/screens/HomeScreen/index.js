import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { Entypo } from '@expo/vector-icons';
import List from "../../components/List"
import Map from "../../components/Map"


class HomeScreen extends React.Component {


    state = {
        rooms: [],
        isLoading: true,
        mapView: false

    }
    async componentDidMount() {
        const response = await axios.get("https://airbnb-api.now.sh/api/room?city=paris");
        await this.setState({ rooms: response.data.rooms, isLoading: false })


    }
    showRoom = (roomId) => {
        this.props.navigation.navigate({ routeName: "Room", params: roomId });
    }



    render() {


        if (!this.state.mapView) {
            return (<>
                <List onPress={this.showRoom} rooms={this.state.rooms} isLoading={this.state.isLoading} />
                <TouchableOpacity onPress={() => this.setState({ mapView: true })} style={styles.map}><Entypo name="location-pin" color="#006666" size={50} /></TouchableOpacity>
            </>);
        } else {
            return (<>
                <Map rooms={this.state.rooms} isLoading={this.state.isLoading} onPress={this.showRoom} />
                <TouchableOpacity style={styles.cross} onPress={() => this.setState({ mapView: false })}><Entypo name="cross" color="grey" size={20} /></TouchableOpacity>
            </>)
        }

    }
}

const styles = StyleSheet.create({

    map: {
        position: "absolute",
        right: 20,
        top: 10,
        height: 60,
        width: 60,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,

    },
    cross: {
        position: "absolute",
        right: 20,
        top: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    }
})

export default HomeScreen;