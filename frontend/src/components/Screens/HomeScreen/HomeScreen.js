import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../../../components/Product/Product';
import { listProducts } from '../../../actions/productActions';
import Loader from '../../Loader/Loader';
import Message from '../../Message/Message';
import Paginate from '../../Paginate/Paginate';

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;

    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, page, pages } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            <h1>Latest Products</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message varient='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {products.map((product) => {
                            return (
                                <Col
                                    key={product._id}
                                    sm={12}
                                    md={6}
                                    lg={4}
                                    xl={3}>
                                    <Product product={product} />
                                </Col>
                            );
                        })}
                    </Row>
                    <Paginate
                        page={page}
                        pages={pages}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    );
};

export default HomeScreen;
