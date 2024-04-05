import Guitar from "./components/Guitar";
import Header from "./components/Header";
import { db } from "./data/db";
import { useState, useEffect } from "react";

const App = () => {

    const initialCart = () => {
        const lsCart = localStorage.getItem('cart')
        return lsCart ? JSON.parse(lsCart) : []
    }

    const [ data ] = useState(db)
    const [ cart, setCart ] = useState(initialCart)

    const MAX_ITEMS = 5
    const MAX_ITEMS_DECREASE = 1

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    const addToCart = (item) => {
        const itemExist = cart.findIndex(guitar => guitar.id === item.id) 
        if(itemExist === -1){
            item.quantity = 1 
            setCart([...cart, item])
        } else { 
            if(cart[itemExist].quantity >= MAX_ITEMS) return
            const updatedCart = [...cart]
            updatedCart[itemExist].quantity++
            setCart(updatedCart)
        }
    }

    const removeToCart = (id) => {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    const increaseQuantity = (id) => {
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity < MAX_ITEMS) {
                return { 
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart)
    } 

    const decreaseQuantity = (id) => {
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity > MAX_ITEMS_DECREASE) {
                return { 
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item
        })
        setCart(updatedCart)
    }

    const clearCart = () => {
        setCart([])
    }

    return(
        <>
        <Header 
            cart={ cart }
            removeToCart={ removeToCart }
            increaseQuantity={ increaseQuantity }
            decreaseQuantity={ decreaseQuantity }
            clearCart={ clearCart }/>
            
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            { data.map( guitar => (
                <Guitar
                    setCart={ setCart }
                    guitar={ guitar }
                    key={ guitar.id }
                    addToCart={ addToCart }
                    />))}
                    
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
        </>
    )
};

export default App;