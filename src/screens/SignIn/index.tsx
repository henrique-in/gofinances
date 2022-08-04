import React,{useContext} from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AppSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import SignSocialButton from '../../components/SignSocialButton';
import { useAuth } from '../../hooks/auth';

 import  * as S from './styles';

export function SignIn(){
    const {user} = useAuth()
    
  return (
    <S.Container>
        <S.Header>
            <S.TitleWrapper>
                <LogoSvg
                  width={RFValue(120)}
                  height={RFValue(68)}
                />
                <S.Title>
                    Controle suas {'\n'} 
                    finanças de forma{'\n'}
                     muito simples
                </S.Title>
                <S.SignInTitle>
                    Faça seu login com{'\n'}
                    uma das contas abaixo
                </S.SignInTitle>
            </S.TitleWrapper>
        </S.Header>

        <S.Footer>
            <S.FooterWrapper>
                <SignSocialButton title='Entrar com Google' svg={GoogleSvg}/>
                <SignSocialButton title='Entrar com Google' svg={AppSvg}/>
            </S.FooterWrapper>
        </S.Footer>

    </S.Container>
  )
}

