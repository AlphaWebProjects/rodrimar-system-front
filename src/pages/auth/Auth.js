import styled from "styled-components"
import Login from "../../components/auth/Login"
import background from "../../assets/images/background1.jpg"

export default function Auth () {

    //const [hasLogin, setHasLogin] = useState(true)

    return(
        <Container backgroundImage={background}>
            {/* hasLogin ? (<Login setHasLogin={setHasLogin}/>):(<SignUp setHasLogin={setHasLogin}/>) */}
            <Login/>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    //background-color: #0F014D;
    display: flex;
    justify-content: center;
    padding-top: 15vh;
    background-image: url(${props => props.backgroundImage});
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`