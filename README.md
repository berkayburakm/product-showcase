# Product Showcase App

This is a "Product Showcase" application built with Next.js, Tailwind CSS, and the Context API.

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/berkayburakm/product-showcase.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd product-showcase
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

The application will be available at `http://localhost:3000`.

## Global State

The application uses the React's built-in Context API for global state management, specifically for the shopping cart. The `CartContext` is located in `context/CartContext.js` and provides the cart's state and dispatch function to the entire application.

The cart's state includes an array of `items`, and the `cartReducer` function handles adding, removing, and clearing items from the cart.

The reason we used the Context API is that this project isn't complex enough to require installing external state management library like Redux or Zustand.For a global feature like a shopping cart, React's built-in Context API is the perfect lightweight solution. It allows us to share the cart's state (items) and functions (dispatch) across any component that needs them.

## Hosted Demo

A hosted demo of this application is available at [your-demo-link.com](https://your-demo-link.com).
