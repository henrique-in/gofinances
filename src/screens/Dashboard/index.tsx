import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import {HighLightCard} from '../../components/HighLightCard'
import {TransactionCard,TransactionCardProps} from '../../components/TransactionCard'

import { useTheme} from 'styled-components'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from "@react-navigation/native"

import * as S from './styles'

export interface DataListProps extends TransactionCardProps{
    id: string;
}

interface HighLighProps{
    amount:string
    lastTransaction:string
}

interface HighLightData{
    entries: HighLighProps;
    expensives:HighLighProps;
    total:HighLighProps;
}

export function Dashboard() {
    const dataKey = '@gofinances:transactions';  

    const [transactions, setTransactions] = useState<DataListProps[]>([])
    const [highLightData, setHighLighData] = useState<HighLightData>({} as HighLightData)
    const [isLoading, setIsLoading] = useState(true)

    const theme = useTheme()


    function getLastTransactionDate(collection: DataListProps[],type:'positive' | 'negative'){
      
        const lastTransaction = new Date(
        Math.max.apply(Math,collection
        .filter(transaction => transaction.type === type)
        .map( transaction => new Date(transaction.date).getTime())))
       
       return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR',{month:'long'})}`;
    }

    async function loadTransactions(){
        const response = await AsyncStorage.getItem(dataKey)
        const transaction = response ? JSON.parse(response) : []

        let entriesTotal = 0;
        let expensiveTotal = 0;
        
        const transactionsFormatted: DataListProps[] = transaction
        .map((item: DataListProps) =>{

            if(item.type === 'positive'){
                entriesTotal += Number(item.amount);

            }else {
                expensiveTotal += Number(item.amount);
            }

            const amount = Number(item.amount).toLocaleString('pt-BR',{
                style:'currency',
                currency:'BRL'
            })

       
            const date = Intl.DateTimeFormat('pt-BR',{
                day:'2-digit',
                month:"2-digit",
                year:'2-digit'
            }).format(new Date(item.date))

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date
            }

        })
      

        setTransactions(transactionsFormatted)

        const lastTransactionsEntries = getLastTransactionDate(transaction,'positive')
        const lastTransactionsExpensives = getLastTransactionDate(transaction,'negative')

        const totalInteval = `01 a ${lastTransactionsExpensives}`

        const total = entriesTotal - expensiveTotal

        setHighLighData({
            entries:{
                amount:entriesTotal.toLocaleString('pt-BR',{
                style: 'currency',
                currency: 'BRL'}),
                lastTransaction:`Última entrada dia ${lastTransactionsEntries}`
            },
            expensives:{
                amount:expensiveTotal.toLocaleString('pt-BR',{
                style: 'currency',
                currency: 'BRL'}),
                lastTransaction:`Última entrada dia ${lastTransactionsExpensives}`
            },
            total:{
                amount: total.toLocaleString('pt-BR',{
                style: 'currency',
                currency: 'BRL'}),
                lastTransaction:totalInteval
            }

        })
        setIsLoading(false)

    }

    useEffect(() => {
        loadTransactions()
 
    }, [])

    useFocusEffect(useCallback(()=>{
        loadTransactions()
    },[]))

    return (
        <S.Container>

          
        {
            isLoading ? 
            <S.LoadContainer>

                <ActivityIndicator 
                color={theme.colors.primary} 
                size="large" /> 

            </S.LoadContainer>  :
        <>
         <S.Header>
            <S.UserWrapper>
             <S.UserInfo>
                 <S.Photo source={require('./ricktoon.jpeg')}>

                 </S.Photo>

                 <S.User>
                     <S.UserGreeting>Olá</S.UserGreeting>
                     <S.UserName>Henrique</S.UserName>
                 </S.User>
             </S.UserInfo>
                <S.LogoutButton onPress={()=>{}}>
                    <S.Icon name="power" />
                </S.LogoutButton>
             </S.UserWrapper>
             
         </S.Header>
         
         <S.HighLightCards>
            <HighLightCard 
            type="up"
            title="Entradas" 
            amount={highLightData.entries.amount}
            lastTransaction={highLightData.entries.lastTransaction}
            
            />
            <HighLightCard 
            type="down"
            title="Saida"
            amount={highLightData.expensives.amount}
            lastTransaction={highLightData.expensives.lastTransaction}
            
            />
            <HighLightCard 
            type="total"
            title="Total" 
            amount={highLightData.total.amount}
            lastTransaction={highLightData.total.lastTransaction}
            
            />
         </S.HighLightCards>
         
         <S.Transactions>
             <S.Title>
                 Listagem
             </S.Title>

             <S.TransactionsList
             data={transactions}
             keyExtractor={item => item.id}
             renderItem={({item})=> <TransactionCard data={item}/>}
             />
             
         </S.Transactions>
        </>
        }
        </S.Container>
    )
}
