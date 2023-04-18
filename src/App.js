import React, { useEffect, useState } from 'react';
import Home from './Home';
import { Route, Routes } from 'react-router-dom';
import Edit from './Edit';

function App() {
   return <>
    <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route path='/edit/:id' element={<Edit />}></Route>
    </Routes>
   
   </>
}

export default App