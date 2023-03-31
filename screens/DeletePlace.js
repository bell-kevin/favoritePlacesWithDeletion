import React from 'react';
import { View, Text, Button } from 'react-native';
import { deletePlace } from "../util/database";
import { styles } from "../constants/styles";
import { handleDeleteFirstPlace } from "../App";

function DeletePlace({ navigation }) {
    const placeId = navigation.getParam("placeId");

    async function deletePlaceHandler() {
        await deletePlace(placeId);
        navigation.navigate("AllPlaces");
    }

    return (
        <View style={styles.container}>
            <View style={styles.background}>
                <Text style={styles.font}>Are you sure you want to delete this place?</Text>
            </View>
            <Button title="Delete" onPress={deletePlaceHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    font: {
        color: Colors.accent500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    background: {
        backgroundColor: Colors.primary500,
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
});

export default DeletePlace;