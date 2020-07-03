const Matter = require("../../models/cordinatorModels/matter")


module.exports ={

    async index(req, res){

        let { semester }  = req.query
        let matters = await Matter.all(semester)
        matters = matters.rows
    
        return res.render("cordinatorView/matters/index", { matters })
            

    },
    // criar pagina para criar
    create(req, res){
    
        return res.render("cordinatorView/matters/create.njk")
    },
    // Criar 
    async post(req,res){
        //Logica de Salvar

        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == '') {
                return res.send("Preencha todos os campos")
            }
        }

        let { id, name } = req.body

        const semester = Number(req.body.semester)

        const matter = {
            id,
            name,
            semester
        }

        let results = await Matter.create(matter)
        const matterNew = results.rows[0]

        return res.redirect('cordinator/matters')
    },
    // criar pagina para editar
    async edit(req, res){

        let results = await Matter.find(req.params.id)
        const matter = results.rows[0]

        if(!matter) return res.send("Matter not found!")

        return res.render("cordinatorView/matters/edit.njk", {matter})
    },
    //atualizar
    async put(req, res){
        const keys = Object.keys(req.body)
        for (key of keys) {
            if (req.body[key] == '') {
                return res.send("Preencha todos os campos")
            }
        }

        let { name } = req.body

        const semester = Number(req.body.semester)
        const id = Number(req.body.id)

        const matter = {
            id,
            name,
            semester
        }
        
        await Matter.update(matter)

        return res.redirect('cordinator/matters')
    },
    //deletar
    async delete(req, res){
        await Matter.delete(req.body.id)

        return res.redirect('cordinator/matters')
    }
} 