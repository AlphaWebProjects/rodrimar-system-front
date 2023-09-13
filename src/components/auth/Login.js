import styled from "styled-components"
import logo from "../../assets/images/logoAuth/logo-blue.png"
import { useCustomForm } from "../../hooks/useCustomForms"
import { toast } from "react-toastify"
import api from "../../services/API"
import { useContext } from "react"
import useNavigateAndMoveUp from "../../hooks/useNavigateAndMoveUp"
import UserContext from "../../context/UserContext"
import { ButtonWrapper } from "./ButtonWrapper"
import Button from "../../common/form/Button"
import { InputWrapper } from "./InputWrapper"
import Input from "../../common/form/Input"

export default function Login () {

    const [form, handleForm] = useCustomForm()
    const { setUserData } = useContext(UserContext);
    const navigateAndMoveUp = useNavigateAndMoveUp();

    async function SubmitForms(){
        if (!form.email|| !form.password){
            return toast.error("Preencha todos os Campos")
        }

        const body = {
            email: form.email,
            password: form.password
        }

        try {           
            const response = await api.CreateSession(body)

            if( response.status === 200){

                setUserData(response.data)
                toast.dark("Login realizado com sucesso!")
                navigateAndMoveUp({locate: "/"})
            }

        } catch (error) {
            console.log(error)
            //setIsLoading(false)
            toast.error("Verifique os valores !!")
        }
    }

    return(
        <Container>

            <img src={logo} alt="Nick Te Ajuda"/>

            <UserActionsContainer>

                <InputWrapper width={"100%"}>
                    <Input 
                        label="Email"     
                        type="text" 
                        name={"email"} 
                        value={form.email} 
                        onChange={handleForm}
                        width="80%"
                    />
                </InputWrapper>
                <InputWrapper width={"100%"}>
                    <Input 
                        label="Senha"     
                        type="password" 
                        name={"password"} 
                        value={form.password} 
                        onChange={handleForm}
                        width="80%"
                    />
                </InputWrapper>
                <ButtonWrapper width={"100%"}>
                    <Button onClick={() => SubmitForms()} width={"80%"} height={"55px"}>{"Entrar"}</Button>
                </ButtonWrapper>

            </UserActionsContainer>
            
        </Container>
    )
}

const Container = styled.div`
    width: 490px;
    height: 560px;
    background-color: #FFFFFF;
    box-shadow: 0 8px 50px 0 #00000038;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 5vh;
    row-gap: 5vh;
    img {
        max-height: 150px;
        max-width: 60%;
    }
    @media (max-width: 850px) {
        width: 100%;
    }
`
const UserActionsContainer = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    row-gap: 3vh; 
`