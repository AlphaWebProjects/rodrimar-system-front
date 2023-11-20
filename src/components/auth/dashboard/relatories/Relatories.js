import styled from "styled-components"
import api from "../../../../services/API"
import { toast } from "react-toastify"
import { ButtonWrapper } from "../../ButtonWrapper"
import Button from "../../../../common/form/Button"
import { useContext, useState, useEffect } from "react"
import { DatePicker } from "@material-ui/pickers"
import moment from "moment/moment"
import UserContext from "../../../../context/UserContext"


export default function Relatories(){

    const { userData } = useContext(UserContext);

    const [filteredInsertedItens, setFilteredInsertedItens] = useState([])
    const [filteredDeletedItens, setFilteredDeletedItens] = useState([])
    const [insertedItens, setInsertedItens] = useState([])
    const [filteredItens, setFilteredItens] = useState([])
    const [allItens, setAllItens] = useState([])
    const [allImages, setAllImages] = useState([])
    const [days, setDays] = useState('');
    const [choosedDate, setChoosedDate] = useState({start: '', end: ''})
    const [deletedItens, setDeletedItens] = useState([])
    const [totalInsertedItensPrice, setTotalInsertedItensPrice] = useState(0)
    const [totalDeletedItensPrice, setTotalDeletedItensPrice] = useState(0)
    const [receiptBillNumbersArr, setReceiptBillNumbersArr] = useState([])
    const [receiptBillNumberValue, setReceiptBillNumberValue] = useState('')

    useEffect(() => {
        
        async function getAll(){

            try {
                const getInsertedItens = await api.getAllInsertedItens(userData.token)
                const getAllItens = await api.getAllItens(userData.token)
                const getAllImages = await api.getAllImages(userData.token)
                const getAllDeletedItens = await api.getDeletedItens(userData.token)

                let filteredItensArr = []
                let receiptBillArr = []

                for(let c = 0; c < getAllItens.data.length; c++){

                    for(let i = 0; i < getInsertedItens.data.length; i++){

                        if(!receiptBillArr.includes(`${getInsertedItens.data[i].receiptBill} - ${getInsertedItens.data[i].receiptBillEmissionDate}`)){
                            receiptBillArr.push(`${getInsertedItens.data[i].receiptBill} - ${getInsertedItens.data[i].receiptBillEmissionDate}`)
                        }

                        if(getAllItens.data[c].itemId === getInsertedItens.data[i].itemId){
                            filteredItensArr.push(getAllItens.data[c])
                            break
                        }

                    }
                } 
                console.log(receiptBillArr)
                setReceiptBillNumbersArr(receiptBillArr)
                setDeletedItens(getAllDeletedItens.data)
                setFilteredItens(filteredItensArr)
                setInsertedItens(getInsertedItens.data)
                setAllImages(getAllImages.data)
                setAllItens(getAllItens.data)

                return

            } catch (error) {
                console.log(error)
                toast.error('Não foi possível obter todos os dados')
            }

        };

        getAll();
        
      }, []);

      async function generalFilter(){

        if(insertedItens.length === 0){
            toast.dark('Não há nenhum item inserido no estoque no momento.');
            return
        }

        if(days === '' && (choosedDate.start === '' || choosedDate.end === '')){
            toast.dark('Selecione uma forma de filtragem');
            return
        }

        let filteredInsertedItensArr = [];
        let filteredInsertedItensTotalPrice = 0;

        let filteredDeletedItensArr = [];
        let filteredDeletedItensTotalPrice = 0;

        if(choosedDate.start !== '' && choosedDate.end !== ''){

            const start = moment(choosedDate.start).format('L')
            const end = moment(choosedDate.end).format('L');

            const startDateMoment = moment(start);
            const endDateMoment = moment(end);
            const choosedDateDifference = endDateMoment.diff(startDateMoment, 'days');

            if(choosedDateDifference <= 0){
                toast.dark('Selecione um espaço de tempo válido')
                return
            }

            insertedItens.map(function(e){

                const insertedItemDate = moment(e.createdAt).format('L');
                const insertedItemDateMoment = moment(insertedItemDate)

                const insertedItemDateDifference = endDateMoment.diff(insertedItemDateMoment, 'days')

                if(insertedItemDateDifference <= choosedDateDifference){
                    filteredInsertedItensArr.push(e);
                    filteredInsertedItensTotalPrice += Number(e.price)
                }

            })

            deletedItens.map(function(e){

                const deletedItemDate = moment(e.createdAt).format('L');
                const deletedItemDateMoment = moment(deletedItemDate)

                const deletedItemDateDifference = endDateMoment.diff(deletedItemDateMoment, 'days')

                if(deletedItemDateDifference <= choosedDateDifference){
                    filteredDeletedItensArr.push(e)
                    filteredDeletedItensTotalPrice += Number(e.deletedItem.price)
                }

            })

            setFilteredInsertedItens(filteredInsertedItensArr)
            setTotalInsertedItensPrice(filteredInsertedItensTotalPrice)

            setFilteredDeletedItens(filteredDeletedItensArr)
            setTotalDeletedItensPrice(filteredDeletedItensTotalPrice)

            return 

        }else{

            insertedItens.map(function(e){

                const today = moment().format('L');
                const set = moment(e.createdAt).format('L')
        
                const startDateMoment = moment(set);
                const endDateMoment = moment(today);

                const difference = endDateMoment.diff(startDateMoment, 'days');
        
                if(difference <= Number(days)){
                    filteredInsertedItensArr.push(e);
                    filteredInsertedItensTotalPrice += Number(e.price)
                }

            })

    
            deletedItens.map(function(e){

                const today = moment().format('L');
                const set = moment(e.createdAt).format('L')
        
                const startDateMoment = moment(set);
                const endDateMoment = moment(today);

                const difference = endDateMoment.diff(startDateMoment, 'days');
        
                if(difference <= Number(days)){
                    filteredDeletedItensArr.push(e);
                    filteredDeletedItensTotalPrice += Number(e.deletedItem.price)
                }
            })

            setFilteredInsertedItens(filteredInsertedItensArr)
            setTotalInsertedItensPrice(filteredInsertedItensTotalPrice)

            setFilteredDeletedItens(filteredDeletedItensArr)
            setTotalDeletedItensPrice(filteredDeletedItensTotalPrice)

            return

        }

        

      }

    return(
        <>
        
            <Container>
                
                <h1> Relatórios </h1>

                <label htmlFor="selectBox">Filtrar por dias:</label>
                <Select onChange={(e) => setDays(e.target.value)}>

                    <option value=''>Selecione</option>
                    <option value={1}>últmio dia</option>
                    <option value={3}>últimos 3 dias</option>
                    <option value={7}>últimos 7 dias</option>
                    <option value={15}>últimos 15 dias</option>
                    <option value={30}>últimos 30 dias</option>
                    <option value={90}>últimos 90 dias</option>

                </Select>

                <label htmlFor="selectBox">ou selecione uma data específica:</label>

                <h2>De: </h2>
                <Datepicker value={choosedDate.start} onChange={(e) => setChoosedDate({start: e.target.value, end: choosedDate.end})} type='date'/>

                <h2>Até: </h2>
                <Datepicker value={choosedDate.end} onChange={(e) => setChoosedDate({start: choosedDate.start, end: e.target.value})} type='date'/>

                <h3 onClick={() => setChoosedDate({start: '', end: ''})} >resetar datas</h3>

                <label htmlFor="selectBox">Filtrar por número de nota fiscal:</label>
                <Select onChange={(e) => setReceiptBillNumberValue(e.target.value)}>

                    <option value='all'>Todas</option>
                    {receiptBillNumbersArr.map((r) => (
                        <option value={r.split(' ')[0]} > {r.split(' ')[0]} - emitida em {moment(r.split(' - ')[1]).format('DD/MM/YYYY')} </option>
                    ))}

                </Select>

                <ButtonWrapper width={"40%"}>
                    <Button onClick={generalFilter} width={"50%"} height={"50px"}>{"Buscar"}</Button>
                </ButtonWrapper>
                
                
                <RelatoryBoard>

                    {filteredInsertedItens.length >= 1 ? 
                
                        <>
                        
                            <h1>Baixas</h1>

                            <p>Total de baixas: {deletedItens.length}</p>

                            <p>Valor total: R${totalDeletedItensPrice.toFixed(2)}</p>

                            <Site>

                                {filteredDeletedItens.map((e) => (

                                    <>
                                        <div>

                                            <img src={allImages.filter((i) => i.id === e.deletedItem.item.imageId)[0].imageUrl}/> 

                                            <h2>{e.deletedItem.item.name}</h2>

                                            <h2>Em: {moment(e.createdAt).format('L')}</h2>

                                            <h2>Por: {e.deletedBy.userName} ({e.deletedBy.userRole})</h2>

                                            <h2>Para a placa: {e.licensePlate.licenseName}</h2>

                                            <h2>Quantidade: {e.deletedQuantity}</h2>

                                            <h2>Valor por unidade: {e.deletedItem.price}</h2>

                                        </div>
                                    </>

                                ))}

                            </Site>

                            <h1>Inserções</h1>

                            <p>Total de inserções: {insertedItens.length}</p>

                            <p>Valor total: R${totalInsertedItensPrice.toFixed(2)}</p>

                            <Site>

                                {filteredInsertedItens.map((e) => (

                                    <>
                                        <div>

                                            <img src={filteredItens.filter((i) => i.itemId === e.itemId)[0].imageUrl}/> 

                                            <h2>{e.item.name}</h2>

                                            <h2>Em: {moment(e.createdAt).format('L')}</h2>

                                            <h2>Por: {e.createdBy.name} ({e.createdBy.role})</h2>

                                            <h2>Quantidade: {e.insertedQuantity}</h2>

                                            <h2>Valor por unidade: R${e.price}</h2>
                                        </div>
                                    </>

                                ))}

                            </Site>
                        
                        </>

                        : <h2> Selecione um filtro em que há atividade </h2>

                
                    }

                </RelatoryBoard>
                

            </Container>


        </>
    )

}

