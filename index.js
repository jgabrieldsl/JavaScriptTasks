// Importando e utilizando módulos/pacotes/librarys
const { select } = require('@inquirer/prompts')

// Menu principal - Função assíncrona
const start = async () => {
    while (true) {
        // "await" -> Fica em repouso até o usuário escolher uma das choices
        const opcao = await select({
            message: 'Menu >',
            choices: [
                {
                    name: "Cadastrar meta",
                    value: 'Cadastrar'
                },
                {
                    name: 'Listar metas',
                    value: 'Listar'
                },
                {
                    name: 'Sair',
                    value: 'Sair'
                }
            ]

        })

        switch (opcao) {
            case 'Cadastrar':
                console.log('Vamos cadastrar')
                break
            case 'Listar':
                console.log('Listando metas')
                break
            case 'Sair':
                console.log('Até logo!')
                return
        }
    }
}

start()