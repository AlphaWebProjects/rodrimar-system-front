import styled from "styled-components"
import ReceptBillItensDisplay from "./ReceptBillItensDisplay"
import Button from "../../../../../../common/form/Button"
import { ButtonWrapper } from "../../../../ButtonWrapper"
import { useContext, useState, useEffect } from "react"
import { toast } from "react-toastify"
import api from "../../../../../../services/API"
import UserContext from "../../../../../../context/UserContext"


export default function AddReceiptBill({receptBillItens, setReceptBillItens, receptBillQuantity, setReceptBillQuantity, useEffectBool, setUseEffectBool}){

    const [itensTotalPrice, setItensTotalPrice] = useState([]);
    const [totalPrice, setTotalPrice] = useState('')
    const [suppliers, setSuppliers] = useState([]);
    const [receptBillFormalData, setReceptBillFormalData] = useState({
        receptBillNumber: '',
        emissionDate: '',
        supplier: ''
    }) 

    const { userData } = useContext(UserContext);

    useEffect(() => {
        
        async function getAll(){

            try {

                const getSuppliers = await api.getSuppliers(userData.token)

                setSuppliers(getSuppliers.data)


                return

            } catch (error) {
                console.log(error)
                toast.error('Não foi possível obter todos os dados')
            }

        };

        getAll();
        
      }, [useEffectBool]);

    function set(){

        if(receptBillItens.length === 0 || itensTotalPrice.length === 0){
            toast.error('Selecione pelo menos um item e preencha todos os seus dados');
            return
        }

        if(receptBillItens.length !== itensTotalPrice.length ){
            toast.error('Preencha todos os dados de cada item adicionado à nota');
            return
        }

        let c = 0;

        itensTotalPrice.map((e) => (
            c += e.totalItemPrice
        ))

        setTotalPrice(c)

    }

    async function send(){

        if(totalPrice === 0){
            toast.error('Calcule o preço total antes de enviar');
            return
        }

        if(receptBillItens.length !== itensTotalPrice.length ){
            toast.error('Preencha todos os dados de cada item adicionado à nota antes de enviar');
            return
        }

        if(receptBillFormalData.emissionDate === '' || receptBillFormalData.receptBillNumber === '' || receptBillFormalData.supplier === ''){

            toast.error('Preencha todos os dados da nota fiscal');
            return

        }
        
        receptBillItens.map(async function(e, i){

                const body = {
                    itemId: e.itemId,
                    price: itensTotalPrice[i].unityPrice,
                    insertedQuantity: itensTotalPrice[i].quantity,
                    supplierId: Number(receptBillFormalData.supplier),
                    receiptBill: receptBillFormalData.receptBillNumber,
                    receiptBillEmissionDate: receptBillFormalData.emissionDate
                }

                console.log(body);

                await api.insertItemInStock(userData.token, body)

        })


        

        setReceptBillFormalData(
            {
                receptBillNumber: '',
                emissionDate: '',
                supplier: ''
            }
        )
        setReceptBillItens([])
        setReceptBillQuantity([])
        setItensTotalPrice([])
        setTotalPrice('')
        setUseEffectBool(!useEffectBool)
    
    }

    return(

        <>
        
            <Container>

                    <h3>Adicionar entrada</h3>

                    <InputsContainer>

                        <input 
                        value={receptBillFormalData.receptBillNumber} 
                        placeholder="Número da nota fiscal" 
                        onChange={(e) => setReceptBillFormalData(
                            
                                {
                                    receptBillNumber: e.target.value,
                                    emissionDate: receptBillFormalData.emissionDate,
                                    supplier: receptBillFormalData.supplier
                                }
                        )}

                        /> 

                    </InputsContainer>

                    <InputsContainer>

                        <input 
                        type='date' 
                        placeholder="Data da emissão"
                        value={receptBillFormalData.emissionDate}
                        onChange={(e) => setReceptBillFormalData(
                            
                            {
                                receptBillNumber: receptBillFormalData.receptBillNumber,
                                emissionDate: e.target.value,
                                supplier: receptBillFormalData.supplier
                            }
                        )}
                        />

                        <Select
                        onChange={(e) => setReceptBillFormalData(
                            
                            {
                                receptBillNumber: receptBillFormalData.receptBillNumber,
                                emissionDate: receptBillFormalData.emissionDate,
                                supplier: e.target.value
                            }
                        )}
                        >

                            <option value=''>Selecione um fornecedor</option>
                            {suppliers.map((s) => (

                                <option value={s.id}>{s.name}</option>

                            ))}

                        </Select>


                    </InputsContainer>

                    <ItensContainer>

                        

                            {receptBillItens.length === 0 
                            
                            ? 
                            
                            <h3>Adicione itens à nova nota fiscal</h3>

                            :

                                <>
                                
                                    {receptBillItens.map((e) => (

                                        <ReceptBillItensDisplay 
                                        e={e}
                                        receptBillItens={receptBillItens}
                                        setReceptBillItens={setReceptBillItens}
                                        receptBillQuantity={receptBillQuantity}
                                        setReceptBillQuantity={setReceptBillQuantity}
                                        itensTotalPrice={itensTotalPrice}
                                        setItensTotalPrice={setItensTotalPrice}
                                        />

                                    ))}
                                
                                </>
                            }

                    </ItensContainer>

                    <ButtonWrapper>
                        <Button onClick={set} width={"70%"} height={"50px"} fontsize={"13px"}>Calcular preço total</Button>
                    </ButtonWrapper>

                    <h3>Total: R${totalPrice}</h3>

            </Container>

            <Press onClick={send}>ENVIAR NOTA FISCAL</Press>
        
        </>


    )

}

