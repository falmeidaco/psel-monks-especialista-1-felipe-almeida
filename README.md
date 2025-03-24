# **Case Monks**

## **Sobre este repositório**
Este projeto foi construído como entrega do case do para o processo seletivo da Agência Monks. A aplicação consiste em uma página desenvolvida com **React** e tem como gestão uma aplicação de **WordPress**. Os dados consumidos do front-end são resgatados da API do WordPress.

### **Sobre o front-end**
A aplicação foi construída utilizando a biblioteca React (instalado pelo Vite). O projeto react utiliza a biblioteca **styled** para a estilização dos componentes. 
A aplicação resgata da API construída, os dados para exibição da página:
- Posts
- Menus

### **Sobre o back-end**
Para o back-end, foi utilizado o CMS Wordpress para gestão dos conteúdos da página. Foi construído:
- Tema personalizado para personalização da lógica de acordo com os conteúdos da landinpage

O CMS não utiliza nenhum outro plugin como pré-requisito. As estrutura foi construída utilizando as funcionalidades já disponíveis no Wordpress:
- Para gestão dos menus foi utilizado a funcionalidade padrão de gerenciamento de menus;
- Para gestão dos posts, foi utilizado o tipo de conteúdo padrão (post) com suas as categorias e tags;

Foi desenvolvido end-points customizados para expor apenas os dados necessários consumidos pelo front-end da página

[Instruções para instalar todas essas depêndencias](https://github.com/murillotorres/psel-monks-especialista-1-murillo/blob/main/install.md)

## **Instalação do Projeto**
1. Faça o clone deste repositório para uma pasta na máquina local
```bash
git clone https://github.com/falmeidaco/psel-monks-especialista-1-felipe-almeida.git
```
2. Acesse a pasta pelo terminal e construa o container do docker
```bash
cd psel-monks-especialista-1-felipe-almeida
docker-compose up -d
```
3. Após concluído o processo, instale as dependências do Node
```bash
npm install
```

A instalação do container já popula o banco de dados com registros e copia a pasta do tema para dentro da instalação do WordPress

## **Rodando o projeto**

Após a instalação, para acessar o projeto, pasta executar o comando
```bash
npm run dev
```
Será disponibilizado no console, o endereço de acesso da aplicação front-end.

Para gestão do back-end, o acesso ao painel do WordPress estará disponível pelo endereço http://localhost:8000

🔐 As credencias de acesso do WordPress são:

* E-mail: monks
* Usuário: monks