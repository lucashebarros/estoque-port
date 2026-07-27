"use client";

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, Link as LinkIcon } from 'lucide-react';
import data from './data.json'; // O arquivo JSON que você gerou

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#1e1e2f] text-gray-200 p-8 font-sans">
      
      {/* Header */}
      <header className="flex items-center justify-center gap-3 mb-12">
        <h1 className="text-4xl font-bold text-[#b48eed]">Sistema de Gestão de Estoque</h1>
        <Package className="text-[#e5b583]" size={36} />
        <LinkIcon className="text-gray-400" size={24} />
      </header>

      {/* Título e KPIs */}
      <section className="mb-10">
        <h2 className="text-3xl font-semibold text-[#b48eed] mb-6">Sistema de Gestão de Estoque</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <KpiCard title="Valor Total do Estoque" value={`R$ ${data.kpis.valorTotal.toLocaleString('pt-BR')}`} />
          <KpiCard title="Total de Produtos" value={data.kpis.totalProdutos} />
          <KpiCard title="Total de Movimentações" value={data.kpis.totalMovimentacoes} />
          <KpiCard title="Total de Clientes" value={data.kpis.totalClientes} />
        </div>
      </section>

      {/* Formulário: Cadastro de Produtos (Visual) */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#b48eed] mb-6">Cadastro de Produtos</h2>
        <div className="bg-[#252538] p-6 rounded-lg border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <InputGroup label="Código do Produto" type="text" />
            <InputGroup label="Quantidade Inicial" type="number" defaultValue="0" />
            <InputGroup label="Fornecedor" type="text" />
            
            <InputGroup label="Nome do Produto" type="text" />
            <InputGroup label="Quantidade Mínima" type="number" defaultValue="0" />
            <div className="hidden md:block"></div> {/* Espaçador */}

            <div className="flex flex-col">
              <label className="text-sm mb-2">Categoria</label>
              <select className="bg-[#1e1e2f] border border-gray-600 rounded p-2 text-white">
                <option>Suspensão e Freios</option>
                <option>Motor</option>
                <option>Transmissão</option>
              </select>
            </div>
            <InputGroup label="Custo Unitário (R$)" type="text" defaultValue="0,00" />
          </div>
          <button className="bg-transparent border border-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors">
            Cadastrar Produto
          </button>
        </div>
      </section>

      {/* Tabela: Produtos em Estoque */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#b48eed] mb-6">Produtos em Estoque</h2>
        <div className="overflow-x-auto bg-[#252538] rounded-lg border border-gray-700">
          <table className="w-full text-sm text-left">
            <thead className="bg-[#1e1e2f] border-b border-gray-700">
              <tr>
                <th className="p-4">Código</th>
                <th className="p-4">Nome</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Quantidade</th>
                <th className="p-4">Qtd mínima</th>
                <th className="p-4">Custo unitário (R$)</th>
                <th className="p-4">Fornecedor</th>
                <th className="p-4">Valor Total (R$)</th>
              </tr>
            </thead>
            <tbody>
              {data.produtos.map((prod, idx) => (
                <tr key={idx} className="border-b border-gray-700 hover:bg-[#2a2a40]">
                  <td className="p-4">{prod.codigo}</td>
                  <td className="p-4">{prod.nome}</td>
                  <td className="p-4">{prod.categoria}</td>
                  <td className="p-4">{prod.quantidade}</td>
                  <td className="p-4">{prod.minima}</td>
                  <td className="p-4">{prod.custo}</td>
                  <td className="p-4">{prod.fornecedor}</td>
                  <td className="p-4">{prod.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Gráfico de Movimentações */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-[#b48eed] mb-6">Gráfico de Movimentação por Tipo</h2>
        <div className="bg-[#1e1e2f] p-6 rounded-lg border border-gray-700 h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.grafico}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip cursor={{fill: '#2a2a40'}} contentStyle={{ backgroundColor: '#1e1e2f', borderColor: '#374151' }} />
              <Bar dataKey="valor" fill="#7dd3fc" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

    </div>
  );
}

// Sub-componentes auxiliares para manter o código limpo
function KpiCard({ title, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-gray-400 mb-1">{title}</span>
      <span className="text-3xl font-normal text-white">{value}</span>
    </div>
  );
}

interface InputGroupProps {
  label: string;
  type: string;
  defaultValue?: string | number; // <-- Added '?' to make it optional
}

export function InputGroup({ label, type, defaultValue = "" }: InputGroupProps) {
  return (
    <div>
      <label>{label}</label>
      <input type={type} defaultValue={defaultValue} />
    </div>
  );
}