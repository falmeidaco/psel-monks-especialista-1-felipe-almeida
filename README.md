# **Case Monks - Felipe Almeida**  

## **Sobre este repositório**  
Este projeto foi desenvolvido como parte do processo seletivo da **Agência Monks**. A aplicação consiste em uma página construída com **React**, enquanto a gestão de conteúdo é realizada via **WordPress**. Os dados exibidos no front-end são obtidos por meio da API do WordPress.  

### **Front-end**  
O front-end foi desenvolvido com **React**, utilizando o **Vite** para configuração do projeto. A estilização dos componentes foi feita com a biblioteca **styled-components**.  

Os dados consumidos da API incluem:  
- **Posts**  
- **Menus**  

### **Back-end**  
Para o back-end, foi utilizado o **WordPress CMS** para gerenciar o conteúdo da página. As principais implementações incluem:  
- **Tema personalizado**, permitindo maior controle sobre a exibição do conteúdo da landing page.  

Nenhum plugin adicional é necessário, pois toda a estrutura foi construída utilizando funcionalidades nativas do WordPress:  
- **Gerenciamento de menus**: Utiliza a funcionalidade padrão do WordPress.  
- **Gerenciamento de posts**: Baseado no tipo de conteúdo padrão (**post**), incluindo categorias e tags.  

Além disso, foram desenvolvidos **endpoints personalizados** para expor apenas os dados necessários ao front-end.  

📌 [Instruções para instalar todas as dependências](https://github.com/murillotorres/psel-monks-especialista-1-murillo/blob/main/install.md)  

---

## **Instalação do Projeto**  

1️⃣ **Clone o repositório**  
```bash
git clone https://github.com/falmeidaco/psel-monks-especialista-1-felipe-almeida.git
```  

2️⃣ **Acesse a pasta e inicialize o Docker**  
```bash
cd psel-monks-especialista-1-felipe-almeida
docker-compose up -d
```  

3️⃣ **Instale as dependências do Node**  
```bash
npm install
```  

✅ O processo de instalação do container já popula o banco de dados com registros e copia a pasta do tema para dentro da instalação do WordPress.  

---

## **Executando o projeto**  

Para rodar o projeto, utilize o comando:  
```bash
npm run dev
```  
O console exibirá o endereço de acesso à aplicação front-end.  

Para acessar o painel administrativo do WordPress, utilize:  
📌 **URL:** [http://localhost:8000](http://localhost:8000)  

🔐 **Credenciais de acesso ao WordPress:**  
- **Usuário:** monks  
- **E-mail:** monks  
