import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {HighLightCard} from '../../components/HighLightCard'
import {TransactionCard,TransactionCardProps} from '../../components/TransactionCard'

import * as S from './styles'

export interface DataListProps extends TransactionCardProps{
    id: string;
}

export function Dashboard() {

    const data: DataListProps[]= [{
        id:'1',
        type:'positive',
        title:"Desenvolvimento",
        amount:"R$ 12.000,00",
        category:{
            name:"Vendas",
            icon:'dollar-sign'     
        },
         date:"13/03/21"
    },
    {
        id:'2',
        type:'negative',
        title:"Bobs",
        amount:"R$ 45,00",
        category:{
            name:"Alimentação",
            icon:'coffee'     
        },
         date:"10/03/21"
    },
    {   
        id:'3',
        type:'negative',
        title:"Aluguel",
        amount:"R$ 900,00",
        category:{
            name:"Casa",
            icon:'shopping-bag'     
        },
         date:"09/03/21"
    }
    ]

    return (
        <S.Container>
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
            amount="R$ 17.400,00" 
            lastTransaction="Última entrada dia 13 de abril"
            
            />
            <HighLightCard 
            type="down"
            title="Saida" 
            amount="R$ 1.400,00" 
            lastTransaction="Última saida dia 03 de abril"
            
            />
            <HighLightCard 
            type="total"
            title="Total" 
            amount="R$ 17.400,00" 
            lastTransaction="01 a 13 de abril"
            
            />
         </S.HighLightCards>
         
         <S.Transactions>
             <S.Title>
                 Listagem
             </S.Title>

             <S.TransactionsList
             data={data}
             keyExtractor={item => item.id}
             renderItem={({item})=> <TransactionCard data={item}/>}
             />
             
         </S.Transactions>
        
        </S.Container>
    )
}
