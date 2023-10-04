import styled from "styled-components"
import Dashboard from "../../components/auth/dashboard/Dashboard"

export default function Home () {
    return(
        <Container>
            <Dashboard/>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    h1 {
        font-size: 50px;
        color: #171717;
    }
`
