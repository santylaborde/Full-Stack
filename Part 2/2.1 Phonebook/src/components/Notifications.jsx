const Notification = ({ message }) => {

    const {content, status}= message

    const nullStyle = {        
        color: 'white',
        background: 'white'
    }

    const Style = {        
        color: status=="success" ? 'green' : 'red', 
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
    }

    if (content) {
        return (            
            <div style= {Style} >
                {content}
            </div>
        )
    }
    else{
        return (            
            <div style= {nullStyle} >
            </div>
        )
    }
    
}

export default Notification