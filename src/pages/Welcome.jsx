import react from 'react'

export const Welcome = (props)=>{
    return<>
    <img style={{
        height: '100px',
        borderRadius: '10px'
    }} src={props.src} alt={props.alt} />
    </>
}

