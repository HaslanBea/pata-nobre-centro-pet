const express = require('express');
const router = express.Router();
const { Servico } = require('../models');

//Criar um serviço
router.post('/', async (req, res) => {
 try {
    const servico = await Servico.create(req.body);
    res.status(201).json(servico);
 } catch (error) {
    res.status(400).json({
        error: error.message
    });
 }
});

//Listar Todos so serviços
router.get('/', async (req, res) => {
    try {
        const servico = await Servico.findAll();
        res.json(servico);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Buscar apenas um serviço 
router.get('/:id', async (req, res) => {
    try {
        const servico = await Servico.findByPk(req.params.id);
        if (!servico) return res.status(404).json({ error: 'Serviço nao encontrado' });
        res.json(servico);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Editar um serviço
router.put('/:id', async (req, res) => {
    try {
        const servico = await Servico.findByPk(req.params.id);
        if (!servico) return res.status(404).json({
            error: 'Serviço nao encontrado'
        });

        await servico.update(req.body);
        res.json(servico);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Deletar o serviço
router.delete('/:id', async (req, res) => {
    try {
        const servico = await Servico.findByPk(req.params.id);
        if(!servico) return res.status(404).json({
            error: 'Serviço nao encontrado'
        });

        await servico.destroy();
        res.json({ message: 'Este serviço foi deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;