import styled from "styled-components"

export default function Home () {
    return(
        <Container>
            <h1>TESTE</h1>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    h1 {
        font-size: 50px;
        color: #171717;
    }
`
