import styled from "styled-components"
import Login from "../../components/auth/Login"
import background from "../../assets/images/background1.jpg"
import SignUp from "../../components/auth/SignUp"
import { useState } from "react"

export default function Auth () {

    const [hasLogin, setHasLogin] = useState(true)
    function changeAuth(){
        setHasLogin(!hasLogin)
    }

    return(
        <Container backgroundImage={background} hasLogin={hasLogin}>
            {hasLogin ? (<Login changeAuth={changeAuth}/>):(<SignUp changeAuth={changeAuth}/>)}
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    //background-color: #0F014D;
    display: flex;
    justify-content: center;
    padding-top: ${props => props.hasLogin ? '15vh':'10vh'};
    background-image: url(${props => props.backgroundImage});
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`