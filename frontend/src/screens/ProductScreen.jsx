import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// Actions
import { getProductDetails } from '../redux/actions/productActions'
import { addToCart } from '../redux/actions/cartActions'

import './ProductScreen.css'

const ProductScreen = ({ match, history }) => {
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.getProductDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        if (product && match.params.id !== product._id) {
            dispatch(getProductDetails(match.params.id))
        }
    }, [dispatch, product, match])

    const addToCartHandler = () => {
        dispatch(addToCart(product._id, qty))
        history.push("/cart")
    }

    return (
        <div className="productscreen">
            {loading ? <h2>Loading...</h2> : error ? <h2>{error}</h2> : (
                <>
                    <div className="productscreen__left">
                        <div className="left__image">
                            <img
                                src={product.imageUrl}
                                alt={product.name} />
                        </div>
                        <div className="left__info">
                            <p className="left__name">{product.name}</p>
                            <p className="left__price">${product.price}</p>
                            <p className="left__description">
                                Description: {product.description}
                            </p>
                        </div>
                    </div>

                    <div className="productscreen__right">
                        <div className="right__info">
                            <p>
                                Price: <span>$499.99</span>
                            </p>
                            <p>
                                Status: <span>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</span>
                            </p>
                            <p>
                                Qty <select value={qty} onChange={e => setQty(e.target.value)}>
                                    {[...Array(product.countInStock).keys()].map(x => (
                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                    ))}
                                </select>
                            </p>
                            <p>
                                <button type="button" onClick={addToCartHandler}>Add To Cart</button>
                            </p>
                        </div>
                    </div>
                </>
            )}

        </div>
    )
}

export default ProductScreen