const Select = styled.select`
margin: 2px 8px 2px 8px !important;
width: 30% !important;
height: 25px !important;
border: 1px solid #0F014D !important;
border-radius: 6px !important;
`

const Container = styled.div`
width: 80%;
height: auto;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
border: 2px solid #0F014D;
padding: 10px 5px 10px 5px;
border-radius: 10px;
margin: 0 0 0px 0;
flex-wrap: wrap;
h3{
    font-size: 15px !important;
    color: black; 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 5px  5px 10px 5px !important;
}
h5{
    font-size: 13px;
    color: #0F014D;
    line-height: 20px;
    margin-top: 5px;
    &:hover{
        color: green;
        cursor: pointer;
    } 
}
h4{
    font-size: 13px;
    color: #0F014D;
    line-height: 20px;
    margin-top: 5px;
    &:hover{
        color: red;
        cursor: pointer;
    }
}
img{
    width: 95px;
    height: 95px;
}
`
const InputsContainer = styled.div`
width: 98%;
min-height: 20px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 8px 8px 8px 8px;
margin: 0px 8px 0px 8px;
border-radius: 5px;
div{
    width: 90%;
    display: flex;
    flex-direction: row !important;
    align-items: center;
    justify-content: center;
}
form{
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
input{
    margin: 2px 8px 2px 8px !important;
    width: 30% !important;
    height: 25px !important;
    border: 1px solid #0F014D !important;
    border-radius: 6px !important;
    }
`
const ItensContainer = styled.div`
width: 88%;
min-height: 20px;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
border: 1px solid #0F014D;
padding: 15px 15px 0px 15px;
margin: 15px 8px 8px 8px;
border-radius: 5px;
div{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 0.5px solid #0F014D;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 10px 20px 10px 20px !important;
}

`

const Press = styled.button`
width: 25%;
height: 40px;
padding: 10px;
border-radius: 4px;
background-color: #0F014D;
border: none;
margin: 2% 0 5% 0;
color: white;
font-size: 15px;
font-weight: 700;
&:hover {
    background-color: #391FAA !important;
  }
`
