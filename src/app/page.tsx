import { useState } from 'react';
import Link from 'next/link';

export default function Home({ carros }) {
  const [selecionados, setSelecionados] = useState([]);

  const toggleSelecao = (carro) => {
    const jaSelecionado = selecionados.includes(carro);
    setSelecionados(jaSelecionado ? selecionados.filter(c => c !== carro) : [...selecionados, carro]);
  };

  return (
    <div>
      <h1>Selecione suas marcas e modelos favoritos</h1>
      {carros.map((carro) => (
        <div key={carro.id}>
          <label>
            <input type="checkbox" checked={selecionados.includes(carro)} onChange={() => toggleSelecao(carro)} />
            {carro.marca} {carro.modelo}
          </label>
        </div>
      ))}
      <Link href={{ pathname: '/recomendacoes', query: { carros: selecionados.map(c => c.id) } }}>
        <a>Ver recomendações</a>
      </Link>
    </div>
  );
}

export async function getStaticProps() {
  // Substitua com a lógica de busca dos carros do seu backend.
  // const res = await fetch('http://seu-backend/carros');
  // const carros = await res.json();

  // Lista estática de carros
  const carros = [
    { id: 1, marca: 'Marca 1', modelo: 'Modelo 1' },
    { id: 2, marca: 'Marca 2', modelo: 'Modelo 2' },
    { id: 3, marca: 'Marca 3', modelo: 'Modelo 3' },
    // Adicione mais carros conforme necessário
  ];

  return {
    props: {
      carros,
    },
  };
}
