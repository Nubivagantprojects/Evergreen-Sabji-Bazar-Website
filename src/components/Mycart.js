import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Table, Button, Image } from 'react-bootstrap';
import { collection, getDocs, query, where, doc, updateDoc, deleteDoc} from 'firebase/firestore';
import { db } from '../firebase';


const fetchCart = async (user) => {
    const productsCollection = collection(db, 'cart');
    const q = query(productsCollection, where('isC', '==', "1"), where('user', '==', user));
    const productSnapshot = await getDocs(q);
    const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
    console.log(productList)
    return productList;
};

const MyCart = () => {
    const [cart, setCart] = useState([]);
    const user_obj = localStorage.getItem("k45#45sed");
    const user = JSON.parse(user_obj);
    useEffect(() => {
        const getCart = async () => {
            const cartList = await fetchCart(user.email);
            setCart(cartList);
        };
        getCart();
    }, []);

    const handleQuantityChange = async (id, delta) => {
        setCart(cart.map(item =>
            item.id === id ? { ...item, quantity: Math.max(1, Number(item.quantity) + delta).toString() } : item
        ));

        // Find the item with the given id in the cart
        const itemToUpdate = cart.find(item => item.id === id);

        if (itemToUpdate) {
            // Convert the new quantity to a string
            const newQuantity = (Math.max(1, Number(itemToUpdate.quantity) + delta)).toString();

            // Update Firestore with the new quantity
            const itemDocRef = doc(db, 'cart', id);
            await updateDoc(itemDocRef, { quantity: newQuantity });
        }
    };

    const handleRemoveItem = async(id) => {
        setCart(cart.filter(item => item.id !== id));
        const itemDocRef = doc(db, 'cart', id);

        // Delete the document
        await deleteDoc(itemDocRef);
        window.location.href="/cart"
    };

    const getTotal = () => {
        return cart.reduce((acc, item) => acc + (Number(item.amount) * Number(item.quantity)), 0);
    };

    return (
        <Container>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Unit price</th>
                        <th>Qty</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <tr key={item.id}>
                            <td><Image src={item.item_img} rounded width="50" height="50" /></td>
                            <td>{item.item_name}</td>
                            <td>RS {item.amount}</td>
                            <td>
                                <Button variant="secondary" onClick={() => handleQuantityChange(item.id, -1)}>-</Button>
                                <span className="mx-2">{item.quantity}</span>
                                <Button variant="secondary" onClick={() => handleQuantityChange(item.id, 1)}>+</Button>
                            </td>
                            <td>RS {Number(item.amount) * Number(item.quantity)}</td>
                            <td><Button variant="danger" onClick={() => handleRemoveItem(item.id)}>X</Button></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4">Total</td>
                        <td>RS {getTotal()}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </Table>
            <Button variant="warning" size="lg" className="mt-3">PROCEED TO CHECKOUT RS {getTotal()}</Button>
        </Container>
    );
};

export default MyCart;