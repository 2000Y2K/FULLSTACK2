import React from 'react'

const Notification = ({message},{type}) => {
    if (message === null){
        return null
    }
    const notificationStyle ={
        color:'green',
        fontSize:20,
        padding:10,
        marginBottom:10}

    if (type === "error"){
        const notificationStyle ={
            color:'red',
            fontSize:20,
            padding:10,
            marginBottom:10

        }}

    
    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification;