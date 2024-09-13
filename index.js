// Importando e utilizando módulos/pacotes/librarys
const { select, input, checkbox } = require('@inquirer/prompts')

let metas = []

// Arrow Function para Cadastrar a meta
const cadastrarMeta = async () => {
    const meta = await input ({
        message: "Digite a meta: "
    })

    if (meta.length == 0) {
        console.log('A meta não pode ser vazia')
        return cadastrarMeta()
    }

    // Adicionar a nova meta ao Array
    metas.push({
        value: meta,
        checked: false
    })

    console.log(metas)

}

const listarMetas = async () => {
    const respostas = await checkbox ({
        message: 'Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa.',
        choices: [...metas]
    })

    if (respostas.length == 0) {
        console.log("Nenhuma meta selecionada.")
        return listarMetas()
    }

    // Desmarcando todas as metas
    metas.forEach((m) => {
        m.checked = false
    })

    // For para procurar no Array se a meta marcado é igual, se sim, marca a meta como concluída.
    respostas.forEach ((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })

    console.log('Meta(s) concluídas!')

}

// Menu principal - Função assíncrona
const start = async () => {
    while (true) {
        // "await" -> Fica em repouso até o usuário escolher uma das choices
        const opcao = await select({
            message: 'Menu > ',
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
                await cadastrarMeta()
                break
            case 'Listar':
                await listarMetas()
                break
            case 'Sair':
                console.log('Até logo!')
                return
        }
    }
}

start()