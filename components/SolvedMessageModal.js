import React from "react";
import { Dimensions, Modal, StyleSheet, Text, View } from 'react-native';
import CloseIcon from "./CloseIcon";
import NailedItIcon from "./NailedItIcon";

const SolvedMessageModal = ({ isVisible, movesCount, onClose }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}>
            <View style={styles.modalBackground}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.closeButton} onTouchStart={onClose}>
                            <CloseIcon />
                        </View>
                        <NailedItIcon />

                        <Text style={styles.title}>Nailed it!</Text>
                        <Text style={styles.message}>You completed the{'\n'}puzzle in {movesCount} moves</Text>

                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 50% opacity black background
        justifyContent: 'center',
        alignItems: 'center',
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: (Dimensions.get('window').width * 0.7),
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 30
    },
    title: {
        fontSize: 30,
        fontWeight: 700,
        lineHeight: 39,
        textAlign: 'center',
        color: 'rgba(71, 44, 53, 1)',
        paddingTop: 32,
    },
    message: {
        fontSize: 18,
        fontWeight: 400,
        textAlign: 'center',
        color: 'rgba(149, 130, 137, 1)',
        paddingTop: 8,
    
    }
});

export default SolvedMessageModal;