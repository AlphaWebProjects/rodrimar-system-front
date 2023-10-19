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

    const { userData } = useContext(UserContext);

    const filteredItens = props.allItens.filter((e) => e.id === props.item.id)

    const dateFormat = format(new Date(filteredItens[0].createdAt), 'dd/MM/yyyy', { locale: ptBR });

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
        
      }, []);

    function downItem(event){

        event.preventDefault();

        const converted = Math.floor(Number(downQuantity));
        if(converted <= 0 || converted === '' || downQuantity === ''){
            toast('Insira uma quantidade válida')
            return
        }

        if(converted > 10){
            toast('Quantidade máxima de itens por vez atingida')
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
                    {insertedItens.length < 1 ? <h2>Este item não se encontra no estoque no momento</h2> :
                    
                    <>

                        <select>
                            
                            <option readOnly>Visualização</option>
                            {insertedItens.map((i) => (
                                <option disabled key={i.createdAt} readOnly>
                                    {format(new Date(i.createdAt), 'dd/MM/yyyy', { locale: ptBR })} - {i.price}
                                </option>
                            ))}
                        </select>

                        <input value={downQuantity} onChange={(e) => setDownQuantity(e.target.value)} type="number" placeholder="Quantidade..."></input>

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

