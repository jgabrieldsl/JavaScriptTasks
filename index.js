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

// Arrow Function para listar metas
const listarMetas = async () => {
    const respostas = await checkbox ({
        message: 'Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o Enter para finalizar essa etapa.',
        choices: [...metas],
        instructions: false
    })

    // Desmarcando todas as metas
    metas.forEach((m) => {
        m.checked = false
    })

    // Se nenhuma meta for selecionada, aparece a seguinte mensagem.
    if (respostas.length == 0) {
        console.log("Nenhuma meta selecionada.")
        return listarMetas()
    }    

    // For para procurar no Array se a meta marcado é igual, se sim, marca a meta como concluída.
    respostas.forEach ((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })

    console.log('Meta(s) concluídas!')
}

// Metas realizadas
const metasRealizadas = async () => {
    const realizadas = metas.filter ((meta) => {  /* HOF -> Sempre recebe uma função*/ 
        return meta.checked
    })

    console.log(realizadas);

    if (realizadas.length == 0) {
        console.log("Nenhuma meta realizada")
        return
    }
    
    await select ({
        message: "Metas realizadas: " + realizadas.length,
        choices: [...realizadas],
        instructions: false
    })
}

// Metas em aberto
const metasAbertas = async () => {
    const abertas = metas.filter((meta) => { /* HOF -> Sempre recebe uma função*/ 
        return !meta.checked
    })

    if (abertas.length == 0) {
        console.log("Nenhuma meta em aberto")
        return
    }

    await select ({
        message: "Metas em aberto: " + abertas.length,
        choices: [...abertas],
        instructions: false
    })
}

// Arrow Function para deletar metas
const deletarMetas = async () => {

    if (metas.length == 0 ) {
        console.log("Nenhuma meta cadastrada.")
        return
    }

    const metasDesmarcadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    })
    
    const aDeletar = await checkbox ({
        message: 'Selecione a meta a deletar',
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if (aDeletar.length == 0) {
        console.log("Nenhum item para deletar!")
        return
    }

    aDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item /* Só ira ficar na lista de metas aquilo que não for marcado */
        })
    })

    console.log("Meta(s) deletada(s) com sucesso!")
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
                    name: 'Metas realizadas',
                    value: 'Realizadas'
                },
                {
                    name: 'Metas em aberto',
                    value: 'Abertas'
                },
                {
                    name: 'Deletar metas',
                    value: 'Deletar'
                },
                {
                    name: 'Sair',
                    value: 'Sair'
                }
            ],
            instructions: false
        })

        switch (opcao) {
            case 'Cadastrar':
                await cadastrarMeta()
                break
            case 'Listar':
                await listarMetas()
                break
            case 'Realizadas':
                await metasRealizadas()
                break
            case 'Abertas':
                await metasAbertas()
                break
            case 'Deletar':
                await deletarMetas()
                break
            case 'Sair':
                console.log('Até logo!')
                return
        }
    }
}

start()