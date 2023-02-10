import React from 'react'
import Questionpost from './Questionpost'
import Questionupload from './Questionupload'
import { Outlet } from 'react-router-dom'

const MainQA = () => {
    return (
        <div>
            <Questionupload />
            <Questionpost />
            <Outlet />
        </div>
    )
}

export default MainQA
