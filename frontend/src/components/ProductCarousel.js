import React from "react";
import { Card, Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";

function ProductCarousel() {
    // use selector is use to get data from redux state
    const productList = useSelector((state) => state.productList);
    const { error, loading, products, page, pages } = productList;

    return (
        <Carousel pause="hover">
            {products.map((product) => (
                <Carousel.Item>
                    <Card.Img src={product.image} fluid />
                    <Carousel.Caption className="carousel.caption">
                        {product.name} - ${product.price}
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default ProductCarousel;
