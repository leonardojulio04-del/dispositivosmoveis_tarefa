import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

// OBSERVABLE - Controla e comunica as mudanças de cor
const observableCor = {
  cor: 'blue',
  observadores: [],

  inscrever(callback) {
    this.observadores.push(callback);

    return () => {
      this.observadores = this.observadores.filter(
        (observador) => observador !== callback
      );
    };
  },

  alterarCor(novaCor) {
    this.cor = novaCor;

    this.observadores.forEach((callback) => {
      callback(novaCor);
    });
  }
};

// PASSO 1 - COMPONENTE DO BOTÃO
function BotaoCor() {

  const [corAtual, setCorAtual] = useState('blue');

  function mudarCor() {

    const novaCor = corAtual === 'blue' ? 'red' : 'blue';

    setCorAtual(novaCor);

    observableCor.alterarCor(novaCor);
  }

  return (
    <TouchableOpacity
      style={styles.botao}
      onPress={mudarCor}
    >
      <Text style={styles.textoBotao}>
        Alterar Cor
      </Text>
    </TouchableOpacity>
  );
}

// PASSO 2 - COMPONENTE DO TEXTO
function TextoColorido() {

  const [corTexto, setCorTexto] = useState(observableCor.cor);

  useEffect(() => {

    const cancelarInscricao = observableCor.inscrever((novaCor) => {
      setCorTexto(novaCor);
    });

    return () => {
      cancelarInscricao();
    };

  }, []);

  return (
    <Text style={[styles.texto, { color: corTexto }]}>
      Programação de Dispositivos Móveis
    </Text>
  );
}

// PASSO 3 - COMBINAR OS COMPONENTES
export default function App() {

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Atividade React Native
      </Text>

      <TextoColorido />

      <BotaoCor />

    </View>
  );
}

// ESTILIZAÇÃO DA TELA
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
    textAlign: 'center',
  },

  texto: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  botao: {
    backgroundColor: '#333',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

});
