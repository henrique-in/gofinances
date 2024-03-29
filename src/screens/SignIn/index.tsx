import React from "react";
import { Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import AppSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import SignSocialButton from "../../components/SignSocialButton";
import { useAuth } from "../../hooks/auth";

import * as S from "./styles";

export function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google");
    }
  }

  async function handleSignInWithApple() {
    try {
      await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a Apple");
    }
  }

  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <S.Title>
            Controle suas {"\n"}
            finanças de forma{"\n"}
            muito simples
          </S.Title>
          <S.SignInTitle>
            Faça seu login com{"\n"}
            uma das contas abaixo
          </S.SignInTitle>
        </S.TitleWrapper>
      </S.Header>

      <S.Footer>
        <S.FooterWrapper>
          <SignSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          <SignSocialButton
            title="Entrar com Apple"
            svg={AppSvg}
            onPress={handleSignInWithApple}
          />
        </S.FooterWrapper>
      </S.Footer>
    </S.Container>
  );
}
