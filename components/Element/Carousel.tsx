import React from 'react';
import { View, FlatList, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

interface CarouselProps {
    data: any[];
    renderItem: ({ item }: { item: any }) => JSX.Element;
}

const Carousel: React.FC<CarouselProps> = ({ data, renderItem }) => {
    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width * 0.8 + 20} // Adjust based on item width and spacing
            decelerationRate="fast"
            contentContainerStyle={styles.carouselContainer}
        />
    );
};

const styles = StyleSheet.create({
    carouselContainer: {
        paddingLeft: 20, // Space for the first item
    },
});

export default Carousel;