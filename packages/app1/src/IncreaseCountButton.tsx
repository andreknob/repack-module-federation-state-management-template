import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
// @ts-ignore
// import useStore from 'host/Store';

const IncreaseCountButton = ({ increase, count }) => {
    // const { increase, count } = useStore();

    return (
        <TouchableOpacity style={styles.container} onPress={() => increase(1)}>
            <Text>Increase count from app1: {count}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'lightgray',
        marginTop: 20,
        padding: 5
    }
});


export default IncreaseCountButton;
