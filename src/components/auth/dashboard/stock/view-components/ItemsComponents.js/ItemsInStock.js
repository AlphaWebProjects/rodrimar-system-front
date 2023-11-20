import styled from "styled-components"
import { useContext, useState, useEffect } from "react"
import Button from "../../../../../../common/form/Button"
import { ButtonWrapper } from "../../../../ButtonWrapper"
import { toast } from "react-toastify"
import { format } from 'date-fns';
import ptBR from "date-fns/locale/pt-BR"
import api from "../../../../../../services/API"
import UserContext from "../../../../../../context/UserContext"

export default function ItemsInStock(props){

    //fazer o get aqui, e verificar a length da array. Toda vez que houver alteração, faz a filtragem novamente. Ou fazer por setTime
    const [downQuantity, setDownQuantity] = useState('');
    const [insertedItens, setInsertedItens] = useState([]);
    const [selectedPlate, setSelectedPlate] = useState('');

    const { userData } = useContext(UserContext);

    const filteredItens = props.allItens.filter((e) => e.id === props.item.id)

    useEffect(() => {
        
        async function getAll(){

            try {

                const allInsertedItens = await api.getAllInsertedItens(userData.token)
                

                const filteredInsertedItens = allInsertedItens.data.filter((e) => e.itemId === filteredItens[0].id) 
                
                setInsertedItens(filteredInsertedItens)
                

                return

            } catch (error) {
                toast.error('Não foi possível obter todos os dados')
            }

        };

        getAll();
        
      }, [props.insertedItensUseEffectBool]);

    async function downItem(event){

        event.preventDefault();

        if(selectedPlate === ''){
            toast.error('Selecione uma placa');
            return
        }

        const converted = Math.floor(Number(downQuantity));
        if(converted <= 0 || converted === '' || downQuantity === ''){
            toast.error('Insira uma quantidade válida')
            return
        }

        if(converted > 10){
            toast.error('Quantidade máxima de itens por vez atingida')
            return
        }

        if(converted > props.insertedInStockQuantity){
            toast.error("Não há itens no estoque o suficiente para realizar esta operação")
            return
        }

        try {
            
            const body = {
                itemId: props.item.itemId,
                deletedQuantity: converted,
                licenseId: Number(selectedPlate)
            }

            console.log(body)

            await api.deleteItem(userData.token, body)

            props.setUseEffectBool(!props.useEffectBool)

        } catch (error) {
            console.log(error)
            toast.error('Não foi possível realizar esta ação no momento')
            return
        }

    }
    
    if(filteredItens.length === 0){
        return(
            <h2>Não disponível</h2>
        )
    }


    return(
        
        (props.item.id === filteredItens[0].id) 
        
        ? 
            
                <>
                    {props.insertedStock.length < 1 ? <h2>Este item não se encontra no estoque no momento</h2> :
                    
                    <>
                        <select onChange={(e) => setSelectedPlate(e.target.value)}>
                            <option value='' readOnly>Selecione a placa</option>
                            {props.plates.map((i) => (
                                <option  value={i.id} key={i.createdAt} >
                                    {i.license}
                                </option>
                            ))}
                        </select>

                        <StyledInput value={downQuantity} onChange={(e) => setDownQuantity(e.target.value)} type="number" placeholder="Quantidade..."></StyledInput>

                        <ButtonWrapper width={'60%'}>
                            <Button onClick={downItem} fontsize={'5'} type='submit' width={"70%"} height={"35px"}>Dar baixa</Button>
                        </ButtonWrapper>

                    </>

                    }
                    
                    
                </>
            
        
        : 

        ''
        
    )

}

const StyledInput = styled.input`
width: 40% !important;
height: 25px !important;
border: 1px solid #0F014D !important;
border-radius: 10px !important;
`