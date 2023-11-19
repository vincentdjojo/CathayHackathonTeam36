/*
    App.jsx is the file which contains the main logic or represents our entire web site..
*/

/*
    - An <Outlet> should be used in parent route elements to render their child route elements. 
    - This allows nested UI to show up when child routes are rendered. If the parent route matched exactly, it will render a child index route or nothing if there is no index route.
    - The Child Routes are defined within main.jsx...
*/
import { Outlet } from "react-router-dom"; // Outlet allows nested UI to show up when child routes are rendered. If parent-child route exists it will render, but none if it does not exist.

import { ToastContainer } from "react-toastify"; // Container for Toast components to display errors..
import 'react-toastify/dist/ReactToastify.css'; // CSS file dedicated for Toast Containers. Otherwise, the design would look weird..
import './index.css'; // use this to disable tailwindcss..
//import '../dist/index.css'; //enable tailwindcss..


const App = () => {
    return(
        <>
            <Outlet />
        </>
    );
};
  
export default App;