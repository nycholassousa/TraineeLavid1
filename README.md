# Trainee Lavid Web
Primeira atividade prática para o Trainee Web no LAViD

## Atividade Proposta
1.1 Crie um webservice utilizando a tecnologia Node.js com uma porta a sua escolha.

1.2 O webservice deve ser capaz de receber um POST com um parâmetro servico, esse parâmetro pode receber três valores que são: vídeo, audio ou legenda. Exemplo, enviar uma requisição do tipo POST para: 

	http://<IP>:<PORTA>

Caso não seja passado um dos três valores o webservice deve retornar uma mensagem de erro informando que o tipo de serviço enviado é inválido.
Dependendo do tipo de servico, deve ser obrigatório haver um parâmetro correspondente ao nome do servico. Exemplo: caso o tipo de serviço seja vídeo, deve ser passado o parâmetro vídeo com um vídeo, mesmo caso para os serviços de áudio e legenda, o tratamento de erro deve ser feito afim de evitar que o parâmetro correspondente ao tipo de serviço não seja enviado. 
O arquivo enviado no parâmetro correspondente ao tipo de serviço deve ser armazenado na pasta uploads para utilização posterior, o nome do arquivo deve ser o ID da requisição.

1.3 O webservice deve ter um banco de dados para guardar as requisições aos serviços, não é exigido nenhum tipo especifico mas recomendamos a utilização do MongoDB. A tabela que vai guardar as requisições devem ter os seguintes campos:

	service: Armazena o tipo de serviço solicitado.
	id: Deve armazenar o id da requisição.
	ip: IP de quem fez a solicitação.
	Link: Link para acessar o arquivo que foi enviado no parâmetro correspondente ao nome do tipo do serviço.
	created_at: Data/hora dia em que a requisição foi enviada.

Ao receber uma requisição e ela for validada (ou seja, se tiver o seu tipo de serviço e o arquivo correspondente ao serviço), deve4se retornar o id da requisição.

1.4 Funcionalidade onde seja possível visualizar (GET) de todas as requisições enviadas ao sistema ou buscar uma requisição com um id especifico, o retorno deve ser um JSON com todas as informações de todas as requisições ou somente as informações da requisição do ID correspondente.
Deve haver um endereço /requests que seja possível listar todas e um /requests/ID para listar o id especifico.

## Objetivos Alcançados
POST sendo feito de forma correta, porém ainda falta algumas alterações (o nome do arquivo precisa ser o id, e não o nome original)

	http://ip:porta/

GET retornando todos os serviços já inseridos

	http://ip:porta/request

GET retornando um serviço específico através do ID

	http://ip:porta/service/:id

GET retornando um tipo específico de serviço (bônus)

	http://ip:porta/services/:service
