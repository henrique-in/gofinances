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
        const total = entriesTotal - expensiveTotal

        setTransactions(transactionsFormatted)
        setHighLighData({
            entries:{
            amount:entriesTotal.toLocaleString('pt-BR',{
            style: 'currency',
            currency: 'BRL'})
            },
            expensives:{
                amount:expensiveTotal.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'})
            },
            total:{
                amount: total.toLocaleString('pt-BR',{
                    style: 'currency',
                    currency: 'BRL'})
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
                 <S.Photo source={{uri:'https://avatars.githubusercontent.com/u/44737473?v=4'}}>

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
            lastTransaction="Última entrada dia 13 de abril"
            
            />
            <HighLightCard 
            type="down"
            title="Saida"
            amount={highLightData.expensives.amount}
            lastTransaction="Última saida dia 03 de abril"
            
            />
            <HighLightCard 
            type="total"
            title="Total" 
            amount={highLightData.total.amount}
            lastTransaction="01 a 13 de abril"
            
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