const Container = styled.div`
width: 90%;
height: auto;
border-radius: 15px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
border: 4px solid #0F014D;
padding: 25px 15px 25px 15px;
flex-wrap: wrap;
h1{
    margin-bottom: 15px;
}
h2{
    margin: 15px 3px 5px 0;
    font-size: 18px;
}
h3{
    margin: -5px 0 20px 0;
    font-size: 12px;
    &:hover{
        cursor: pointer;
        color: red;
    }
}
label{
    font-size: 18px;
    margin: 10px 0 0 0;
}
`
const Select = styled.select`
width: 25%;
height: 40px;
border: none;
border-radius: 10px;
margin-bottom: 15px;
margin-top: 10px;
`
const Datepicker = styled.input`
width: 200px;
height: 40px;
font-size: 18px;
text-align: center;
margin: 0 0 15px 0;
border-radius: 8px;
`
const Site = styled.div`
flex-wrap: wrap;
display: flex;
align-items: center;
justify-content: center;
flex-direction: row;
padding: 40px;
width: auto;
border: 2px solid #0F014D;
width: auto;
border-radius: 12px;
margin-top: 15px;
margin-bottom: 70px;
h2{
    font-size: 15px !important;
    margin: 5px ;
}
img{
    width: 50px;
    height: 50px;
}
div{
    
    margin: 10px;
    border: 1px solid #0F014D;
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
}
p{
    font-size: 30px !important;
    margin-top: 40px !important;
}
`
const RelatoryBoard = styled.div`
display: flex;
align-items: center;
flex-direction: column;
padding: 20px;
border: 2px solid #0F014D;
width: auto;
border-radius: 12px;
margin: 0 0 0 0;
background-color: white;
margin: 28px 0 0 0; 
h1{
    font-size: 35px;
}
p{
    font-size: 16px;
    margin-top: 10px;
}
`

