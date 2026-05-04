## Casos de Uso:

### Caso de uso 1: Efetuar cadastro.

#### Atores:

- Cliente.
  
#### Fluxo principal:

- O cliente seleciona a opção “Criar conta”.
  
- O sistema leva o usuário até a tela de registro contendo um formulário.
  
- O cliente preenche os campos do formulário (informando nome, e-mail e criando uma senha).
  
- O sistema consulta o banco de dados para verificar a disponibilidade das informações fornecidas.
  
- O banco de dados retorna uma confirmação positiva.
  
- O sistema realiza o cadastro, salvando os dados do novo usuário.
  
- O sistema encaminha o usuário para a página principal do site.




### Caso de Uso 2: Efetuar login.

#### Atores: 

- Usuário.

#### Fluxo principal:

- O usuário seleciona a opção "Login".

- O sistema leva o usuário até a tela de preenchimento de senha e email.

- O usuário preenche os campos da tela.

- O sistema consulta o banco de dados para a confirmação dos dados inseridos.

- O banco de dados retorna uma confirmação positiva.

- O sistema encaminha o usuário para a página principal do site.




### Caso de Uso 3: Buscar livros.

#### Atores: 

- Usuário.
Regras de uso

#### Fluxo principal: 

- O sistema apresenta a página inicial do site.

- O usuário aperta na barra de pesquisa.

- O usuário digita o livro que deseja, o gênero de livro que deseja ou o autor.

- O usuário aperta no botão "Enter".

- O sistema consulta o banco de dados.

- O banco retorna os livros.

- Os livros são exibidos.




### Caso de Uso 4: Comentar.
 
#### Atores: 

- Usuário.

#### Regras de uso: O cliente pode comentar e apagar o comentário. O administrador só pode apagar um comentário.

#### Fluxo principal:  

- O cliente abre a aba de um livro específico.

- O cliente aperta em um botão de comentário.

- O sistema abre uma página de comentários do tal livro.

- O cliente escreve o seu comentário.

- O cliente aperta em um botão de publicar em comentário.

- O sistema pede confimação do usuário.

- O cliente confirma a publicação.

- O sistema publica o comentário.




### Caso de Uso 5: Efetuar aluguel.

#### Atores: 

- Administrador.

#### Fluxo principal:  

- O administrador inicia o processo de aluguel.

- O administrador preenche o código do livro a ser alugado.

- O sistema exibe os dados do livro a ser alugado.

- O administrador preenche a identificação do cliente.

-O sistema exibe um prazo pra devolução. 
  
- O administrador finaliza o aluguel e é redirecionado para a pagina inicial.


 

### Caso de Uso 6: Finalizar aluguel.

#### Atores: 

- Administrador.

#### Fluxo principal:  

- O administrador abre a página de aluguéis do cliente.

- O administrador clica na opção de dar baixa no livro.

- O sistema pede confirmação.

- O administrador confirma.

- O sistema volta pra página inicial.




### Caso de Uso 7: Gerenciar livros.

#### Atores: 

- Administrador.

#### Fluxo principal:  

- O administrador abre a página de um livro.

- O administrador aperta no botão de editar livro.

- O administrador escolhe o que quer editar.

- O administrador edita.

- O administrador aperta no botão de editar.

- O sistema pede confirmação.

- O administrador confirma.

- O sistema avisa que a edição foi feita.




### Caso de Uso 8: Gerenciar usuários.

#### Atores: 

- Administrador.

#### Fluxo principal: 

- O administrador vai para a página de usuários.

- O administrador escolhe um usuário.

- O administrador clica no perfil do usuário.

- O administrador entra no perfil do usuário.

- O administrador clica no botão de apagar usuário.

- O sistema pede confirmação.

- O administrador confirma.

- O sistema apaga o usuário.

- O sistema manda uma mensagem de que o usuário foi apagado.




### Caso de Uso 9: Gerenciar perfil.

#### Atores:

- Cliente.

#### Fluxos principal:

- O cliente clica no ícone do próprio perfil.

- O sistema abre a página do perfil do cliente.

- O cliente clica em editar informações do perfil.

- O cliente edita as informações do perfil.

- O cliente clica no botão de editar.

- O sistema pede confirmação.

- O cliente confirma.

- O sistema edita as informações.

- O sistema manda uma mensagem dizendo que a edição foi feita.




### Caso de Uso 10: Efetuar multa.

#### Atores:

- Administrador.

#### Fluxo principal: 

- O administrador entra no perfil do usuário.

- O administrador verifica que ele passou do prazo.

- O administrador clica em multar o usuário.

- O sistema pede confirmação.

- O administrador confirma.

- O sistema multa o usuário.

- O sistema manda uma mensagem dizendo que a multa foi feita.
