import './App.css'
import {MdLibraryAdd, MdLibraryAddCheck} from "react-icons/md";
import {useEffect, useState} from 'react';
import {FiEdit} from "react-icons/fi";
import {FaTrashAlt} from "react-icons/fa";
import {ImCancelCircle} from "react-icons/im";

function App() {
    const [items, setItems] = useState([]);
    const [inputValue, setInputValue] = useState("")
    const [isClicked, setIsClicked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newValue, setNewValue] = useState([]);
    const [editId, setEditId] = useState(null);

    const openModal = (id, task) => {
        setShowModal(true);
        setEditId(id); // Set the task id
        setNewValue(task); // Set the current task value for editing
    };

    const closeModal = () => setShowModal(false);

    // Load items from local storage when the component mounts
    useEffect(() => {
        const storedItems = localStorage.getItem("todoItems");
        console.log("Stored Items:", storedItems);
        if (storedItems) {
            setItems(JSON.parse(storedItems));
            console.log("Display...." + storedItems)
        }
    }, []);

    // Save items to local storage whenever `items` state changes
    useEffect(() => {
        localStorage.setItem("todoItems", JSON.stringify(items));
    }, [items]);

    const add = () => {
        if (inputValue.trim() === "") return;
        setIsClicked(true);
        operation();
        setTimeout(() => {
            setIsClicked(false)
        }, 1000);
    }

    const id = () => {
        return (Date.now())
    }

    const operation = () => {
        const ID = id()
        const newTask = {
            Id: ID,
            Task: inputValue,
            Done: false
        };
        setItems([...items, newTask])
        setInputValue("")
    }

    const addInputValue = (value) => {
        if (value.trim() === "") return;
        setInputValue(value)
    }

    const toggleDone = (taskId) => {
        setItems(items.map(item =>
            item.Id === taskId ? {...item, Done: !item.Done} : item
        ));
    };

    const deleteOnClick = (itemId) => {
        setItems(items.filter(item => item.Id !== itemId));
    };

    const updateTask = () => {
        if (!editId || !newValue.trim()) return;

        const updatedItems = items.map(item =>
            item.Id === editId ? { ...item, Task: newValue } : item
        );
        setItems(updatedItems);
        closeModal();
    };

    return (
        <>
            <div
                className="bg-slate-700 min-h-full h-auto w-screen text-white text-4xl flex flex-col items-center justify-start">

                <div>
                    <p className="font-sourGummy ">To Do List</p>
                </div>

                <div className="flex items-center mt-6 rounded-lg px-4 py-2 md:w-5/12">
                    <input
                        type="text"
                        className="text-black text-lg p-3 rounded-l-lg h-10 w-full bg-amber-300"
                        placeholder="Add a new task..."
                        value={inputValue}
                        onChange={(e) => addInputValue(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-11 bg-red-800 h-10 text-white p-2 rounded-l-none rounded-r-lg hover:bg-red-900 flex items-center justify-center"
                        onClick={add}
                    >
                        {isClicked ? <MdLibraryAddCheck /> : <MdLibraryAdd size={24} />}
                    </button>
                </div>

                <div className="flex items-center mt-6 rounded-lg px-4 py-2 md:w-5/12">
                    <ul className="w-full md:min-w-full">
                        {items.map(item => (
                            <li key={item.Id} className="w-full md:min-w-full mt-4 min-h-11 flex rounded-md">
                                <div className="pl-2 pr-2 bg-slate-500 rounded-l-md">
                                    <input type="checkbox"
                                           checked={item.Done}
                                           onChange={() => toggleDone(item.Id)}
                                    />
                                </div>
                                <div className="group flex items-center justify-start bg-slate-500 w-full md:w-full rounded-md rounded-l-none">
                                    <p className="text-2xl text-balance font-sourGummy p-2 whitespace-normal break-words w-10/12 md:w-10/12">
                                        <span className={item.Done ? 'line-through' : ''}> {item.Task}</span>
                                    </p>
                                    <div className="flex items-center justify-center ml-2 opacity-0 group-hover:opacity-100">
                                        <button onClick={() => openModal(item.Id, item.Task)}>
                                            <FiEdit className="text-red-500 text-2xl"/>
                                        </button>
                                    </div>
                                    <div onClick={() => deleteOnClick(item.Id)}
                                         className="flex items-center justify-center ml-2 mr-2 opacity-0 group-hover:opacity-100">
                                        <button>
                                            <FaTrashAlt className="text-red-500 text-2xl"/>
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {showModal && (
                    <div className="flex items-center justify-center absolute top-20 w-11 md:w-5/12 z-10">
                        <div className="modal-content p-4 rounded-md shadow-lg bg-green-400 flex-col justify-center items-center">
                            <span className="text-4xl flex justify-center">EDIT</span>
                            <input
                                type="text"
                                className="text-black text-lg p-3 rounded-3xl h-10 w-full bg-green-900"
                                value={newValue}
                                onChange={(e) => setNewValue(e.target.value)}
                            />
                            <div className="flex justify-center w-full mt-2">
                                <button className="mr-5" onClick={updateTask}>
                                    <MdLibraryAdd size={30}/>
                                </button>
                                <button className="ml-5" onClick={closeModal}>
                                    <ImCancelCircle size={30}/>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;


// import './App.css'
// import {MdLibraryAdd, MdLibraryAddCheck} from "react-icons/md";
// import {useEffect, useState} from 'react';
// import {FiEdit} from "react-icons/fi";
// import {FaTrashAlt} from "react-icons/fa";
// import { ImCancelCircle } from "react-icons/im";
//
//
// function App() {
//     const [items, setItems] = useState([]);
//     const [inputValue, setInputValue] = useState("")
//     const [isClicked, setIsClicked] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [newValue,setNewValue]=useState([])
//     const [editId, setEditId] = useState(null);
//
//     const openModal = (id, task) => {
//         setShowModal(true);
//         setEditId(id); // Set the task id
//         setNewValue(task); // Set the current task value for editing
//     };
//     const closeModal = () => setShowModal(false);
//
//
//     // Load items from local storage when the component mounts
//     useEffect(() => {
//         const storedItems = localStorage.getItem("todoItems");
//         console.log("Stored Items:", storedItems);
//         if (storedItems) {
//             setItems(JSON.parse(storedItems));
//             console.log("Display...." + storedItems)
//         }
//     }, []);
//
//     // Save items to local storage whenever `items` state changes
//     useEffect(() => {
//         localStorage.setItem("todoItems", JSON.stringify(items));
//     }, [items]);
//
//
//     const add = () => {
//         if (inputValue.trim() === "") return;
//         setIsClicked(true);
//         operation();
//         setTimeout(() => {
//             setIsClicked(false)
//         }, 1000);
//     }
//
//
//     const id = () => {
//         return (Date.now())
//     }
//     const operation = () => {
//         const ID = id()
//         const newTask = {
//             Id: ID,
//             Task: inputValue,
//             Done: false
//         };
//         setItems([...items, newTask])
//         setInputValue("")
//     }
//
//
//     const addInputValue = (value) => {
//         if (value.trim() === "") return;
//
//         setInputValue(value)
//     }
//
//     const toggleDone = (taskId) => {
//         setItems(items.map(item =>
//             item.Id === taskId ? {...item, Done: !item.Done} : item
//         ));
//     };
//
//     const deleteOnClick = (itemId) => {
//         setItems(items.filter(item => item.Id !== itemId));
//
//     };
//     const updateTask = () => {
//         if (!editId || !newValue.trim()) return;
//
//         const updatedItems = items.map(item =>
//             item.Id === editId ? { ...item, Task: newValue } : item
//         );
//         setItems(updatedItems);
//         closeModal();
//     };
//
//     return (
//         <>
//
//             <div
//                 className="bg-slate-700 h-auto  w-screen  text-white text-4xl flex flex-col items-center justify-start">
//
//                 <div>
//                     <p className="font-sourGummy ">To Do List</p>
//                 </div>
//
//
//                 <div className="flex items-center mt-6 rounded-lg px-4 py-2  md:w-5/12">
//                     <input
//                         type="text"
//                         className="text-black text-lg p-3 rounded-l-lg h-10 w-full bg-amber-300"
//                         placeholder="Add a new task..."
//                         value={inputValue}
//                         onChange={(e) => addInputValue(e.target.value)}
//                     />
//                     <button
//                         type="submit"
//                         className="w-11 bg-red-800 h-10 text-white p-2 rounded-l-none rounded-r-lg hover:bg-red-900 flex items-center justify-center"
//                         onClick={add}
//                     >
//                         {/* <MdLibraryAdd size={24}/> */}
//
//
//                         {isClicked ? <MdLibraryAddCheck/> : <MdLibraryAdd size={24}/>}
//
//                     </button>
//                 </div>
//
//                 <div className='flex items-center mt-6 rounded-lg px-4 py-2  md:w-5/12'>
//                     <ul className='w-full md:min-w-full'>
//                         {items.map(item => (
//                             <li key={item.Id} className=' w-full md:min-w-full mt-4 min-h-11 flex  rounded-md'>
//                                 <div className='pl-2 pr-2  bg-slate-500 rounded-l-md'>
//                                     <input type="checkbox"
//                                            checked={item.Done}
//                                            onChange={() => toggleDone(item.Id)}
//                                     />
//                                 </div>
//                                 <div
//                                     className="group flex items-center justify-start bg-slate-500 w-full md:w-full rounded-md rounded-l-none">
//                                     <p className='text-2xl text-balance font-sourGummy p-2 whitespace-normal break-words w-10/12 md:w-10/12'>
//                                         <span className={item.Done ? 'line-through' : ''}> {item.Task}</span>
//                                     </p>
//                                     <div
//                                         className='flex items-center justify-center ml-2 opacity-0 group-hover:opacity-100 '>
//
//                                         <button onClick={() => openModal()}>
//                                             <FiEdit className="text-red-500 text-2xl"/>
//
//                                             {/*<FiEdit className='text-red-500 text-2xl'/>*/}
//                                         </button>
//                                     </div>
//                                     <div onClick={() => deleteOnClick(item.Id)}
//                                          className=' flex items-center justify-center ml-2 mr-2 opacity-0 group-hover:opacity-100 '>
//                                         <button  /*onClick={deleteOnClick(item.Id)}*/   >
//                                             <FaTrashAlt className='text-red-500 text-2xl'/>
//                                         </button>
//                                     </div>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//                 {showModal && (
//                     <div className="flex items-center justify-center absolute top-20 w-11 md:w-5/12 z-10">
//                         <div className="modal-content p-4 rounded-md shadow-lg bg-green-400 flex-col justify-center items-center">
//                             <span className='text-4xl flex justify-center'>EDIT</span>
//                             <input
//                                 type="text"
//                                 className="text-black text-lg p-3 rounded-3xl h-10 w-full bg-green-900"
//                                 value={newValue}
//                                 onChange={(e) => setNewValue(e.target.value)}
//                             />
//                             <div className='flex justify-center w-full mt-2'>
//                                 <button className='mr-5' onClick={updateTask}>
//                                     <MdLibraryAdd size={30}/>
//                                 </button>
//                                 <button className='ml-5' onClick={closeModal}>
//                                     <ImCancelCircle size={30}/>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//
//
//             </div>
//         </>
//     )
// }
//
// export default App