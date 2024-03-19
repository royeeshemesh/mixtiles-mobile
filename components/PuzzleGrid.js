import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PuzzleTile from './PuzzleTile';
import ShuffleIcon from './ShuffleIcon';
import SolvedMessageModal from './SolvedMessageModal';

export const GRID_SIZE = 3;
export const GRID_GAP = 2;
export const TILE_SIZE = (Dimensions.get('window').width * 0.9) / GRID_SIZE;
export const BORDER_WIDTH = 2;
export const SHUFFLE_COMPLEXITY = 3;
export const PHOTO = require('../assets/image3.png');


const getNeighbors = (index) => {
    const neighbors = [];
    if (index % 3 !== 0) neighbors.push(index - 1);
    if (index % 3 !== 2) neighbors.push(index + 1);
    if (index >= 3) neighbors.push(index - 3);
    if (index < 6) neighbors.push(index + 3);
    return neighbors;
}

const PuzzleGrid = () => {
    const [tiles, setTiles] = useState([]);
    const [moves, setMoves] = useState(0);
    const [isSolved, setIsSolved] = useState(false);

    const shuffleTiles = (tilesToShuffle) => {
        const randomMove = () => {
            const _emptyTile = tilesToShuffle.find(t => t.isEmpty);
            const _emptyTileNeighbors = getNeighbors(_emptyTile.index);
            const _tileIndex = _emptyTileNeighbors[Math.floor(Math.random() * _emptyTileNeighbors.length)];
            const _tile = tilesToShuffle.find(t => t.index === _tileIndex);

            // swap empty with tile indexeces
            const _t = _tile.index;
            _tile.index = _emptyTile.index;
            _emptyTile.index = _t;
        }

        for (let i = 0; i < SHUFFLE_COMPLEXITY; i++) {
            randomMove();
        }

        return tilesToShuffle;
    }

    const splitImage = () => {
        let _tiles = [];
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                const key = `${i}_${j}`;
                _tiles.push({
                    key,
                    index: i * GRID_SIZE + j,
                    x: GRID_GAP + (j * TILE_SIZE) + (j * GRID_GAP),
                    y: GRID_GAP + (i * TILE_SIZE) + (i * GRID_GAP),
                    isEmpty: i === GRID_SIZE - 1 && j === GRID_SIZE - 1
                });
            }
        }
        const _shuflledTiles = shuffleTiles(_tiles);
        setTiles(_shuflledTiles);
    };

    const handleOnTileTouch = (tile) => {
        const _emptyTile = tiles.find(t => t.isEmpty);
        const _emptyTileNaghbors = getNeighbors(_emptyTile.index);
        if (_emptyTileNaghbors.indexOf(tile.index) === -1) {
            return;
        }
        // swap empty with tile indexeces
        const _t = tile.index;
        tile.index = _emptyTile.index;
        _emptyTile.index = _t;

        setTiles([...tiles],);
        setMoves(moves + 1);

        let _isSolved = true;
        for (let i = 0; i < tiles.length; i++) {
            if (tiles[i].index !== i) {
                _isSolved = false;
                break;
            }
        }
        setIsSolved(_isSolved);
    }

    const getPuzzleTiles = () => {
        return tiles.map(tile => !tile.isEmpty && <PuzzleTile onTouch={handleOnTileTouch} key={tile.key} tile={tile} />)
    }

    const newGame = () => {
        setIsSolved(false);
        setMoves(0);
        splitImage();
    }

    useEffect(() => {
        newGame();
    }, []);

    return (
        <View style={styles.container}>

            <SolvedMessageModal isVisible={isSolved} movesCount={moves} onClose={newGame} />

            <View style={styles.puzzleHeader}>
                <Text style={styles.puzzleHeader.title}>8-Puzzle</Text>
                <TouchableOpacity style={styles.puzzleHeader.shuffleButton} onPress={newGame}>
                    <ShuffleIcon />
                    <View style={{ paddingLeft: 5 }}>
                        <Text style={{ color: 'rgba(215, 42, 110, 1)' }}>Shuffle</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.puzzleHeader.moves}>
                    <Text style={{ color: 'rgba(71, 44, 53, 1)' }}>Moves: {moves}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.gridContainer}>
                {getPuzzleTiles()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(251, 249, 249, 1)',
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    puzzleHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
        width: TILE_SIZE * GRID_SIZE,

        title: {
            flex: 1, fontSize: 32, fontWeight: 'bold'
        },

        shuffleButton: {
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: 'rgba(255, 196, 216, 0.7)',
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 8
        },

        moves: {
            marginLeft: 5,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: 'rgba(242, 233, 233, 1)',
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 8
        }

    },
    gridContainer: {
        width: TILE_SIZE * GRID_SIZE + 2,
        height: TILE_SIZE * GRID_SIZE + 2,
        position: 'relative',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 1,

        tile: {
            width: TILE_SIZE,
            height: TILE_SIZE,
            borderWidth: BORDER_WIDTH,
            borderStyle: 'solid',
            borderColor: 'rgba(255,255,255,1)',
            overflow: 'hidden',
            borderRadius: 5,

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
    }
});

export default PuzzleGrid;
