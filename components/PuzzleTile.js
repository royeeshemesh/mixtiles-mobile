import React, { useEffect, useState } from "react";
import { Animated, ImageBackground, StyleSheet } from 'react-native';
import { BORDER_WIDTH, GRID_GAP, GRID_SIZE, PHOTO, TILE_SIZE } from "./PuzzleGrid";

const PuzzleTile = (props) => {
    const [topPosition] = useState(new Animated.Value(0));
    const [leftPosition] = useState(new Animated.Value(0));

    const styles = {
        top: topPosition,
        left: leftPosition,
    };

    useEffect(() => {
        const row = Math.floor(props.tile.index / GRID_SIZE);
        const col = props.tile.index % GRID_SIZE;
    
        Animated.timing(topPosition, {
            toValue: GRID_GAP + (row * TILE_SIZE) + (row * GRID_GAP), // Set the new top position
            duration: 150, // Animation duration in milliseconds
            useNativeDriver: false, // Add this line for better performance
        }).start();


        Animated.timing(leftPosition, {
            toValue: GRID_GAP + (col * TILE_SIZE) + (col * GRID_GAP), // Set the new left position
            duration: 150, // Animation duration in milliseconds
            useNativeDriver: false, // Add this line for better performance
        }).start();

    }, [props]);

    return (
        <Animated.View key={props.tile.key} style={[styles, tileStyles.tile]} onTouchStart={() => props.onTouch(props.tile)}>
            <ImageBackground
                source={PHOTO}
                style={{
                    ...tileStyles.tile.imageBackground,
                    left: -props.tile.x,
                    top: -props.tile.y,
                }}
                imageStyle={tileStyles.tile.imageStyle}
            />
        </Animated.View>
    )
}

const tileStyles = StyleSheet.create({
    tile: {
        width: TILE_SIZE,
        height: TILE_SIZE,
        borderWidth: BORDER_WIDTH,
        borderStyle: 'solid',
        borderColor: 'rgba(255,255,255,1)',
        overflow: 'hidden',
        borderRadius: 5,
        position: 'absolute',

        imageBackground: {
            width: TILE_SIZE * GRID_SIZE,
            height: TILE_SIZE * GRID_SIZE,
            position: 'absolute',
        },

        imageStyle: {
            overflow: 'hidden',
            resizeMode: 'cover',
        },
    },
});

export default PuzzleTile;
