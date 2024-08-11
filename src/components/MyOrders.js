import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Card, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './CSS/MyOrders.css'; // Import CSS file for styling

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [filterType, setFilterType] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const user = JSON.parse(localStorage.getItem("k45#45sed"));
            if (!user) {
                setError("User not logged in");
                return;
            }

            const ref = collection(db, 'order');
            let q;

            switch (filterType) {
                case 'intransit':
                    q = query(
                        ref,
                        where('user', '==', user.email),
                        where('delivery_status', '==', '0'),
                        where('verification', '==', '1'),
                        where('transit_status', '==', '1')
                    );
                    break;
                case 'ordered':
                    q = query(
                        ref,
                        where('user', '==', user.email),
                        where('verification', '==', '1')
                    );
                    break;
                case 'delivered':
                    q = query(
                        ref,
                        where('user', '==', user.email),
                        where('delivery_status', '==', '1')
                    );
                    break;
                case 'cancel':
                    q = query(
                        ref,
                        where('user', '==', user.email),
                        where('verification', '==', '2')
                    );
                    break;
                default:
                    q = query(ref, where('user', '==', user.email));
            }

            try {
                const querySnapshot = await getDocs(q);
                const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOrders(ordersData);
            } catch (err) {
                setError('Failed to fetch orders');
                console.error('Error fetching orders: ', err);
            }
        };

        fetchOrders();
    }, [filterType]); // Runs whenever filterType changes

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    const getStatusLabel = (order) => {
        switch (order.delivery_status) {
            case '0':
                return order.transit_status === '1' ? 'Intransit' : 'Ordered';
            case '1':
                return 'Delivered';
            case '2':
                return 'Cancelled';
            default:
                return 'Unknown';
        }
    };

    return (
        <div className="my-orders-container">
            <h1>My Orders</h1>

            {/* Filter Buttons */}
            <div className="filter-buttons">
                <Button 
                    variant={filterType === 'all' ? 'primary' : 'secondary'} 
                    onClick={() => setFilterType('all')}>
                    All
                </Button>
                <Button 
                    variant={filterType === 'ordered' ? 'success' : 'secondary'} 
                    onClick={() => setFilterType('ordered')}>
                    Ordered
                </Button>
                <Button 
                    variant={filterType === 'intransit' ? 'warning' : 'secondary'} 
                    onClick={() => setFilterType('intransit')}>
                    In Transit
                </Button>
                <Button 
                    variant={filterType === 'delivered' ? 'info' : 'secondary'} 
                    onClick={() => setFilterType('delivered')}>
                    Delivered
                </Button>
                <Button 
                    variant={filterType === 'cancel' ? 'danger' : 'secondary'} 
                    onClick={() => setFilterType('cancel')}>
                    Cancelled
                </Button>
            </div>

            <div className="orders-list">
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    orders.map(order => (
                        <Card key={order.id} className="order-card">
                            <Card.Body>
                                <Card.Title>Order ID: {order.id}</Card.Title>
                                <Card.Text>
                                    <strong>Total Price:</strong> Rs. {order.total || 'N/A'}
                                    <br />
                                    <strong>Ordered At:</strong> {order.ordered_at || 'N/A'}
                                    <br />
                                    <strong>Address:</strong> {order.address || 'N/A'}
                                    <br />
                                    <strong>Status:</strong>
                                    <span className={`status-label status-${getStatusLabel(order)}`}>
                                        {getStatusLabel(order)}
                                    </span>
                                </Card.Text>
                                <Button variant="primary" onClick={() => navigate(`/track-order/${order.id}`)}>Track Order</Button>
                            </Card.Body>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default MyOrders;



// // src/components/MyOrders.js
// import React, { useEffect, useState } from 'react';
// import { db } from '../firebase';
// import { collection, query, where, getDocs } from 'firebase/firestore';
// import { Card, Button, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import './CSS/MyOrders.css'; // Import CSS file for styling

// const MyOrders = ({ type }) => {
//     const [orders, setOrders] = useState([]);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchOrders = async () => {
//             const user = JSON.parse(localStorage.getItem("k45#45sed"));
//             if (!user) {
//                 setError("User not logged in");
//                 return;
//             }

//             const ref = collection(db, 'order');
//             let q;

//             switch (type) {
//                 case 'intransit':
//                     q = query(
//                         ref,
//                         where('user', '==', user.email),
//                         where('delivery_status', '==', '0'),
//                         where('verification', '==', '1'),
//                         where('transit_status', '==', '1')
//                     );
//                     break;
//                 case 'ordered':
//                     q = query(
//                         ref,
//                         where('user', '==', user.email),
//                         where('verification', '==', '1')
//                     );
//                     break;
//                 case 'delivered':
//                     q = query(
//                         ref,
//                         where('user', '==', user.email),
//                         where('delivery_status', '==', '1')
//                     );
//                     break;
//                 case 'cancel':
//                     q = query(
//                         ref,
//                         where('user', '==', user.email),
//                         where('verification', '==', '2')
//                     );
//                     break;
//                 default:
//                     q = query(ref, where('user', '==', user.email));
//             }

//             try {
//                 const querySnapshot = await getDocs(q);
//                 const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//                 setOrders(ordersData);
//             } catch (err) {
//                 setError('Failed to fetch orders');
//                 console.error('Error fetching orders: ', err);
//             }
//         };

//         fetchOrders();
//     }, [type]);

//     if (error) {
//         return <Alert variant="danger">{error}</Alert>;
//     }

//     const getStatusLabel = (order) => {
//         switch (order.delivery_status) {
//             case '0':
//                 return order.transit_status === '1' ? 'Intransit' : 'Ordered';
//             case '1':
//                 return 'Delivered';
//             case '2':
//                 return 'Cancelled';
//             default:
//                 return 'Unknown';
//         }
//     };
    

//     return (
//         <div className="my-orders-container">
//             <h1>My Orders</h1>
//             <div className="orders-list">
//                 {orders.length === 0 ? (
//                     <p>No orders found.</p>
//                 ) : (
//                     orders.map(order => (
//                         <Card key={order.id} className="order-card">
//                             <Card.Body>
//                                 <Card.Title>Order ID: {order.id}</Card.Title>
//                                 <Card.Text>
//                                     <strong>Total Price:</strong> Rs. {order.total || 'N/A'}
//                                     <br />
//                                     <strong>Ordered At:</strong> {order.ordered_at || 'N/A'}
//                                     <br />
//                                     <strong>Address:</strong> {order.address || 'N/A'}
//                                     <br />
//                                     <strong>Status:</strong>
//                                     <span className={`status-label status-${getStatusLabel(order)}`}>
//                                         {getStatusLabel(order)}
//                                     </span>
//                                 </Card.Text>
//                                 <Button variant="primary" onClick={() => navigate(`/track-order/${order.id}`)}>Track Order</Button>
//                             </Card.Body>
//                         </Card>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MyOrders;
