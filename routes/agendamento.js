const express = require('express');
const router = express.Router();
const { Agendamento } = require('../models');

//Criar um agendamento novo
router.post('/', async (req, res) => {
    try {
        const agendamento = await Agendamento.create(req.body);
        res.status(201).json(agendamento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Listar todos os agendamentos
router.get('/', async (req, res) => {
    try {
        const agendamento = await Agendamento.findAll();
        res.json(agendamento);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Buscando um agendamento
router.get('/:id', async (req, res) => {
    try {
        const agendamento = await Agendamento.findByPk(req.params.id);
        if (!agendamento) return res.status(404).json({ error: 'Agendamento nao encontra'});
        res.json(agendamento);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

//Atualizar agendamento
router.put('/:id', async (req, res) => {
    try {
        const agendamento = await Agendamento.findByPk(req.params.id);
        if (!agendamento) return res.status(404).json({ error: 'Agenda nao encontrada' });

        await agendamento.update(req.body);
        res.json(agendamento);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Deletar o agendamento
router.delete('/:id', async (req, res) => {
    try {
        const agendamento = await Agendamento.findByPk(req.params.id);
        if (!agendamento) return res.status(404).json({
            error: 'Agendamento nao encontrado'
        });

        await agendamento.destroy();
        res.json({ message: 'Agenda deletada com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;